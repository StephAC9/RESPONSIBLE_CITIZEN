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
      <v-card-title>Description</v-card-title>
    </v-img>
    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    name:'DataItem'
}
</script>