// returns an object with the first and last name of a person
//filters predetermined prefixes and suffixes
//returns an empty stting for family name if only one name is provided

import { FullName } from "../../interfaces/FullName";

export default function splitRealName(realName: string): FullName {
  //declare the object to return
  let fullName: FullName = {
    firstName: "",
    familyName: "",
  };

  //declare the prefixes and suffixes to avoid
  const prefixes = ["mr.", "mrs.", "ms.", "miss", "dr.", "prof.", "rev."];
  const suffixes = ["dvm", "phd", "dds", "md"];

  //declare the regex patterns to remove suffixes and prefixes
  const prefixPattern = new RegExp(`^(${prefixes.join("|")})\\s+`, "i");
  const suffixPattern = new RegExp(`\\s+(${suffixes.join("|")})$`, "i");

  let cleanName = realName.toLowerCase().trim();
  cleanName = cleanName.replace(prefixPattern, "").replace(suffixPattern, "");

  const names = cleanName.split(" ");

  fullName.firstName = names[0];

  fullName.familyName = names.length > 1 ? names[names.length - 1] : "";

  // console.log(fullName);
  return fullName;
}
