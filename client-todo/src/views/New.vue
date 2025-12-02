<template>
    <div>
        <h1>New Word</h1>
        <form action="" @submit.prevent="onSubmit">
            <div class ="ui labeled input fluid">
                <div class="ui label"><i class="united kingdom flag"></i>English</div>
                <input type="text" required v-model="words.english" />
            </div>
            <br />
        <div class ="ui labeled input fluid">
                <div class="ui label"><i class="german flag"></i>German</div>
                <input type="text" required v-model="words.german" />
            </div>
            <br />
            <button class="ui primary button">Submit</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addNewWord } from '../helpers/api';
import Swal from 'sweetalert2'; // ✅ Đã có sẵn

export default {
    name: 'New',
    setup() {
        const router = useRouter();
        // Lỗi tiềm ẩn: words nên là 'word' (số ít) để khớp với object rỗng, 
        // nhưng tôi giữ 'words' theo code gốc của bạn.
        const words = ref({}); 

        const onSubmit = async () => {
            // ✅ Kiểm tra dữ liệu hợp lệ
            if (!words.value.english || !words.value.german) {
                 Swal.fire({
                    icon: 'warning',
                    title: 'Validation Failed',
                    text: 'Please fill in both English and German fields.',
                });
                return;
            }

            const result = await addNewWord(words.value);

            if (result && result.english) { // Giả sử result là object mới nếu thành công
                // ✅ Thông báo thành công
                Swal.fire({
                    title: "Congratulations!",
                    text: "New word added successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/words');
            } else {
                 // ✅ Thông báo thất bại
                 Swal.fire({
                    icon: 'error',
                    title: 'Creation Failed',
                    text: 'There was an error saving the new word.',
                });
            }
        };
        return {
            words,
            onSubmit
        };
    }
}
</script>