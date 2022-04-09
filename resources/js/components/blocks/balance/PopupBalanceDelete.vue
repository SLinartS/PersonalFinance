<template>
    <div class="balance-change balance-change--delete">
        <div class="balance-change__header"></div>
        <form>
            <div class="change__block">
                <h2
                    class="change__block-title"
                >Удалить {{ currentType }} "{{ currentData['title'] }}"?</h2>
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceDelete"
                >Отмена</button>
                <button
                    type="button"
                    @click="deleteBalanceItem"
                    class="button button--save balance-change__button"
                >Удалить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PopupBalanceDelete",
    data() {
        return {
            type: "",
            id: ""
        }
    },
    computed: {
        currentData() {
            const getData = this.$store.getters.getChangedDataBalance
            this.type = getData["type"]
            this.id = getData["id"]
            return getData;
        },
        currentType() {
            switch (this.type) {
                case "account":
                    return "счёт"
                case "debt":
                    return "долг"
                case "saving":
                    return "накопление"
                default:
                    return ""

            }
        },
        currentPopupBalanceDelete() {
            return this.$store.getters.popupBalanceDelete
        },
    },
    methods: {
        togglePopupBalanceDelete() {
            this.$store.commit("togglePopupBalanceDelete", { status: false, typeBlock: "" })
            this.$store.commit("setChangedDataBalance", [])
        },
        deleteBalanceItem() {
            this.$store.dispatch("deleteBalanceDataById", { id: this.id, type: this.type })
            this.$store.dispatch("loadBalanceData", this.type)
            this.$store.commit("togglePopupBalanceDelete", { status: false, typeBlock: "" })
            this.$store.commit("setChangedDataBalance", [])
        },
    },
}
</script>

<style scoped>
</style>
