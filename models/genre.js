const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, required: true },
});

// Virtuelles Attribut für die URL des Genres
GenreSchema.virtual("url").get(function () {
        return `/catalog/genre/${this._id}`;
});

// Modell exportieren
module.exports = mongoose.model("Genre", GenreSchema);