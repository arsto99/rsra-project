import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './style.css';

// تكوين axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://localhost:2003';
axios.defaults.withCredentials = true;

const app = createApp(App);

// استخدام الإضافات
app.use(router);

// تركيب التطبيق
app.mount('#app');
