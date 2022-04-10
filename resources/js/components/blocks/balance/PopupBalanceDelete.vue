<template>
    <div class="balance-change balance-change--delete">
        <div class="balance-change__header"></div>
        <form>
            <div v-if="currentPopupBalanceDelete['typeAction'] === 'delete'" class="change__block">
                <h2 class="change__block-title">Удалить {{ currentType }} "{{ currentData["title"] }}" и все
                    связанные операции?</h2>
            </div>
            <div v-else class="change__block">
                <h2 class="change__block-title">Очистить все {{ currentType }} и все связанные операции?</h2>
            </div>
            <div v-if="currentPopupBalanceDelete['typeAction'] === 'delete'" class="balance-change__button-section">
                <button type="button" class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceDelete">Отмена</button>
                <button type="button" @click="deleteAccountItem"
                    class="button button--save balance-change__button">Удалить</button>
            </div>
            <div v-else class="balance-change__button-section">
                <button type="button" class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceDelete">Отмена</button>
                <button type="button" @click="clearAccountItem"
                    class="button button--save balance-change__button">Удалить</button>
            </div>
        </form>   </div>
</template>

<script>
export default {
    name: "PopupBalanceDelete",
    data() {
        return {
            id: "",
            typeAction: "",
        }
    },
    computed: {
        currentData() {
            this.id = this.$store.getters.getChangedAccountData["id"]
            return this.$store.getters.getChangedAccountData;
        },
        currentPopupBalanceDelete() {
            const getData = this.$store.getters.popupBalanceDelete
            this.typeAction = getData["typeAction"]
            return getData;
        },
        currentType() {
            switch (this.currentPopupBalanceDelete["typeBlock"]) {
                case "account":
                    if (this.currentPopupBalanceDelete["typeAction"] === 'delete') {
                        return "счёт"
                    }
                    return "счета"

                case "debt":
                    if (this.currentPopupBalanceDelete["typeAction"] === 'delete') {
                        return "долг"
                    } else {
                        return "долги"
                    }
                case "saving":
                    if (this.currentPopupBalanceDelete["typeAction"] === 'delete') {
                        return "накопление"
                    } else {
                        return "накопления"
                    }
                default:
                    return ""

            }
        },
    },
    methods: {
        togglePopupBalanceDelete() {
            this.$store.commit("togglePopupBalanceDelete", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        },
        deleteAccountItem() {
            this.$store.dispatch("deleteAccountById", this.id)
            this.$store.dispatch("loadAccountsData")
            this.$store.commit("togglePopupBalanceDelete", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        },
        clearAccountItem() {
            this.$store.dispatch("clearAccountsByUserId", this.currentPopupBalanceDelete["typeBlock"])
            this.$store.dispatch("loadAccountsData")
            this.$store.commit("togglePopupBalanceDelete", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        },



    },
}
</script>

<style scoped></style>
