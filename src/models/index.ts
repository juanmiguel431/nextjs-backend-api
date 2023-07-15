export interface Feedback {
  id: string;
  email: string;
  feedback: string;
}

export interface PostResponse {
  message: string;
  data: Feedback;
}

export interface GetResponse {
  message: string;
  data: Feedback[];
}
