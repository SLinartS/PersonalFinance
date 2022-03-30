<template>
    <div class="data-block">
        <h3 class="data-title">{{ formattedDate }}</h3>
        <div class="data-list">
            <OperationBlock v-for="operation in operations"
                            :key="operation.id"
                            :id="operation.id"
                            :description="operation.description"
                            :amount="operation.amount"
                            :datetime="operation.title"
                            :type="operation.type"
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
    },
    computed: {
        formattedDate() {
            let date = new Date(this.datetime)
            let currentDate = new Date()
            let options = {
                day: "numeric",
                month: "long"
            }
            currentDate = currentDate.toLocaleString("ru", options)
            date = date.toLocaleString("ru", options)
            if (currentDate === date) {
                return date + " (сегодня)"
            } else {
                return date
            }
        }
    }
}
</script>

<style scoped>

</style>
