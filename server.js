const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoURL = process.env.DB_URL;

const app = require("./app");

console.log(mongoURL);
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
