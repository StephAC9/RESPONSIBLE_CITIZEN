<template>
  <v-card>
    <v-card-text class="grey lighten-4">
      <v-sheet
        max-width="800"
        height="300"
        class="mx-auto"
      ></v-sheet>
    </v-card-text>
    <v-system-bar></v-system-bar>
    <v-toolbar flat>
      <v-toolbar-title>RECIEVED DATA</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-banner single-line>
      <div style="margin-bottom:50px">
      <label>Sender name: </label><br><br>
      <label>Sender phone number: </label><br><br>
      <label>Object description: </label><br><br>
      <label>Location description: </label><br><br>
      <label>Location address: </label><br>
      </div>
    </v-banner>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
    }),
  }
</script>