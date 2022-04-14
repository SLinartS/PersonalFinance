<template>
    <div class="balance-change">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">{{ currentData }} Название</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (title = e.target.value)"
                    :value="title"
                />
                <p class="error-p">{{ titleError }}</p>
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (amount = e.target.value)"
                    :value="amount"
                />
                <p class="error-p">{{ amountError }}</p>
            </div>
            <div
                v-if="currentPopupBalanceChange['typeAction'] === 'change'"
                class="balance-change__button-section"
            >
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceChange"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    @click="updateAccountItem"
                    class="button button--save balance-change__button"
                    href
                >
                    Сохранить
                </button>
            </div>
            <div v-else class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupBalanceChange"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    @click="addAccountItem"
                    class="button button--save balance-change__button"
                    href
                >
                    Добавить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PopupBalanceChange",
    data() {
        return {
            id: "",
            title: "",
            amount: " ",
            type: "",
            computedWork: true,
        };
    },
    mounted() {},
    computed: {
        currentData() {
            if (this.computedWork && this.currentPopupBalanceChange["typeAction"] === "change") {
                console.log("!!!")
                const getData = this.$store.getters.getChangedAccountData;
                this.type = getData["type"];
                this.title = getData["title"];
                this.amount = getData["amount"];
                this.id = getData["id"];
                if (this.title) {
                    this.computedWork = false;
                }
                return "";
            }
        },
        currentPopupBalanceChange() {
            return this.$store.getters.popupBalanceChange;
        },
        titleError() {
            return this.$store.getters.getAllErrors["titleError"];
        },
        amountError() {
            return this.$store.getters.getAllErrors["amountError"];
        },
    },
    methods: {
        togglePopupBalanceChange() {
            this.$store.commit("togglePopupBalanceChange", {
                status: false,
                typeAction: "",
                typeBlock: "",
            });
            this.$store.commit("setChangedAccountData", []);
            this.$store.commit("clearAllErrors")
        },
        updateAccountItem() {
            console.log(this.title);
            this.$store.dispatch("updateAccountById", {
                id: this.id,
                title: this.title,
                amount: this.amount,
                type: this.type,
            });
        },
        addAccountItem() {
            this.$store.dispatch("insertAccountByType", {
                title: this.title,
                amount: this.amount,
                type: this.currentPopupBalanceChange["typeBlock"],
            });
        },
    },
};
</script>

<style scoped></style>
