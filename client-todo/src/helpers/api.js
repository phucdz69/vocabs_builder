import axios from 'axios';

const backendUrl = 'http://localhost:3000/api/vocabs/';

export const viewAllVocabs = async () => {
    try{
        const response = await axios.get(backendUrl);
        return response.data;

    } catch(err) {
        console.error(err);
        return null;
    }
};

export const viewVocabByid = async (id) => {
    try{
        const response = await axios.get(backendUrl + id);
        return response.data;

    } catch(err) {
        console.error(err);
        return null;
    }
};

export const addNewWord = async (Word) => {
    try{
        const response = await axios.post(backendUrl, Word);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const editWord = async (id, word) => {
    try{
        const response = await axios.put(backendUrl + id, word);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// ==========================================================
// ✅ THÊM HÀM DELETE (XÓA)
// ==========================================================

export const deleteVocabById = async (id) => {
    try{
        // Gửi DELETE request tới /api/vocabs/:id
        const response = await axios.delete(backendUrl + id);
        // Backend của bạn trả về { message: 'delete succeed!' }
        return response.data;
    } catch (err) {
        console.error("Error deleting word by ID:", err);
        return null;
    }
};

export const deleteAllVocabs = async () => {
    try{
        // Gửi DELETE request tới /api/vocabs
        const response = await axios.delete(backendUrl);
        // Backend của bạn trả về { message: 'all vocabs deleted!' }
        return response.data;
    } catch (err) {
        console.error("Error deleting all words:", err);
        return null;
    }
};