export interface PostSchema {
  date: string;
  time: string;
  title: string;
  desc: string;
  visibility: "public" | "private";
  like: number;
  comment: number;
}
