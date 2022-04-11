<template>
    <div class="balance-change balance-change--delete">
        <div class="balance-change__header"></div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Удалить {{ typeBlock }} "{{ currentText }}"?</h2>
            </div>
            <div class="balance-change__button-section">
                <button type="button" class="button button--cancel balance-change__button"
                    @click="togglePopupOperationDelete">Отмена</button>
                <button type="button" @click="deleteOperationItem"
                    class="button button--save balance-change__button">Удалить</button>
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
            typeBlock: "",
        }
    },
    computed: {
        currentDataCategory() {
            return this.$store.getters.getChangedDataCategory;
        },
        currentDataOperation() {
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
        currentText() {
            if (this.currentPopupOperationDelete["typeBlock"] === "operation") {
                this.typeBlock = "операцию"
                return this.currentDataOperation["description"]
            } else {
                this.typeBlock = "категорию"
                return this.currentDataCategory["title"]
            }
        }
    },
    methods: {
        togglePopupOperationDelete() {
            this.$store.commit("togglePopupOperationDelete", { status: false, categoryId: "", typeAction: "", typeBlock: "" })
            this.$store.commit("togglePopupOperationAdd", { status: true });
            this.$store.commit("setChangedDataOperation", [])
        },
        deleteOperationItem() {
            if (this.currentPopupOperationDelete["typeBlock"] === "operation") {
                this.$store.dispatch("deleteOperationById", this.id)
                this.$store.dispatch("loadOperationByUserId")
                this.$store.commit("togglePopupOperationDelete", { status: false, categoryId: "", typeAction: "", typeBlock: "" })
            } else {
                this.$store.dispatch("deleteCategoryById", this.currentPopupOperationDelete["categoryId"])
                switch (this.currentPopupOperationDelete["typeAction"]) {
                    case "income":
                        this.$store.dispatch("loadIncomeCategoriesFromDB");
                        break;
                    case "expenses":
                        this.$store.dispatch("loadExpensesCategoriesFromDB");
                        break;
                }
                this.$store.commit("togglePopupOperationDelete", { status: false, categoryId: "", typeAction: "", typeBlock: "" })
            }

        },

    },
}
</script>

<style scoped>
</style>
