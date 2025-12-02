//import controllers
const vocabControllers = require('../controllers/vocabController')

// declare router ( route )
const vocabRoute = (app) => {
    // declare API endpoint + methods

    // CRUD API
    // group 1: all API without ID
    app.route('/api/vocabs')
        .get(vocabControllers.viewAllVocabs)
        .post(vocabControllers.createNewVocab)
        .delete(vocabControllers.deleteAllVocabs)

    // group 2: all API with ID
    app.route('/api/vocabs/:id')
        .get(vocabControllers.viewVocabById)
        .put(vocabControllers.updateVocab)
        .delete(vocabControllers.deleteVocabById)

    //Extra API
    app.route('/api/vocabs/:name')
        .get(vocabControllers.searchVocabByName)

    app.route('/api/vocab/sortAsc')
        .get(vocabControllers.sortVocabAscending)

    app.route('/api/vocab/sortDesc')
        .get(vocabControllers.sortVocabDescending)

    // sort API
    app.route('/vocabs/sort/ascending')
        .get(vocabControllers.sortVocabAscending)

    app.route('/vocabs/sort/descending')
        .get(vocabControllers.sortVocabDescending)
}

// export router

module.exports = vocabRoute