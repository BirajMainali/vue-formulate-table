import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config";
import PrimeVueLoader from "./PrimeVueLoader.js";

const app = createApp(App);
PrimeVueLoader(app);
app.use(PrimeVue);
app.mount('#app');
