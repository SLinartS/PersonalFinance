<template>
    <div class="data-stroke">
        <div class="data-stroke__button-block">
            <button class="data-title__button"></button>
            <button class="data-title__button"></button>>
            <p class="data-item">{{ title }}</p>
        </div>
        <p class="data-item">{{ amount }} ₽</p>
    </div>
</template>

<script>
export default {
    name: "SavingBlock",
    props: {
        id: Number,
        title: String,
        amount: String
    }
}
</script>

<style scoped>
</style>
