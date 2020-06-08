<template>
    <div class="user-container">
        <div v-if="$route.params.option == 'login'" class="sign-container">
            <Auth>
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
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                <v-text-field
                                    label="Login"
                                    name="login"
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
                                <v-btn color="primary">Login</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-content>
                </v-app>
            </Auth>
        </div>
        <div v-if="$route.params.option == 'register'" class="sign-container">
            <Auth>
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
                                <v-toolbar-title>Register form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                <v-text-field
                                    label="Login"
                                    name="login"
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
                                <v-btn color="primary">Sign up</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-content>
                </v-app>
            </Auth>
        </div>
    </div>
</template>
<script>
import Auth from '../components/auth/Auth'
export default {
    name:'User',
    components:{
        Auth
    },
    props: {
      source: String,
    },
}
</script>
<style scoped>
    .user-container{
        text-align: center;
    }
    .sign-container{
        padding: 20px;
        margin: 0 auto;
    }

</style>