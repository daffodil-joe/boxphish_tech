//checks that the date is formatted correctly
//returns invalid date if the date is invalid

export default function isValidDate(datestring: string) {
  const isValid = typeof new Date(datestring).getTime() === "number";

  if (isValid) {
    return datestring;
  }

  return "invalid date";
}
