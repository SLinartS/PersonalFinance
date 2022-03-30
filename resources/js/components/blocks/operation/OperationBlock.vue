<template>
    <div class="data-stroke">
        <p class="data-item">{{ description }}</p>
        <p :class="[operationClass, 'data-item']">{{ operationMark }} {{ amount }} ₽</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            operationClass: "expenses",
            operationMark: "+"
        }
    },
    name: "OperationBlock",
    props: {
        id: Number,
        description: String,
        amount: String,
        type: String,
    },
    mounted() {
        if (this.type === "income") {
            this.operationMark = "+"
            this.operationClass = "income"
        } else {
            this.operationMark = "-"
            this.operationClass = "expenses"
        }
    },
}
</script>

<style scoped>

</style>
