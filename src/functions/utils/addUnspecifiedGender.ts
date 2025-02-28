// will return "unspecified" if gender is undefined.

export default function addUnspecifiedGender(gender: string): string {
  return !gender ? "Unspecified" : gender;
}
