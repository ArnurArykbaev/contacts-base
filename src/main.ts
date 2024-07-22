import {createApp, h} from 'vue';
import App from './App.vue'
import '@/style.scss';
import { setupRouter } from './plugins/route.ts';
import { createPinia } from 'pinia';
import {resetStore} from './plugins/reset-store.ts';
import { Row, Button, Table, Input, Card } from 'ant-design-vue';

const app = createApp({
    render: () => h(App),
});

const pinia = createPinia();
pinia.use(resetStore)
app.use(pinia);

const router = setupRouter();
app.use(router);

/* ant-design components */
app.use(Button)
app.use(Table)
app.use(Card)
app.use(Row)
app.use(Input)

/* ant-design components end */
app.mount('#app')