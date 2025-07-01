import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

let server;

async function main() {
  try {
    await mongoose.connect(config.database as string);
    server = app.listen(config.port, () => {
      console.log(`Server is Running ar Port:- ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
