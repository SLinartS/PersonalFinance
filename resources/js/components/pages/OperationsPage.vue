<template>
    <main class="balance-history">
        <OperationsSearch
            v-model="searchCrit"
            @updateSearchText="loadDateByUserIdText"
            @updateSearchTime="loadDateByUserIdTime"
        ></OperationsSearch>
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
                    <p class="data-item--empty">Операции осутствуют</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import DateBlock from "../blocks/operation/DateBlock";
import OperationsSearch from "../blocks/operation/OperationsSearch.vue";

export default {
    name: "OperationsPage",
    components: { DateBlock, OperationsSearch },
    data() {
        return {
            searchCrit: "",
        };
    },
    mounted() {
        this.loadDateByUserIdText();
    },
    methods: {
        loadDateByUserIdText() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOperationByUserId");
            }
        },
        loadDateByUserIdTime(range) {
            if (this.AuthStatusStatus) {
                this.$store.commit(
                    "setSearchRangeStart",
                    range["rangeStart"] + " 00:00:00"
                );
                this.$store.commit(
                    "setSearchRangeEnd",
                    range["rangeEnd"] + " 23:59:59"
                );
                this.$store.dispatch("loadOperationByUserId");
            }
        },
    },
    computed: {
        currentOperations() {
            return this.$store.getters.currentOperations;
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
    },
    watch: {
        searchCrit() {
            this.$store.commit("setSearchCrit", this.searchCrit);
        },
    },
};
</script>

<style scoped></style>
