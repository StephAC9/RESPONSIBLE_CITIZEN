<template>
    <div>
        <v-app id="inspire">
            <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                align="center"
                justify="center"
                >
                <v-col
                    cols="12"
                    sm="8"
                    md="4"
                >
                    <v-card class="elevation-12">
                    <v-toolbar
                        color="primary"
                        dark
                        flat
                    >
                        <v-toolbar-title>Register</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field
                            label="Firstname"
                            name="firstname"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="firstName"
                        ></v-text-field>
                        <v-text-field
                            label="Lastname"
                            name="lastname"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="lastName"
                        ></v-text-field>    
                        <v-text-field
                            label="Email"
                            name="email"
                            prepend-icon="mdi-account"
                            type="email"
                            v-model="email"
                        ></v-text-field>
                        <v-text-field
                            label="Phone number"
                            name="phone"
                            prepend-icon="mdi-account"
                            type="text"
                            v-model="phoneNumber"
                        ></v-text-field>

                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="password"
                        ></v-text-field>
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
                            </v-menu><hr>
                            <div style="padding-left:10px">
                                <v-text-field v-model="chosenAuthority"></v-text-field>
                            </div>
                        </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="signUp" color="primary">Sign up</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
            </v-content>
        </v-app>
    </div>
</template>
<script>
export default {
    name:'SignUp',
    data(){
      return{
        firstName:null, 
        lastName:null, 
        email:null,
        phoneNumber:null,  
        password:null,
        chosenAuthority:null,    
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
          this.chosenAuthority = authority
          console.log(this.chosenAuthority)
      },


      signUp(){
          this.$store.dispatch('signUp',{firstName:this.firstName,lastName:this.lastName,email:this.email,phoneNumber:this.phoneNumber,password:this.password,authority:this.chosenAuthority})
      }
    }
}
</script>