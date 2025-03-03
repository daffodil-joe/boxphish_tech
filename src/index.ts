//creates a read stream from the input csv
// transforms the data in parallel
//creates an output csv from the reformatted data

import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import transformData from "./functions/transformData";
import { transform } from "stream-transform";
import * as fy from "csv-stringify";
import { UsersOutput } from "./interfaces/UsersOutput";

//create a stream from the input file
const inputPath = path.resolve(__dirname, "../files/users.csv");
const inputStream = fs.createReadStream(inputPath).on("error", (error) => {
  console.error("Error reading users.csv", error.message);
  process.exit(1);
});

//create output stream for transformed data
const outputPath = path.resolve(__dirname, "../files/users-output.csv");
const outputStream = fs.createWriteStream(outputPath).on("error", (error) => {
  console.error("Error writing users-output.csv", error.message);
  process.exit(1);
});

const parser = parse({
  columns: true,
  skip_empty_lines: true,
});

let transformedDataArray: UsersOutput[] = [];
let counter = 1;
//process the transformation logic
const transformer = transform({ parallel: 100 }, async (record) => {
  //prepare batches for db write
  const batchSize = 1000; //how many db operations at once
  const transformedData = transformData(record);
  transformedDataArray.push(transformedData);

  if (transformedDataArray.length >= batchSize) {
    //there are > 1000 make the db operation
    //pseudo for write operation
    // await Users.insertMany(transformedDataArray)
    console.log(`inserting 1000 records into the database, ${counter}`); //should only log twice
    counter++;
    transformedDataArray = [];
  }

  return transformedData;
})
  .on("error", (error) => {
    console.error("error in transformData", error.message);
    process.exit(1);
  })
  .on("end", () => {
    if (transformedDataArray.length > 0) {
      // await Users.insertMany(transformedDataArray)
      console.log(
        `inserting ${transformedDataArray.length} remaining records into db`
      );
    }
  });

inputStream
  .pipe(parser)
  .pipe(transformer)
  .pipe(fy.stringify({ header: true }))
  .pipe(outputStream)
  .on("finish", () => console.log("data transformation complete"));
