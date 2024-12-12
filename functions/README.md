# functions

This directory contains the cloud functions that are used in the project.

## Test

To test the functions, you can use the following command:

```bash
npm run test <file_pattern>
```

Replace `<file_pattern>` with, for example, `'test/**/*.ts'` (note `'` on both sides of the pattern to pass the whole string!) to run all test files. Or replace it with - for example - `'test/**/dateUtils.test.ts'` to run the all [dateUtils.ts tests](./test/utils/dateUtils.test.ts). To test the functions, and get a coverage report at the same time, you can use the following command:

```bash
npm run test:coverage <file_pattern>
```

To run the test cases, get a coverage report, and create an HTML report at the same time, you can use the following command:

```bash
npm run test:report <file_pattern>
```

The report is created in the `coverage` directory, which also contains an `index.html` file that can be opened. This page provides a detailed coverage report for each tested file.
