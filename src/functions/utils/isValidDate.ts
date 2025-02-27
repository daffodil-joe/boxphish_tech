export default function isValidDate(datestring: string) {
  const isValid = typeof new Date(datestring).getTime() === "number";

  if (isValid) {
    return datestring;
  }

  return "invalid date";
}
