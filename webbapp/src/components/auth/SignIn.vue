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
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                        <v-text-field
                            label="Email"
                            name="email"
                            prepend-icon="mdi-account"
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                        ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="login" color="primary">Login</v-btn>
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
import {mapGetters} from 'vuex'
export default {
    name:'SignIn',
    data(){
        return{
            email:null,
            password:null
        }
    },
    computed:{
        ...mapGetters(['authority'])
    },
    methods:{
        login(){
            this.$store.dispatch('signIn',{email:this.email,password:this.password,authority:this.authority})
        }
    }


}
</script>
