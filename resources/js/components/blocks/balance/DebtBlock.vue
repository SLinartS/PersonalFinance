<template>
    <div class="data-stroke">
        <div class="data-stroke__button-block">
            <button class="data-title__button" @click="deleteStroke"></button>
            <button class="data-title__button" @click="togglePopupBalanceChange"></button>
            <p class="data-item">{{ title }}</p>
        </div>
        <p class="data-item">{{ amount }} ₽</p>
    </div>
</template>

<script>
export default {
    name: "DebtBlock",
    props: {
        id: Number,
        title: String,
        amount: String
    },
    methods: {
        togglePopupBalanceChange() {
            this.$store.dispatch("loadBalanceDataFromDBById", { id: this.id, type: "debt" })
            this.$store.commit("togglePopupBalanceChange", true)
        },
        deleteStroke() {
            this.$store.dispatch("deleteBalanceDataFromDBById", { id: this.id, type: "debt" })
            this.$store.dispatch("loadBalanceDataFromDB", "debt")
        }
    },
}
</script>

<style scoped>
</style>
