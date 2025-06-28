import mongoose  from "mongoose";
import dotenv from "dotenv"
dotenv.config({path: "./.env"});
const DBconnect = async() => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
}

export default DBconnect