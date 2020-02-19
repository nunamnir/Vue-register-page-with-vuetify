<template>
    <v-app id="app">
        <p-main
            ref="pMain"
            v-on:openLogin="openLogin"
            v-on:openRegister="openRegister">
        </p-main>

        <v-modal_reg
            v-on:closeRegister="closeRegister"
            v-on:refreshData="refreshData"
            v-on:refreshText="refreshText"
            :bool="boolRegister">
        </v-modal_reg>

        <v-modal_log
            v-on:closeLogin="closeLogin"
            v-on:refreshData="refreshData"
            v-on:refreshText="refreshText"
            :bool="boolLogin">
        </v-modal_log>
    </v-app>
</template>

<script>
    import pMain from './views/pMain.vue';
    import vModal_reg from './components/vModal_reg.vue';
    import vModal_log from './components/vModal_log.vue';

    export default {
        name: 'App',
        components: { pMain, vModal_reg, vModal_log },
        data: () => ({
            boolRegister: false,
            boolLogin: false
        }),
        methods: {
            openLogin(bool) {
                this.boolLogin = bool;
            },
            closeLogin(result) {
                this.boolLogin = result;
            },
            openRegister(bool) {
                this.boolRegister = bool;
            },
            closeRegister(result) {
                this.boolRegister = result;
            },
            refreshText() {
                this.$refs.pMain.getCurrentText();
            },
            refreshData() {
                this.$refs.pMain.refreshData();
            }
        }
    };
</script>

<style></style>