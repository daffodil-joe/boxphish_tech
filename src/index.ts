//creates a read stream from the input csv
// transforms the data in parallel
//creates an output csv from the reformatted data

import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import * as fy from "csv-stringify";
import { transformer } from "./functions/streamFunctions/transformer";

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

inputStream
  .pipe(parser)
  .pipe(transformer)
  .pipe(fy.stringify({ header: true }))
  .pipe(outputStream)
  .on("finish", () => console.log("data transformation complete"));
