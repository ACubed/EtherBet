const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
    id: { type: Number, required: true },
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
            type: Number,
            required: true,
        },
        result: {
            type: String,
            required: true,
        },
    },
    pool: { type: Number },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
