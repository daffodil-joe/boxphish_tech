import transformData from "../transformData";
import { transform } from "stream-transform";
import { UsersOutput } from "../../interfaces/UsersOutput";

let transformedDataArray: UsersOutput[] = [];
let counter = 1;
export const transformer = transform({ parallel: 100 }, async (record) => {
  //prepare batches for db write
  const batchSize = 1000; //how many db operations at once
  const transformedData = transformData(record);

  if (!transformedData) {
    throw new Error("transformedDate is undefined");
  }
  transformedDataArray.push(transformedData);

  if (transformedDataArray.length >= batchSize) {
    //there are > 1000 make the db operation
    //pseudo for write operation
    // await Users.insertMany(transformedDataArray)
    console.log(
      `inserting 1000 records into the database, batch number: ${counter}`
    ); //should only log twice
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
