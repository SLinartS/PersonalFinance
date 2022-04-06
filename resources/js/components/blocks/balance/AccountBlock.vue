<template>
    <div class="data-stroke">
        <div class="data-stroke__button-block">
            <button class="data-title__button"></button>
            <button class="data-title__button" @click="togglePopupBalanceChange"></button>
            <p class="data-item">{{ title }}</p>
        </div>
        <p class="data-item">{{ amount }} ₽</p>
    </div>
</template>

<script>
export default {
    name: "AccountBlock",
    props: {
        id: Number,
        title: String,
        amount: String
    },
        methods: {
        togglePopupBalanceChange() {
            this.$store.commit("togglePopupBalanceChange", true)
        }
    },
}
</script>

<style scoped>
</style>
