<template>
    <v-row justify="center">
        <v-dialog v-model="findModalRegister" persistent max-width="600">
            <v-card class="elevation-12">
                <v-toolbar color="warning" dark flat>
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeRegisterModal"
                           class="w-auto white--text"
                           color="secondary lighten-2" small>Close</v-btn>
                </v-toolbar>
                <v-card-text class="py-5">
                    <v-form action="" ref="registerForm">
                        <v-layout d-flex>
                            <v-text-field
                                v-model="register.firstName"
                                label="First name"
                                name="firstName"
                                hint="Less than 12 characters"
                                :counter="12"
                                :rules="register.firstNameRules"
                                prepend-icon="person"
                                type="text"
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="register.lastName"
                                label="Last name"
                                name="lastName"
                                hint="Less than 12 characters"
                                :counter="12"
                                :rules="register.lastNameRules"
                                type="text"
                            ></v-text-field>
                        </v-layout>

                        <v-text-field
                            v-model="register.email"
                            id="email"
                            label="Email"
                            name="email"
                            :rules="register.emailRules"
                            prepend-icon="email"
                            type="email"
                        ></v-text-field>

                        <v-text-field
                            v-model="register.password"
                            id="password"
                            label="Password"
                            name="password"
                            :append-icon="register.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="register.passwordRules"
                            :type="register.showPassword ? 'text' : 'password'"
                            prepend-icon="lock"
                            hint="At least 6 characters"
                            @click:append="register.showPassword = !register.showPassword"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="registerUser"
                           class="flex-grow-1 white--text"
                           color="warning">Register me</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "vModal_reg",
        props: ['bool'],
        data: () => ({
            // currentUser: {},
            modalRegister: false,
            register: {
                firstName: '',
                firstNameRules: [
                    v => !!v || 'firstName is required',
                    v => (v && v.length <= 12) || 'firstName must be less than 12 characters',
                ],
                lastName: '',
                lastNameRules: [
                    v => !!v || 'lastName is required',
                    v => (v && v.length <= 12) || 'lastName must be less than 12 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: '',
                showPassword: false,
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be more than 6 characters'
                ],
            }
        }),
        methods: {
            getUniqId() {
                let storage = JSON.parse(localStorage.getItem('loginData'));
                if(storage) {
                    return storage.length;
                } else return 0;
            },
            registerUser() {
                console.log('register +');
                let bool = false;
                bool = this.$refs.registerForm.inputs.every((input, index) => {
                    console.log('reg input ' + index, input.valid, input.value);
                    return input.valid;
                });
                console.log('reg bool', bool);
                if(bool) {
                    let id = this.getUniqId();
                    console.log('return id: ', id);
                    let newUser = {
                        id: id,
                        firstName: this.register.firstName.trim(),
                        lastName: this.register.lastName.trim(),
                        email: this.register.email.trim(),
                        password: this.register.password.trim()
                    };
                    let storageData = JSON.parse(localStorage.getItem('loginData'));
                    if(storageData) {
                        let result = false;
                        storageData.find((element) => {
                            if(element.email === newUser.email) {
                                result = true;
                            }
                        });
                        if(result) {
                            alert('User with that email is already exist.');
                            this.$refs.registerForm.reset();
                            return;
                        }
                        let dataArray = [];
                        dataArray = JSON.parse(localStorage.getItem('loginData'));
                        dataArray.push(newUser);
                        localStorage.setItem('loginData', JSON.stringify(dataArray));
                    } else {
                        let newData = [];
                        newData.push(newUser);
                        localStorage.setItem('loginData', JSON.stringify(newData));
                    }
                    this.$refs.registerForm.reset();
                    this.$emit('closeRegister', false);
                    // имитировать событие в родителе
                    this.$emit('refreshText');
                    this.$emit('refreshData');
                }
                else alert('Please, required to fill all of the fields');
            },
            closeRegisterModal() {
                this.$emit('closeRegister', false);
            }
        },
        computed: {
            findModalRegister() {
                return this.modalRegister = this.bool;
            }
        },
        mounted() {
            console.log('localStorage', localStorage);
        }
    }
</script>

<style scoped>

</style>