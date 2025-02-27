import { UsersInput } from "../interfaces/UsersInput";
import { UsersOutput } from "../interfaces/UsersOutput";
import missingPasswordAlert from "./utils/missingPasswordAlert";
import splitRealName from "./utils/splitRealName";
import addUnspecifiedGender from "./utils/addUnspecifiedGender";
import isValidDate from "./utils/isValidDate";
import validator from "validator";

export default function transformData(user: UsersInput): UsersOutput {
  //use the name splitter util to transform names
  const fullName = splitRealName(user.real_name);
  // const validEmail = validateEmail(user.email_address);

  return {
    breach_id_record: user.user_id,
    username: user.user_name,
    first_name: fullName.firstName,
    family_name: fullName.familyName,
    password: missingPasswordAlert(
      user.password,
      user.email_address,
      user.user_name
    ), //undefined || user.password
    hash: user.password_hash,
    salt: "salt", //somefunction(user.password_hash)
    email: validator.isEmail(user.email_address) //only if email is valid
      ? user.email_address
      : "foobarfoo",
    gender: addUnspecifiedGender(user.gender),
    dob: isValidDate(user.birthdate),
    address: user.location,
    ip: user.member_ip,
    secret_question_one: user.secret_question,
    secret_answer_one: user.secret_answer,
    secret_question_two: user.secret_question_two || undefined,
    secret_answer_two: user.secret_answer_two || undefined,
    secret_question_three: user.secret_question_three || undefined,
    secret_answer_three: user.secret_answer_three || undefined,
  };
}
