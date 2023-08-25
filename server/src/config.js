import "dotenv/config";

const config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  mongo: process.env.MONGO,
  session_secret: process.env.SESSION_SECRET,
};

export default config;
