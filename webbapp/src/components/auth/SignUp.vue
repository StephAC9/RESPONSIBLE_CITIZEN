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
                        ></v-text-field>
                        <v-text-field
                            label="Lastname"
                            name="lastname"
                            prepend-icon="mdi-account"
                            type="text"
                        ></v-text-field>    
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
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary">Sign up</v-btn>
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
        this.$router.push({name:'user',params:{option:'login'}})
      }
    }
}
</script>