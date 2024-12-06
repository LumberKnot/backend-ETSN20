# functions

This directory contains the cloud functions that are used in the project.

## Test

To test the functions, you can use the following command:

```bash
npm run test --pattern=<file_pattern>
```

To run coverage, you can use the following command:

```bash
npm run test:coverage --pattern=<file_pattern>
```

For example, replace `<file_pattern>` with `\'test/**/*.ts\'` (note `\'` on both sides of the pattern to pass the whole strng!) to check coverage from all test files, or `\'test/**/dateUtils.test.ts\'` to run the coverage for the [dateUtils.ts tests](./test/utils/dateUtils.test.ts).

To run the coverage, and create a report at the same time, you can use the following command:

```bash
npm run test:report --pattern=<file_pattern>
```

The report is created in the `coverage` which contains an `index.html` file that can be opened. This page provides a detailed coverage report for each tested file.