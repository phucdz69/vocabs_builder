<template>
    <div class="word-details-container">
        <h1>Word Details</h1>
        
        <div v-if="isLoading" class="ui active centered inline loader">Loading word details...</div>
        
        <div v-else-if="vocab" class="ui segment details-card">
            
            <div class="ui form">
                <div class="field">
                    <label><i class="united kingdom flag"></i> English</label>
                    <input type="text" :value="vocab.english" readonly />
                </div>
                
                <div class="field">
                    <label><i class="germany flag"></i> German</label>
                    <input type="text" :value="vocab.german" readonly />
                </div>
            </div>

            <div class="button-group">
                <router-link :to="{ name: 'Edit', params: { id: vocab._id } }" class="ui button yellow">
                    <i class="edit icon"></i> Edit Word
                </router-link>
                
                <router-link :to="{ name: 'Delete', params: { id: vocab._id } }" class="ui button red">
                    <i class="trash alternate icon"></i> Delete Word
                </router-link>
                
                <router-link :to="{ name: 'Words' }" class="ui button basic floated right">
                    <i class="arrow left icon"></i> Back to List
                </router-link>
            </div>
        </div>
        
        <div v-else class="ui warning message">
            <div class="header">Word Not Found</div>
            <p>The word with ID "{{ route.params.id }}" could not be loaded.</p>
            <router-link :to="{ name: 'Words' }" class="ui button primary">
                Go back to list
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// Hàm API đã được xác nhận để xem chi tiết từ vựng
import { viewVocabByid } from '@/helpers/api'; 

const route = useRoute();
const vocab = ref(null);
const isLoading = ref(true);

// 1. Tải dữ liệu khi component được mount
onMounted(async () => {
    const vocabId = route.params.id;
    if (vocabId) {
        try {
            const data = await viewVocabByid(vocabId);
            vocab.value = data;
        } catch (error) {
            console.error("Failed to fetch word details:", error);
            // Có thể thêm Swal.fire() ở đây nếu muốn thông báo lỗi tải dữ liệu
        }
    }
    isLoading.value = false;
});
</script>

<style scoped>
.word-details-container {
    max-width: 600px;
    margin: 40px auto;
}
.details-card {
    padding: 30px !important;
}
.ui.form .field label {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 5px;
    display: block;
}
.ui.form input[readonly] {
    background-color: #f9f9f9 !important;
    color: #333 !important;
    border: 1px solid #e0e0e0 !important;
}
.button-group {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    overflow: hidden; /* Dùng để chứa float */
}
</style>

## 📌 Lưu ý Quan trọng

1.  **Tên Route:** Component này sử dụng các tên route mà chúng ta đã định nghĩa trong `router.js` (`Edit`, `Delete`, `Words`).
2.  **API Call:** Component gọi hàm `viewVocabByid` để lấy dữ liệu.
3.  **Giao diện:** Giao diện sử dụng các thẻ `<input type="text" ... readonly />` để hiển thị thông tin mà không cho phép chỉnh sửa, tương tự như ảnh minh họa của bạn .