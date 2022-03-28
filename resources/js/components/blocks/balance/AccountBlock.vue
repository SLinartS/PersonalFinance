<template>
    <div class="data-stroke">
        <p class="data-item">{{title}}</p>
        <p class="data-item">{{amount}} ₽</p>
    </div>
</template>

<script>
export default {
    name: "AccountBlock",
    props: {
        id: Number,
        title: String,
        amount: String
    }
}
</script>

<style scoped>

</style>
