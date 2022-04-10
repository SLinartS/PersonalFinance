<template>
    <div class="data-block">
        <h3 class="data-title data-title--history">{{ formattedDate }}</h3>
        <div class="data-list data-list--history">
            <OperationBlock v-for="operation in operations"
                            :key="operation.id"
                            :id="operation.id"
                            :description="operation.description"
                            :amount="operation.amount"
                            :datetime="operation.time"
                            :type="operation.type"
                            :accountType="operation.accountType"
                            :accountTitle="operation.accountTitle"
            ></OperationBlock>
        </div>
    </div>
</template>

<script>
import OperationBlock from "./OperationBlock";
import moment from "moment";
export default {
    name: "DateBlock",
    components: {OperationBlock},
    props: {
        datetime: String,
        operations: Array,
    },
    computed: {
        formattedDate() {
            return moment(this.datetime).format("D MMMM YYYY") + " г."
        }
    }
}
</script>

<style scoped>

</style>
