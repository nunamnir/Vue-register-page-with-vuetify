<template>
    <v-row justify="center">
        <v-dialog v-model="findModalLogin" persistent max-width="600">
            <v-card class="elevation-12">
                <v-toolbar color="green" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeLoginModal"
                           class="w-auto white--text"
                           color="secondary lighten-2" small>Close</v-btn>
                </v-toolbar>
                <v-card-text class="py-5">
                    <v-form ref="loginForm">
                        <v-text-field
                            v-model="login.email"
                            label="Email"
                            name="email"
                            prepend-icon="email"
                            type="text"
                        ></v-text-field>

                        <v-text-field
                            v-model="login.password"
                            label="Password"
                            name="password"
                            :append-icon="login.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="login.showPassword ? 'text' : 'password'"
                            prepend-icon="lock"
                            @click:append="login.showPassword = !login.showPassword"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="loginUser"
                           class="flex-grow-1 white--text"
                           color="green">Login me</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "vModal_log",
        props: ['bool'],
        data: () => ({
            currentUser: {},
            modalLogin: false,
            login: {
                email: '',
                password: '',
                showPassword: false,
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
            }
        }),
        methods: {
            loginUser() {
                let bool = false;
                bool = this.$refs.loginForm.inputs.every((input, index) => {
                    console.log('log input ' + index, input.valid, input.value);
                    return input.valid;
                });
                console.log('log bool', bool);
                if(bool) {
                    let loginData = {
                        email: this.login.email,
                        password: this.login.password
                    };
                    let storageData = JSON.parse(localStorage.getItem('loginData'));
                    if(storageData) {
                        let result = false;
                        storageData.find((element) => {
                            if(element.email === loginData.email && element.password === loginData.password) {
                                this.currentUser = {
                                    id: element.id,
                                    firstName: element.firstName,
                                    lastName: element.lastName,
                                    email: element.email,
                                    password: element.password
                                };
                                // this.isLogin = true;
                                this.$refs.loginForm.reset();
                                result = true;
                            }
                        });
                        if(result) {
                            // alert('You are successfully logged in!\n\nCurrent user:\nfullname: ' +  this.getFullName + '\n' + 'email: ' +  this.currentUser.email);
                            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                            localStorage.setItem('loginState', JSON.stringify(true));
                            this.$emit('closeLogin', false);
                            this.$emit('refreshData');
                        }
                        else {
                            this.$refs.loginForm.reset();
                            alert('There is no such user, please try again...');
                        }
                    } else {
                        // if storage data empty
                        this.$refs.loginForm.reset();
                        this.$emit('closeLogin', false);
                        alert('LocalStorage is empty, "save data" or register new user!');
                    }
                } else alert('Please, required to fill all of the fields.');
            },
            closeLoginModal() {
                this.$emit('closeLogin', false);
            }
        },
        computed: {
            findModalLogin() {
                return this.modalLogin = this.bool;
            },
            getFullName() {
                return this.currentUser.firstName + ' ' + this.currentUser.lastName;
            },
        },
        mounted() {
            console.log('localStorage', localStorage);
        }
    }
</script>

<style></style>