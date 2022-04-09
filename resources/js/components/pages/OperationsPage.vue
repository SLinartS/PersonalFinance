<template>
    <main class="balance-history">
        <div class="container-for-vue" v-if="currentOperations.length">
            <DateBlock
                v-for="operations in currentOperations"
                :key="operations.id"
                :datetime="operations[0].time"
                :operations="operations"
            ></DateBlock>
        </div>
        <div v-else class="data-block">
            <h3 class="data-title">Операции нет</h3>
            <div class="data-list">
                <div class="data-stroke">
                    <p class="data-item">Операции осутствуют</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import DateBlock from "../blocks/operation/DateBlock";

export default {
    name: "OperationsPage",
    components: { DateBlock },
    data() {
        return {};
    },
    mounted() {
        this.loadDateByUserId();
    },
    methods: {
        loadDateByUserId() {
            this.$store.dispatch("loadOperationByUserId");
        },
    },
    computed: {
        currentOperations() {
            return this.$store.getters.currentOperations;
        },
    },
};
</script>

<style scoped>
</style>
