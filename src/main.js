import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
// Import Vuetify icons
import '@mdi/font/css/materialdesignicons.css'

// import { FontAwesomeIcon } from './fonts/fontawesome'; // Import the FontAwesome configuration
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faHome, faUpload, faTrash, faDownload,  faTimes, faProjectDiagram, faPlus, faCode, faCog, faChartLine, faSitemap, faTasks } from '@fortawesome/free-solid-svg-icons';

// Adding icons to the library
library.add(faHome, faUpload, faTrash, faDownload, faTimes,faProjectDiagram,faPlus, faCode, faCog, faChartLine, faSitemap, faTasks);

import { createRouter, createWebHistory } from 'vue-router';

// Import your components for the routes
import Home from './components/AppHome.vue';
import Namespace from './components/Namespace.vue';
import Sparql from './components/Sparql.vue';
import DataUpload from './components/DataUpload.vue';
import Settings from './components/Settings.vue';



// Define your routes
const routes = [
  { path: '/', component: Home },
  { path: '/namespace', component: Namespace },
  { path: '/sparql', component: Sparql },
  { path: '/data-upload', component: DataUpload },
  { path: '/settings', component: Settings },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});



createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(BootstrapVue3).mount('#app')
