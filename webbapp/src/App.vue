<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div @click="goHome" class="d-flex align-center logo">
        RESPONSIBLE CITIZEN
      </div>

      <v-spacer></v-spacer>

      <div v-if="!success_login">
        <v-btn @click="gotToUserPage('register')" depressed small style="margin-right:5px">
          <span class="mr-2">SignUp</span>
        </v-btn>
        <v-btn @click="gotToUserPage('authority')" depressed small>
            <span class="mr-2">SignIn</span>
        </v-btn>
      </div>
      <div v-if="success_login">
        <v-btn @click="signOut" depressed small style="margin-right:5px">
          <span class="mr-2">SignOut</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',

  data: () => ({
  }),
  computed:{
    ...mapGetters(['success_login']),
  },
  methods:{
    gotToUserPage(option){
      this.$router.push({name:'user',params:{option:option}})
    },
    signOut(){
      this.$store.dispatch('signOut')
    },
    goHome(){
      this.$router.push('/home')
      .catch(error => {
        console.log(error)
        if (error.name != "NavigationDuplicated") {
            throw error;
        }
      })
    }
  },

  watch:{
    success_login: {
            handler: function(newValue) {
                console.log("successful login: " + newValue)
            },
            deep: true,
            immediate: true
        }
  }
};
</script>
<style  scoped>
  .logo{
    font-weight: bold;
    cursor: pointer;
  }
  .logo:hover{
    color: rgb(250, 242, 242);
  }
</style>
