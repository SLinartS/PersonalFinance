<template>
    <div class="data-stroke">
        <p class="data-item">{{description}}</p>
        <p class="data-item expenses">{{amount}} ₽</p>
    </div>
</template>

<script>
export default {
    name: "OperationBlock",
    props: {
        id: Number,
        description: String,
        amount: String,
        datetime: String,
    }
}
</script>

<style scoped>

</style>
