import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
require('firebase/firestore')

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: {
        authority: null,
        success_login: false,
        data: [],
        dataItem: null,
        userId: null
    },
    getters: {
        authority: state => state.authority,
        success_login: state => state.success_login,
        data: state => state.data,
        dataItem: state => state.dataItem,
        userId: state => state.userId
    },
    mutations: {
        SET_AUTHORITY: (state, payload) => state.authority = payload,
        SUCCESS_LOGIN: (state, payload) => state.success_login = payload,
        SET_DATA: (state, payload) => state.data = payload,
        SET_DATA_ITEM: (state, payload) => state.dataItem = payload,
        SET_USER_ID: (state, payload) => state.userId = payload
    },
    actions: {
        setAuthority({ commit }, payload) {
            commit('SET_AUTHORITY', payload.authority.toLowerCase())
        },
        async signUp({ commit }, payload) {
            commit('SET_AUTHORITY', payload.authority.toLowerCase())
            console.log('sign-up details: ', payload)
            await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(registeredUser => {
                    firebase.firestore().collection('Users')
                        .add({
                            uid: registeredUser.user.uid,
                            userName: payload.firstName + ' ' + payload.lastName,
                            phoneNumber: payload.phoneNumber,
                            authority: payload.authority
                        })
                    router.push({ name: 'user', params: { option: 'login' } })
                        .catch(error => {
                            if (error.name != "NavigationDuplicated") {
                                throw error;
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        },

        async signIn({ commit }, payload) {
            var userId = null
                //var users = null

            await firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password) // signed in
                .then(data => {
                    commit('SUCCESS_LOGIN', true)
                    userId = data.user.uid
                    console.log(userId)
                    commit('SET_USER_ID', userId)
                })
                .catch(err => {
                    this.error = err.message;
                    commit('SUCCESS_LOGIN', false)
                })
            await axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetUsers')
                .then(res => {
                    const users = res.data
                    console.log(users)
                    users.forEach(element => {
                        if (element.uid === userId) {
                            console.log(element)
                            commit('SET_AUTHORITY', element.authority)
                            switch (element.authority.toUpperCase()) {
                                case 'POLICE':
                                    axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetPoliceImages')
                                        .then(res => {
                                            console.log(res)
                                            commit('SET_DATA', res.data)
                                        })
                                    break;
                                case 'SKATTEVERKET':
                                    axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetSkatteverketImages')
                                        .then(res => {
                                            console.log(res)
                                            commit('SET_DATA', res.data)
                                        })
                                    break;
                                case 'KOMMUN':
                                    axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetMunicipalityImages')
                                        .then(res => {
                                            //console.log(res)
                                            commit('SET_DATA', res.data)
                                        })
                                    break;
                                case 'MIGRATIONSVERKET':
                                    axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetMigrationImages')
                                        .then(res => {
                                            console.log(res)
                                            commit('SET_DATA', res.data)
                                        })
                                    break;
                                case 'TRAFFIKVERKET':
                                    axios.get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetTraffikImages')
                                        .then(res => {
                                            console.log(res)
                                            commit('SET_DATA', res.data)
                                        })
                                    break;
                                default:
                                    break;
                            }
                            router.push({ name: 'dashboard', params: { name: element.authority.toLowerCase() } })
                                .catch(error => {
                                    if (error.name != "NavigationDuplicated") {
                                        throw error;
                                    }
                                })
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        signOut({ commit }) {
            router.push('/home')
                .catch(error => {
                    console.log(error)
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                })
            commit('SUCCESS_LOGIN', false)
            commit('SET_AUTHORITY', null)
        },

        async fetchData({ commit }) {
            try {
                await axios
                    .get('https://us-central1-responsible-ciitzen.cloudfunctions.net/GetImages')
                    .then(res => {
                        console.log(res)
                        commit('SET_DATA', res.data)
                    }).catch(err => {
                        console.log(err)
                    })

            } catch (error) {
                console.log(error)
            }
        },
        fetchDataItem({ commit }, payload) {
            var img_url = payload.url
            console.log(img_url)
            var img = ''
            firebase.storage().ref('Images').getDownloadURL().then(function(img_url) {
                img = img_url
            }).catch(function(error) {
                //console.error(error);
                throw error
            });
            const dataItem = {
                authority: payload.authority,
                currentDate: payload.currentDate,
                description: payload.description,
                id: payload.id,
                latitude: payload.latitude,
                location: payload.location,
                longitude: payload.longitude,
                senderName: payload.senderName,
                senderPhoneNumber: payload.senderPhoneNumber,
                url: img
            }
            console.log(dataItem)
            commit('SET_DATA_ITEM', dataItem)
            router.push({ name: 'dataview' })
        }
        /* 
                 fetchDevices({commit}, payload) {
                    if (state.devices !== null) {
                        state.devices = null
                    }
                    console.log('fetching devices....')

                    const devices = []
                    firebase.database().ref('Rooms').child(payload.userId).child(payload.roomId).child('Devices')
                        .on('value', (snapshot) => {
                            snapshot.forEach((childSnapshot) => {
                                const childDevice = childSnapshot.val()
                                const device = {
                                    id: childSnapshot.key,
                                    imgUrl: childDevice.imageUrl,
                                    roomID: childDevice.roomId,
                                    name: childDevice.deviceName,
                                    status: childDevice.status
                                }
                                devices.push(device)
                            });
                        });

                    commit('RESET_DEVICES', devices)

                }, 
                addNewRoom({ commit }, payload) {
                    const newRoom = {
                        userID: payload.userId,
                        roomName: payload.roomName,
                        imgUrl: payload.imageUrl,
                        nbrOfDevices: 0,
                        devices: []
                    }

                    firebase.database().ref('Rooms').child(payload.userId).push(newRoom)
                        .catch((err) => {
                            console.log(err.message)
                        })

                },
                
                */

    }
})