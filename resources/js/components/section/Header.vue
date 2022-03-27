<template>
    <header class="header">
        <div class="main-title">
            <img class="icon-main" src="../../../../public/assets/files/images/icon-svg.svg" alt="">
            <h1 class="main-title__text"><router-link to="/">РЭSources</router-link></h1>
        </div>
        <ul class="navigation-list">
            <li class="navigation-item"><router-link to="/balance">Баланс</router-link></li>
            <li class="navigation-item"><router-link to="/categories/expenses">Категории</router-link></li>
            <li class="navigation-item"><router-link to="/history">История</router-link></li>
            <li class="navigation-item"><router-link to="/analytics">Аналитика</router-link></li>
            <li class="navigation-item"><router-link to="/budget">Бюджет</router-link></li>
        </ul>
        <div class="header__buttons-section">
            <a class="button header__button button--auth" href="">Войти</a>
            <a class="button header__button button--reg" href="">Регистрация</a>
            <a class="icon-setting" href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M16 9v-2l-1.7-0.6c-0.2-0.6-0.4-1.2-0.7-1.8l0.8-1.6-1.4-1.4-1.6 0.8c-0.5-0.3-1.1-0.6-1.8-0.7l-0.6-1.7h-2l-0.6 1.7c-0.6 0.2-1.2 0.4-1.7 0.7l-1.6-0.8-1.5 1.5 0.8 1.6c-0.3 0.5-0.5 1.1-0.7 1.7l-1.7 0.6v2l1.7 0.6c0.2 0.6 0.4 1.2 0.7 1.8l-0.8 1.6 1.4 1.4 1.6-0.8c0.5 0.3 1.1 0.6 1.8 0.7l0.6 1.7h2l0.6-1.7c0.6-0.2 1.2-0.4 1.8-0.7l1.6 0.8 1.4-1.4-0.8-1.6c0.3-0.5 0.6-1.1 0.7-1.8l1.7-0.6zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                    <path d="M10.6 7.9c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"></path>
                </svg>
            </a>
        </div>
        <a class="icon-bars" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
            </svg>
        </a>
        <PopupNav v-if="popupNav"></PopupNav>
        <PopupAuth v-if="popupAuth"></PopupAuth>
        <PopupReg v-if="popupReg"></PopupReg>
    </header>
</template>

<script>
import PopupNav from "../blocks/PopupNav";
import PopupAuth from "../blocks/PopupAuth";
import PopupReg from "../blocks/PopupReg";
export default {
    name: "Header",
    computed: {
        popupNav() {
            return this.$store.getters.popupNav;
        },
        popupAuth() {
            return this.$store.getters.popupAuth;
        },
        popupReg() {
            return this.$store.getters.popupReg;
        }
    },
    components: {PopupReg, PopupAuth, PopupNav}
}
</script>

<style scoped>

</style>
