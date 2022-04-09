<template>
    <div class="balance-change balance-change--delete">
        <div class="balance-change__header"></div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Удалить операцию "{{ currentData['description'] }}"?</h2>
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupOperationDelete"
                >Отмена</button>
                <button
                    type="button"
                    @click="deleteOperationItem"
                    class="button button--save balance-change__button"
                >Удалить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PopupOperationDelete",
    data() {
        return {
            id: "",
            description: "",
            amount: "",
            type: "",
            time: "",
        }
    },
    computed: {
        currentData() {
            const getData = this.$store.getters.getChangedDataOperation
            this.description = getData["description"]
            this.amount = getData["amount"]
            this.type = getData["type"]
            this.id = getData["id"]
            this.time = getData["time"]
            return getData;
        },
        currentPopupOperationDelete() {
            return this.$store.getters.popupOperationDelete
        },
    },
    methods: {
        togglePopupOperationDelete() {
            this.$store.commit("togglePopupOperationDelete", { status: false, typeBlock: "" })
            this.$store.commit("setChangedDataOperation", [])
        },
        deleteOperationItem() {
            this.$store.dispatch("deleteOperationDataById", this.id)
            this.$store.dispatch("loadOperationByUserId")
            this.$store.commit("togglePopupOperationDelete", { status: false })
        },
    },
}
</script>

<style scoped>
</style>
