const mongoose = require('mongoose');

const TermSchema = new mongoose.Schema({
    term: String,
    when: Date
});

module.exports = mongoose.model("Term", TermSchema);