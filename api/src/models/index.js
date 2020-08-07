import mongoose from 'mongoose';

import Session from './session';

const dbConnect = () => {
    return mongoose.connect(process.env.DB_URL);
};

const models = { Session };

export { dbConnect };

export default models;
