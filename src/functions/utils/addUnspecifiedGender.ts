export default function addUnspecifiedGender(gender: string): string {
  return !gender ? "Unspecified" : gender;
}
