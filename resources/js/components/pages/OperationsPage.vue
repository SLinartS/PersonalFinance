<template>
    <main class="balance-history">
        <DateBlock v-if="currentOperations.length" v-for="operation in currentOperations"
              :key="operation.id"
              :id="operation.id"
              :description="operation.description"
              :amount="operation.amount"
              :datetime="operation.title"

        ></DateBlock>
        <DateBlock v-else v-for="operation in currentOperations"
              :key="operation.id"
              :id="operation.id"
              :datetime="operation.title"
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
            let allOperation = this.$store.getters.currentOperations;
            let sortedOperations = [];
            if (allOperation[1]) {
                let o = allOperation[1].time;
                let time = new Date(o)
                let year = time.getFullYear()
                let month = time.getMonth()+1
                let day = time.getDate()
                console.log(year, month, day)
            }

            return allOperation
            let currentDate;
            let currentPlace = 0;
            for (let i = 0; i < allOperation.length; i++) {
                if (i === 0) {
                    currentDate = allOperation[i].category
                }
                if (currentDate === allOperation[i].category) {
                    sortedOperations.push([])
                    sortedOperations[currentPlace].push(allOperation[i])
                } else {
                    currentPlace++;
                    currentDate = allOperation[i].category
                }
            }

        },
    }
}
</script>

<style scoped>

</style>
