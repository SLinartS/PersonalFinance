<template>
    <div class="balance-change">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Название</h2>
                <input type="text" class="change__block-input" @input="e => title = e.target.value"
                    :value="currentData['title']" />
                <h2 class="change__block-title">Сумма</h2>
                <input type="text" class="change__block-input" @input="e => amount = e.target.value"
                    :value="currentData['amount']" />
            </div>
            <div v-if="currentPopupBalanceChange['typeAction'] === 'change'" class="balance-change__button-section">
                <button type="button" class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceChange">Отмена</button>
                <button type="button" @click="updateAccountItem" class="button button--save balance-change__button"
                    href>Сохранить</button>
            </div>
            <div v-else class="balance-change__button-section">
                <button type="button" class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceChange">Отмена</button>
                <button type="button" @click="addAccountItem" class="button button--save balance-change__button"
                    href>Добавить</button>
            </div>
        </form>   </div>
</template>

<script>
export default {
    name: "PopupBalanceChange",
    data() {
        return {
            title: "",
            amount: "",
            type: ""
        }
    },
    computed: {
        currentData() {
            const getData = this.$store.getters.getChangedAccountData
            this.title = getData["title"]
            this.amount = getData["amount"]
            this.type = getData["type"]
            return getData;
        },
        currentPopupBalanceChange() {
            return this.$store.getters.popupBalanceChange
        }
    },
    methods: {
        togglePopupBalanceChange() {
            this.$store.commit("togglePopupBalanceChange", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        },
        updateAccountItem() {
            this.$store.dispatch("updateAccountById", {
                id: this.currentData["id"],
                title: this.title,
                amount: this.amount,
                type: this.type
            });
            this.$store.dispatch("loadAccountsData")
            this.$store.commit("togglePopupBalanceChange", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        },
        addAccountItem() {
            this.$store.dispatch("insertAccountByType", {
                title: this.title,
                amount: this.amount,
                type: this.currentPopupBalanceChange['typeBlock']

            })
            this.$store.dispatch("loadAccountsData")
            this.$store.commit("togglePopupBalanceChange", { status: false, typeAction: "", typeBlock: "" })
            this.$store.commit("setChangedAccountData", [])
        }
    },
}
</script>

<style scoped></style>
