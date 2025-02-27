export interface UsersOutput {
  breach_id_record: number;
  username: string;
  first_name: string;
  family_name: string;
  password: string | undefined;
  hash: string;
  salt: string;
  email: string | undefined;
  gender: string;
  dob: string; //format date
  address: string;
  ip: string;
  secret_question_one: string;
  secret_answer_one: string;
  secret_question_two: string | undefined;
  secret_answer_two: string | undefined;
  secret_question_three: string | undefined;
  secret_answer_three: string | undefined;
}
