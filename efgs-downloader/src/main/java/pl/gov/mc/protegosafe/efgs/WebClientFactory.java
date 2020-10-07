package pl.gov.mc.protegosafe.efgs;

import io.netty.channel.ChannelOption;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.timeout.ReadTimeoutHandler;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class WebClientFactory {

    public static final String ACCEPT_HEADER_JSON = "application/json; version=1.0";
    public static final String ACCEPT_HEADER_PROTOBUF = "application/protobuf; version=1.0";

    @SneakyThrows
    public WebClient createWebClient() {

        final boolean useHttps = false;

        PrivateKey privateKey = CertUtils.loadPrivateKeyFromFile("./src/nbtls");
        X509Certificate certificate = CertUtils.loadCertificateFromFile("./src/nbtls");

        HttpClient httpClient = HttpClient.create();

        httpClient = httpClient.headers(headers -> headers.set("X-SSL-Client-SHA256", CertUtils.getCertThumbprint(certificate)));
        httpClient = httpClient.headers(headers -> headers.set("X-SSL-Client-DN", String.format("C=%s", "pl")));

        if (useHttps) {
            log.info("Simulator uses https with mutual authentication");

            SslContextBuilder sslContextBuilder = SslContextBuilder
                    .forClient()
                    .enableOcsp(false)
                    .keyManager(new ForceCertUsageX509KeyManager(privateKey, certificate));

//      if (simulatorProperties.getDisableMtlsCertVerification()) {
//        sslContextBuilder.trustManager(getTrustAllTrustManager());
//      } else {
//        sslContextBuilder.trustManager(loadTrustedCertificates());
//      }

            SslContext sslContext = sslContextBuilder.build();
            httpClient = httpClient.secure(sslContextSpec -> sslContextSpec.sslContext(sslContext));
        }

        httpClient = httpClient.tcpConfiguration(tcpClient -> {
            // configure timeout for connection
            tcpClient = tcpClient.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 30000);

            // configure timeout for answer
            tcpClient = tcpClient.doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(30000, TimeUnit.MILLISECONDS)));

            return tcpClient;
        });

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .filters(exchangeFilterFunctions -> {
                    exchangeFilterFunctions.add(logRequest());
                })
                .build();
    }

    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            log.info("Request: {} {}", clientRequest.method(), clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> log.info("{}={}", name, value)));
            return Mono.just(clientRequest);
        });
    }
}
