// import model
const vocabModel = require('../models/vocabModel');

// Get all vocabs
const viewAllVocabs = async (req, res) => {
    try {
        const vocabs = await vocabModel.find({});
        res.status(200).json(vocabs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Get vocab by ID
const viewVocabById = async (req, res) => {
    try {
        const id = req.params.id;
        const vocab = await vocabModel.findById(id);
        res.status(200).json(vocab);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Create new vocabulary
const createNewVocab = async (req, res) => {
    try {
        const vocab = req.body;
        await vocabModel.create(vocab);
        res.status(201).json(vocab);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Update vocabulary
const updateVocab = async (req, res) => {
    try {
        const id = req.params.id;
        const vocab = req.body;
        await vocabModel.findByIdAndUpdate(id, vocab);
        res.json({ message: 'update succeed!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete vocab by ID
const deleteVocabById = async (req, res) => {
    try {
        const id = req.params.id;
        await vocabModel.findByIdAndDelete(id);
        res.json({ message: 'delete succeed!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete all vocabs
const deleteAllVocabs = async (req, res) => {
    try {
        await vocabModel.deleteMany({});
        res.json({ message: 'all vocabs deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Search by name
const searchVocabByName = async (req, res) => {
    try {
        const name = req.params.name;
        const vocabs = await vocabModel.find({
            english: { $regex: name, $options: "i" }
        });
        res.json(vocabs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Sort ascending
const sortVocabAscending = async (req, res) => {
    try {
        const vocabs = await vocabModel.find().sort({ english: 1 });
        res.json(vocabs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Sort descending
const sortVocabDescending = async (req, res) => {
    try {
        const vocabs = await vocabModel.find().sort({ english: -1 });
        res.json(vocabs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// export API
module.exports = {
    viewAllVocabs,
    viewVocabById,
    createNewVocab,
    updateVocab,
    deleteVocabById,
    deleteAllVocabs,
    searchVocabByName,
    sortVocabAscending,
    sortVocabDescending
};
