import dotenv from 'dotenv'
dotenv.config();

export default {
    MONGO_DB: process.env.MONGO_URI
}