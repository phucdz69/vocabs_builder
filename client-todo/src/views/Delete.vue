<template>
    <div class="delete-confirmation-container">
        <h1>Confirm Deletion</h1>
        
        <div v-if="isLoading" class="ui active centered inline loader">Loading word data...</div>
        
        <div v-else-if="vocab" class="ui segment">
            <div class="ui negative message">
                <div class="header">
                    Are you absolutely sure you want to delete this word?
                </div>
                <p><strong>English:</strong> {{ vocab.english }}</p>
                <p><strong>German:</strong> {{ vocab.german }}</p>
            </div>

            <button class="ui button red" @click="confirmDelete">
                Yes, Delete Permanently
            </button>
            
            <router-link :to="{ name: 'Words' }" class="ui button">
                Cancel
            </router-link>
        </div>
        
        <div v-else class="ui warning message">
            <div class="header">Word Not Found</div>
            <p>Could not load the word for deletion confirmation.</p>
            <router-link :to="{ name: 'Words' }" class="ui button primary">
                Go back to list
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { viewVocabByid, deleteVocabById } from '@/helpers/api'; 
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

const route = useRoute();
const router = useRouter();
const vocab = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    const vocabId = route.params.id;
    if (vocabId) {
        vocab.value = await viewVocabByid(vocabId);
    }
    isLoading.value = false;
});

const confirmDelete = async () => {
    const vocabId = route.params.id;

    if (!vocabId) {
        // ✅ Thay thế alert()
        Swal.fire({ icon: 'error', title: 'Error', text: 'Word ID not found.' });
        return;
    }

    // ✅ Thêm hộp thoại xác nhận SweetAlert2
    const resultConfirm = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the word: "${vocab.value.english}". This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    if (resultConfirm.isConfirmed) {
        // Gọi API DELETE nếu xác nhận
        const resultDelete = await deleteVocabById(vocabId);
        
        if (resultDelete && resultDelete.message === 'delete succeed!') {
            // ✅ Thông báo thành công
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The word has been successfully deleted.',
                showConfirmButton: false,
                timer: 1500
            });
            router.push({ name: 'Words' }); 
        } else {
            // ✅ Thông báo thất bại
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Deletion failed. The server returned an error.',
            });
        }
    }
};
</script>

