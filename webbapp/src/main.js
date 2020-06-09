import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'

Vue.config.productionTip = false
Vue.use(VueFirestore)

new Vue({
        el: '#app',
        router,
        store,
        vuetify,
        render: h => h(App),
        created() {
            firebase.initializeApp({
                apiKey: "AIzaSyCPBQRljmJP6FsYiIN4USRa6RJ3dmftz0g",
                authDomain: "responsible-ciitzen.firebaseapp.com",
                databaseURL: "https://responsible-ciitzen.firebaseio.com/",
                projectId: "responsible-ciitzen",
                storageBucket: "responsible-ciitzen.appspot.com",
                messagingSenderId: "215008993746",
                appId: "1:215008993746:web:e37eb966ed4b02e95b280b"
            })
        }
    })
    //.$mount('#app')