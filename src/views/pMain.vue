<template>
    <section>
        <v-app-bar app color="primary" dark>
            <div class="c-container d-flex align-center justify-center mx-auto">
                <div class="d-flex align-center mr-5">
                    <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                        transition="scale-transition"
                        width="40"
                    />
                    <v-img
                        alt="Vuetify Name"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                        width="100"
                    />
                </div>
                <v-btn @click="removeStorage" class="red">Nullify storage</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="isLogin" @click="logoutUser" class="warning mr-2">Logout user</v-btn>
                <template v-if="!isLogin">
                    <v-btn @click="loginUser" class="green mr-2">Login user</v-btn>
                    <v-btn @click="registerUser" class="warning">Register user</v-btn>
                </template>
            </div>
        </v-app-bar>
        <v-content v-if="isLogin">
            <v-container>
                <v-row class="text-center c-container mx-auto">
                    <v-card class="flex-grow-1" outlined>
                        <v-card-title class="justify-center display-2 w-auto">{{ getFullName }}</v-card-title>
                        <v-card-subtitle class="subtitle-1">{{ currentUser.email }}</v-card-subtitle>
                        <v-card-text class="display-1">Welcome to our site</v-card-text>
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                width="100%"
                                src="https://www.wheninmanila.com/wp-content/uploads/2017/11/successful-gif.gif"
                        ></v-img>
                    </v-card>
                </v-row>
            </v-container>
        </v-content>
        <v-content v-else>
            <v-container>
                <v-col cols="12">
                    <v-img
                        :src="require('../assets/logo.svg')"
                        class="my-3"
                        contain
                        height="200"
                    />
                </v-col>
                <v-col class="text-center c-container mx-auto">
                    <h1 class="text-uppercase green--text">Status:</h1>
                    <h3>{{ textField }}</h3>
                </v-col>
            </v-container>
        </v-content>
    </section>
</template>

<script>
    export default {
        name: 'pMain',
        data: () => ({
            isLogin: false,
            isData: false,
            currentUser: {},
            textField: null
        }),
        methods: {
            loginUser() {
                this.$emit('openLogin', true);
            },
            registerUser() {
                this.$emit('openRegister', true);
            },
            logoutUser(){
                localStorage.removeItem('currentUser');
                localStorage.removeItem('loginState');
                this.isLogin = false;
            },
            removeStorage() {
                localStorage.clear();
                this.refreshData();
                this.textField = 'localStorage is empty';
                console.clear();
            },
            getCurrentText() {
                this.textField = JSON.parse(localStorage.getItem('loginData'));
            },
            refreshData(){
                this.isLogin = JSON.parse(localStorage.getItem('loginState'));
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this.isData = JSON.parse(localStorage.getItem('loginData'));
            }
        },
        computed: {
            getFullName() {
                return this.currentUser.firstName + ' ' + this.currentUser.lastName;
            },
        },
        mounted() {
            this.textField = JSON.parse(localStorage.getItem('loginData'));
            if(this.textField === null) {
                this.textField = 'localStorage is empty';
            }
            this.refreshData();
        }
    }
</script>

<style>
    .c-container {
        width: 1040px;
    }
</style>
