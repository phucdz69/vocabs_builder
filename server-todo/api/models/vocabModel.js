
const mongoose = require('mongoose')

const vocabSchema = mongoose.Schema({

    english: {
        type: String,
        required: true,
        errorMessage: "English word is required",
    },

    german:{
        type: String,
        required: true,
        errorMessage: "German word is required",
    }
},
{
    versionKey: false,
    timestamps: true
}
)



const Vocab = mongoose.model("vocabs", vocabSchema)
module.exports = Vocab