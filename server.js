const app = require("./app");
const mongoose = require("mongoose");

const { DB, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Mongo connected successfully");
    app.listen(PORT);
    console.log("Server started on port 3000");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
