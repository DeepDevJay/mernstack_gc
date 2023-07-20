
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = () => {

    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-zkeov5n-shard-00-00.wqhtqvt.mongodb.net:27017,ac-zkeov5n-shard-00-01.wqhtqvt.mongodb.net:27017,ac-zkeov5n-shard-00-02.wqhtqvt.mongodb.net:27017/?ssl=true&replicaSet=atlas-1yotht-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log("Database Connection Error", err.message);
    }
}

export default Connection;