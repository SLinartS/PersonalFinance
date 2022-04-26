<template>
    <div class="auth-reg auth-reg--auth">
        <div class="auth-reg__header">
            <h2 class="auth-reg__header__title">Авторизация</h2>
            <svg @click="togglePopupAuth" class="icon-close icon-close--auth-reg" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 320 512">
                <path
                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
            </svg>
        </div>
        <form @submit.prevent="submitForm">
        <div class="auth-reg__input-section">
            <div class="auth-reg__input-block">
                <img class="auth-reg__image" src="../../../../../public/assets/files/images/user-solid.svg" alt="">
                <div class="auth-reg__input-container">
                    <input v-model="fieldEmail" class="input" type="text" name="email" placeholder="Электронная почта">
                    <p class="error-p"> {{ emailExist }} </p>
                </div>
            </div>
            <div class="auth-reg__input-block">
                <img class="auth-reg__image" src="../../../../../public/assets/files/images/key-solid.svg" alt="">
                <div class="auth-reg__input-container">
                    <input v-model="fieldPassword" class="input" type="password" name="password" placeholder="Пароль">
                    <p class="error-p"> {{ passwordExist }} </p>
                </div>
            </div>
            <div class="auth-reg__input-block">
                <a class="auth-reg__forgot-password" href="">Забыли пароль?</a>
            </div>
        </div>
        <div class="auth-reg__button-section">
            <button class="button button--auth auth-reg__button" href="">Войти в систему</button>
        </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PopupAuth",
    data() {
        return {
            fieldEmail: "",
            fieldPassword: "",
        }
    },
    watch: {
        fieldEmail() {
            this.$store.commit("setEmailField", this.fieldEmail)
        },
        fieldPassword() {
            this.$store.commit("setPasswordField", this.fieldPassword)
        },
    },
    computed: {
        emailExist() {
            return this.$store.getters.getEmailExist
        },
        passwordExist() {
            return this.$store.getters.getPasswordExist
        },
    },
    methods: {
        togglePopupAuth() {
            this.$store.commit("togglePopupAuth", false)
            this.$store.commit("changeErrors", {})
        },
        submitForm() {
            this.$store.dispatch("validateFieldsAuthReg", 0)
        },
    },
}
</script>

<style scoped>

</style>
