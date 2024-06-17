import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


//database created using promise(tryCatch)
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL,{dbName:DB_NAME});
    console.log(
      `MongoDb Connected !!  DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb connection FALED", error);
    process.exit(1); //forcibly shutdown if error occurs in db connection
  }
};

export default connectDb