import { createApp } from 'vue'
import App from './App.vue'

//1. import router
import router from './router'

//2. import CSS
import 'semantic-ui-css/semantic.css'

// import Swal from 'sweetalert2'

// create new web app instance
const app = createApp(App)

//3. use router
app.use(router)

// mount the app
app.mount('#app')
