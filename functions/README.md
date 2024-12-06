# functions

This directory contains the cloud functions that are used in the project.

## Test

To test the functions, you can use the following command:

```bash
npm run test
```

To run coverage, you can use the following command:

```bash
npm run coverage -- <file_pattern>
```

For example, replace `<file_pattern>` with `test/**/*.ts` to check coverage from all test files, or `test/**/dateUtils.test.ts` to run the coverage for the [dateUtils.ts tests](./test/utils/dateUtils.test.ts).
