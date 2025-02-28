//creates a read stream from the input csv
// transforms the data in parallel
//creates an output csv from the reformatted data

import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import transformData from "./functions/transformData";
import { transform } from "stream-transform";
import * as fy from "csv-stringify";

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

//process the transformation logic
const transformer = transform({ parallel: 100 }, transformData).on(
  "error",
  (error) => {
    console.error("error in transformData", error.message);
    process.exit(1);
  }
);

inputStream
  .pipe(parser)
  .pipe(transformer)
  .pipe(fy.stringify({ header: true }))
  .pipe(outputStream)
  .on("finish", () => console.log("data transformation complete"));
