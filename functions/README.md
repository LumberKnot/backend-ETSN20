# functions

This directory contains the cloud functions that are used in the project.

## Test

To test the functions, you can use the following command:

```bash
npm run test <file_pattern>
```

To test the functions, and get a coverage report, you can use the following command:

```bash
npm run test:coverage <file_pattern>
```

For example, replace `<file_pattern>` with `'test/**/*.ts'` (note `'` on both sides of the pattern to pass the whole string!) to check coverage from all test files. Or replace it with - for example - `'test/**/dateUtils.test.ts'` to run the coverage for the [dateUtils.ts tests](./test/utils/dateUtils.test.ts).

To run the test cases, get a coverage report, and create an HTML report at the same time, you can use the following command:

```bash
npm run test:report <file_pattern>
```

The report is created in the `coverage` directory, which also contains an `index.html` file that can be opened. This page provides a detailed coverage report for each tested file.
