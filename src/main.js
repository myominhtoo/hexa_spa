import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//jquery
import 'jquery/dist/jquery.min.js';


//datatable
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// common css
import './assets/styles/common.css'

createApp(App).use(store).use(router).mount('#app')
