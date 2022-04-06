<template>
    <div class="balance-change">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
            <svg
                @click="togglePopupBalanceChange"
                class="icon-close icon-close--balance-change"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
            >
                <path
                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                />
            </svg>
        </div>
        <div class="change__block">
            <h2 class="change__block-title">Название</h2>
            <input type="text" class="change__block-input" />
            <h2 class="change__block-title">Сумма</h2>
            <input type="text" class="change__block-input" />
        </div>
        <div class="balance-change__button-section">
            <button class="button button--cancel balance-change__button" href>Отмена</button>
            <button class="button button--save balance-change__button" href>Сохранить</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupBalanceChange",
    data() {
        return {

        }
    },
    watch: {

    },
    computed: {

    },
    methods: {
        togglePopupBalanceChange() {
            this.$store.commit("togglePopupBalanceChange", false)
        }
    },
}
</script>

<style scoped>
</style>
