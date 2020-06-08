<template>
  <v-card
    class="mx-auto"
    max-width="100%"
  >
    <v-img
      class="white--text align-end"
      height="100px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <!-- src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" -->
      <v-card-title>Description</v-card-title>
    </v-img>
    <img style="height:50px" :src="item.url" alt="">
    <v-card-actions>
      <p>{{item.senderName}}</p>
      <p>{{item.senderphoneNumber}}</p>
      <v-btn
        color="orange"
        text
        @click="viewData(item)"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    name:'DataItem',
    props:['item'],
    data:()=>({

    }),
    methods:{
        viewData(item){
          this.$store.dispatch('fetchDataItem',item)
        }
    }
}
</script>