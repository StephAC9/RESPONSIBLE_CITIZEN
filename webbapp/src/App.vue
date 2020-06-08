<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center logo">
        RESPONSIBLE CITIZEN
      </div>

      <v-spacer></v-spacer>

      <div v-if="!success_login">
        <v-btn @click="signUp" depressed small style="margin-right:5px">
          <span class="mr-2">SignUp</span>
        </v-btn>
        <v-btn @click="chooseAuthority" depressed small>
            <span class="mr-2">SignIn</span>
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
    //
  }),
  computed:{
    ...mapGetters(['success_login']),
  },
  methods:{
    chooseAuthority(){
      this.$router.push({name:'user',params:{option:'authority'}})
    },
    signUp(){
      this.$store.dispatch('signUp')
    }
  },

  watch:{
    success_login: {
            handler: function(newValue) {
                console.log("New age: " + newValue)
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
  }
</style>
