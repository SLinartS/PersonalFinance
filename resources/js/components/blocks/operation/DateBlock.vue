<template>
    <div class="data-block">
        <h3 class="data-title">{{datetime}}</h3>
        <div class="data-list">
            <OperationBlock v-for="operation in operations"
                            :key="operation.id"
                            :id="operation.id"
                            :description="operation.description"
                            :amount="operation.amount"
                            :datetime="operation.title"
            ></OperationBlock>
        </div>
    </div>
</template>

<script>
import OperationBlock from "./OperationBlock";
export default {
    name: "DateBlock",
    components: {OperationBlock},
    props: {
        datetime: String,
        operations: Array,
    }
}
</script>

<style scoped>

</style>
