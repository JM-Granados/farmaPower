import mongoose from 'mongoose';
import config from './config';

(async () => {
    try {
        const db = await mongoose.connect(config.MONGO_DB as string);
        console.log('Database is connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
})();
