<template>
    <div class="data-block">
        <h3 class="data-title">{{datetime}}]</h3>
        <div class="data-list">
<!--            <Operation v-for="operation"-->
<!--                       :id="operation.id"-->
<!--                       :description="operation.description"-->
<!--                       :amount="operation.amount"-->
<!--                       :datetime="operation.title"-->

<!--            ></Operation>-->
        </div>
    </div>
</template>

<script>
import Operation from "./Operation";
export default {
    name: "Date",
    components: {Operation},
    props: {
        id: Number,
        description: String,
        amount: String,
        datetime: Date
    }
}
</script>

<style scoped>

</style>
