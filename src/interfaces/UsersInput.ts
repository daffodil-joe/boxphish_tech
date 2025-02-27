export interface UsersInput {
  user_id: number;
  user_name: string;
  date_registered: string;
  last_login: string;
  real_name: string;
  password: string;
  password_hash: string;
  email_address: string;
  gender: string;
  birthdate: string;
  location: string;
  show_online: number;
  member_ip: string;
  secret_question: string;
  secret_answer: string;
  secret_question_two?: string;
  secret_answer_two?: string;
  secret_question_three?: string;
  secret_answer_three?: string;
}
