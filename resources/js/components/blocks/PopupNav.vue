<template>
    <div class="popup">
        <div class="popup__header">
            <button type="button" class="icon-setting icon-setting--popup button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M16 9v-2l-1.7-0.6c-0.2-0.6-0.4-1.2-0.7-1.8l0.8-1.6-1.4-1.4-1.6 0.8c-0.5-0.3-1.1-0.6-1.8-0.7l-0.6-1.7h-2l-0.6 1.7c-0.6 0.2-1.2 0.4-1.7 0.7l-1.6-0.8-1.5 1.5 0.8 1.6c-0.3 0.5-0.5 1.1-0.7 1.7l-1.7 0.6v2l1.7 0.6c0.2 0.6 0.4 1.2 0.7 1.8l-0.8 1.6 1.4 1.4 1.6-0.8c0.5 0.3 1.1 0.6 1.8 0.7l0.6 1.7h2l0.6-1.7c0.6-0.2 1.2-0.4 1.8-0.7l1.6 0.8 1.4-1.4-0.8-1.6c0.3-0.5 0.6-1.1 0.7-1.8l1.7-0.6zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                    <path d="M10.6 7.9c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"></path>
                </svg>
            </button>
            <button @click="togglePopupNav" type="button" class="icon-close icon-close--popup button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85 320 335">
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                </svg>
            </button>
        </div>
        <ul class="popup__navigation-list">
            <li class="popup__navigation-item">Баланс</li>
            <li class="popup__navigation-item">Категории</li>
            <li class="popup__navigation-item">История</li>
            <li class="popup__navigation-item">Аналитика</li>
            <li class="popup__navigation-item">Бюджет</li>
        </ul>
        <div class="popup__buttons-section ">
            <a class="button popup__button button--auth" href="">Войти</a>
            <a class="button popup__button button--reg" href="">Регистрация</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupNav",
    methods: {
        togglePopupNav() {
            this.$store.commit("togglePopupNav", false)
        },
    }

}
</script>

<style scoped>

</style>
