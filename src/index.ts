import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import transformData from "./functions/transformData";
import { transform } from "stream-transform";
import * as fy from "csv-stringify";

//create a stream from the input file
const inputPath = path.resolve(__dirname, "../files/users.csv");
const inputStream = fs.createReadStream(inputPath).on("error", () => {
  console.error("Error reading users.csv");
  process.exit(1);
});

//create output stream for transformed data
const outputPath = path.resolve(__dirname, "../files/users-output.csv");
const outputStream = fs.createWriteStream(outputPath).on("error", () => {
  console.error("Error writing users-output.csv");
  process.exit(1);
});

const parser = parse({
  columns: true,
  skip_empty_lines: true,
});

const transformer = transform(transformData).on("error", () => {
  console.error("error in transformData");
  process.exit(1);
}); //only pass the callback, signature is as expected.

inputStream
  .pipe(parser)
  .pipe(transformer)
  .pipe(fy.stringify({ header: true }))
  .pipe(outputStream)
  .on("finish", () => console.log("data transformation complete"));
