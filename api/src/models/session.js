import mongoose from 'mongoose';

const { Schema } = mongoose;

const sessionSchema = new Schema({
    id: { type: String, required: true },
    game: {
        homeTeam: {
            type: String,
            required: true,
        },
        awayTeam: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        result: {
            type: String,
            required: true,
        },
    },
    pool: { type: BigInt },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
