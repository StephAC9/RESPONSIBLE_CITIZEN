import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authority: null,
        success_login: false,
        data: [],
        dataItem: null
    },
    getters: {
        authority: state => state.authority,
        success_login: state => state.success_login,
        data: state => state.data,
        dataItem: state => state.dataItem
    },
    mutations: {
        SET_AUTHORITY: (state, payload) => state.authority = payload,
        SUCCESS_LOGIN: (state, payload) => state.success_login = payload,
        /*  SET_DATA: (state, payload) => state.data = payload,
         SET_DATA_ITEM: (state, payload) => state.dataItem = payload */
    },
    actions: {
        setAuthority({ commit }, payload) {
            commit('SET_AUTHORITY', payload.authority.toLowerCase())
        },
        signUp({ commit }, payload) {
            commit('SET_AUTHORITY', payload.authority.toLowerCase())
            console.log('sign-up details: ', payload)
            router.push({ name: 'user', params: { option: 'login' } })
                .catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                });
        },
        signIn({ commit }, payload) {
            commit('SUCCESS_LOGIN', true)
            setTimeout(() => {
                router.push({ name: 'dashboard', params: { name: payload.authority } })
                    .catch(error => {
                        if (error.name != "NavigationDuplicated") {
                            throw error;
                        }
                    });
            }, 1500);
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
        }

    }
})