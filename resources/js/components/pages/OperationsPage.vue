<template>
    <main class="balance-history">
        <DateBlock v-if="currentOperations.length" v-for="operations in currentOperations"
                   :key="operations.id"
                   :datetime="operations[0].time"
                   :operations="operations"
        ></DateBlock>
        <DateBlock v-else v-for="operations in currentOperations"
                   :key="operation.id"
                   :operations="operations"
        ></DateBlock>
    </main>
</template>

<script>
import DateBlock from "../blocks/operation/DateBlock";

export default {
    name: "OperationsPage",
    components: {DateBlock},
    data() {
        return {}
    }, mounted() {
        this.loadDateFromDB()
    },
    methods: {
        async loadDateFromDB() {
            this.$store.dispatch("loadOperationFromDB")
        }
    },
    computed: {
        currentOperations() {
            return this.$store.getters.currentOperations;
        },
    }
}
</script>

<style scoped>

</style>
