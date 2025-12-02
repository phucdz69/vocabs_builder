<template>
    <div>
        <h1>Edit Word</h1>
        <form v-if="word && word._id" @submit.prevent="onSubmit">
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="united kingdom flag"></i>English</div>
                <input type="text" required v-model="word.english" />
            </div>
            <br />
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="germany flag"></i>German</div>
                <input type="text" required v-model="word.german" />
            </div>
            <br />
            <button class="ui primary button">Submit</button>
        </form>
        <div v-else-if="isLoading">Loading data...</div>
        <div v-else>Word not found for editing.</div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { viewVocabByid, editWord } from "../helpers/api"; 
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

export default {
    name: "Edit",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const word = ref({});
        const isLoading = ref(true); 

        onMounted(async () => {
            const vocabId = route.params.id;
            if (vocabId) {
                const result = await viewVocabByid(vocabId); 
                if (result === null) {
                    // ✅ Thay thế alert()
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error Loading',
                        text: 'Word not found or failed to load data.',
                    });
                    word.value = {};
                } else {
                    word.value = result;
                }
            }
            isLoading.value = false;
        });

        const onSubmit = async () => {
            // ✅ Thay thế alert() cho validation
            if (!word.value.english || !word.value.german) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Validation Failed',
                    text: 'Please fill in both English and German fields.',
                });
                return;
            }
            
            const vocabId = route.params.id;
            const result = await editWord(vocabId, word.value); 
            
            if (result && result.message === 'update succeed!') { 
                // ✅ Thay thế alert() cho thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Updated Successfully!',
                    text: 'The word has been updated.',
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/words'); 
            } else {
                // ✅ Thay thế alert() cho thất bại
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was an error updating the word.',
                });
            }
        };

        return {
            word, 
            isLoading,
            onSubmit
        };
    }
};
</script>