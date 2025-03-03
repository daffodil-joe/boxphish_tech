## Boxphish tech test solution 1.0.0

### Run Instructions

Those with node version 20.12.\*\* can execute the script with the commands:

```
npm install
npm start

```

Those without node can execute the run.sh file to make all neccessary installs and run.

```
./run.sh

```

### About the solution

- The main entry file is (`src/index.ts`). This starts a read stream, calls the transformation logic and writes to a new file (`files/users-output.csv`).
- The data in the stream is processed row by row. This prevents the entire csv being stored in memory and keeps the solution somewhat scaleable.
- The main transformation file is (`src/functions/trasnformData.ts`). The input is restructured to fit the schema outlined in schema/csv.output.json.
- Interfaces are used for the iputs and outputs to ensure the data matches the expected schemas.
- Fields that required some sort of validation or restructure are handled using (`src/functions/utils/**`).
- Email validation is handled using the npm package validator for simplicity.
- Error handling is processed predominatntly using the on method as part of the pipe in (`src/index.ts`).
- An error in either the input stream, transformation or output stream will halt the process and log the error details to the console.

### Bonus Points

#### Scale

- The solution on this branch processes data in a parallel stream as previous versions do. However, assuming db operations would eventually be required, data is batched prior to making db queries in order to ensure the programme remains scalable.
- Should the data transformation require database operations or api calls batching the data into groups so that the total number of these operations can be reduced dramatically.
- It is possible to autoscale the amount of records processed in parallel or the batch size based on the number of rows in the csv to allow for the most appropriate use of memory for the given input.

#### Validating Data

- Missing / incorrect data is validated and actioned in the utilities.
- The utils use a combination of pseudo code and code to demonstrate what should be done in order to handle missing and incorrect data.

### Limitations

- "Salt" was not provided in the output. Research suggested that this was not something I could acheive in the give timeframe.
- Some pseudo code is provided to highlight areas where more robust action could be taken on missing or incorrect data.
