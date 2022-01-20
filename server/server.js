const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./.env.development" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

//Unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
