import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { naive, withNaiveProviders } from './plugins/naive';

import App from './App.vue';
import router from './router';
import 'uno.css'; // UnoCSS
import { qaModule } from './components';

const app = createApp(withNaiveProviders(App));

app.use(naive); // 一次註冊所有 Naive 元件
app.use(createPinia());
app.use(router);
app.component('qaModule', qaModule);

app.mount('#app');
