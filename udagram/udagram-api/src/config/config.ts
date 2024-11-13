import * as dotenv from "dotenv";
dotenv.config();

// ENV variables 
// - AWS_ACCESS_KEY_ID
// - AWS_SECRET_ACCESS_KEY
// Are Also needed

export const config = {
  username: "postgres",
  password: "postgres",
  database: "postgres",
  host: "postgres.cc3jxguaxvim.us-east-1.rds.amazonaws.com",
  aws_region: "",
  aws_profile: "",
  aws_media_bucket: "",
  url: "http://localhost:8080",
  jwt: {
    secret: "process.env.JWT_SECRET",
  },
  accessKeyId: "",
  secretAccessKey: ""
};
