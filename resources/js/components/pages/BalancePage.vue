<template>
    <main class="balance-history">
        <div class="data-block">
            <h3 class="data-title">Счета</h3>
            <div class="data-list">
                <Account v-if="currentAccounts.length" v-for="account in currentAccounts"
                         :key="account.id"
                         :id="account.id"
                         :title="account.title"
                         :amount="account.amount"
                ></Account>
                <div class="data-stroke--empty" v-else>
                    <p class="data-item--empty">Счетов нет. <a>Добавить</a></p>
                </div>
            </div>
        </div>
        <div class="data-block">
            <h3 class="data-title">Долги</h3>
            <div class="data-list">
                <Debt v-if="currentDebts.length" v-for="debt in currentDebts"
                      :key="debt.id"
                      :id="debt.id"
                      :title="debt.title"
                      :amount="debt.amount"
                ></Debt>
                <div class="data-stroke--empty" v-else>
                    <p class="data-item--empty">Долгов нет. <a>Добавить</a></p>
                </div>
            </div>
        </div>
        <div class="data-block">
            <h3 class="data-title">Накопления</h3>
            <div class="data-list">
                <Saving v-if="currentSavings.length" v-for="saving in currentSavings"
                        :key="saving.id"
                        :id="saving.id"
                        :title="saving.title"
                        :amount="saving.amount"
                ></Saving>
                <div class="data-stroke--empty" v-else>
                    <p class="data-item--empty">Накоплений нет. <a>Добавить</a></p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Account from "../blocks/balance-blocks/Account";
import Debt from "../blocks/balance-blocks/Debt";
import Saving from "../blocks/balance-blocks/Saving";

export default {
    name: "BalancePage",
    components: {Account, Debt, Saving},
    data() {
        return {}
    }, mounted() {
        this.loadDateFromDB()
    },
    methods: {
        async loadDateFromDB() {
            this.$store.commit("loadAccountsFromDB")
            this.$store.commit("loadDebtsFromDB")
            this.$store.commit("loadSavingFromDB")
        }
    },
    computed: {
        currentAccounts() {
            return this.$store.getters.currentAccounts;
        },
        currentDebts() {
            return this.$store.getters.currentDebts;
        },
        currentSavings() {
            return this.$store.getters.currentSavings;
        }
    }

}
</script>

<style scoped>

</style>
