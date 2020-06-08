<template>
  <div class="home-container">
    <div style="text-align: center; margin-top:100px;margin-bottom:50px">
        <h2>Select the authority you would like to connect with before signing in please!</h2>
    </div>  
    <div class="element">
      <v-row justify="space-around">
        <v-menu
          bottom
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
            >
              Choose authority
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="getAuthority(item.authority)"
            >
              <v-list-item-title>{{ item.authority }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data(){
      return{
        items: [
        { authority: 'POLICE' },
        { authority: 'SKATTEVERKET' },
        { authority: 'KOMMUN' },
        { authority: 'MIGRATIONVERKET' },
      ],
      }
    },
    methods:{
      getAuthority(authority){
        console.log(authority)
        this.$store.dispatch('setAuthority',{authority:authority})
        this.$router.push({name:'user',params:{option:'login'}})
      }
    }
  }
</script>
<style  scoped>
  .home-container{
    padding-top: 10%;
  }
  .element{
    margin: 0 auto;
  }
</style>