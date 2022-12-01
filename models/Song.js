const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lyricSchema = new Schema({
    Verse_1:{
        type : String,
    },
    Verse_2:{
        type : String,
    },
    Verse_3:{
        type : String,
    },
    Chorus:{
        type : String,
    },
    Refrain:{
        type : String,
    },
    Bridge:{
        type : String,
    },
    PreChorus:{
        type : String,
    },
})


const songSchema = new Schema({
    title : {
        type: String,
        required :true
    },
    artist : {
        type: String,
        required :true
    },
    lyrics : lyricSchema

},{
    timestamps : true
});


module.exports = mongoose.models.Song || mongoose.model("Song", songSchema);