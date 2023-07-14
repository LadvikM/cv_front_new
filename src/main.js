import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from "moment";
import axios from 'axios'
import VueAxios from 'vue-axios'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faR, fas, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";


/* add icons to the library */
library.add(faUserSecret, fas, faR, far, fab)

createApp(App).use(store)
    .use(moment)
    .use(router)
    .use(VueAxios, axios)
    .component('font-awesome-icon', FontAwesomeIcon)

    .mount('#app')
