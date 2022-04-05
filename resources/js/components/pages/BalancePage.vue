<template>
  <main class="balance-history">
    <div class="data-block">
      <h3 class="data-title">Счета</h3>
      <div class="data-list">
        <div v-if="currentAccounts.length" class="container-for-vue">
          <AccountBlock
            v-for="account in currentAccounts"
            :key="account.id"
            :id="account.id"
            :title="account.title"
            :amount="account.amount"
          ></AccountBlock>
        </div>
        <div class="data-stroke--empty" v-else>
          <p class="data-item--empty">Счетов нет. <a>Добавить</a></p>
        </div>
      </div>
    </div>
    <div class="data-block">
      <h3 class="data-title">Долги</h3>
      <div class="data-list">
        <div v-if="currentDebts.length" class="container-for-vue">
          <DebtBlock
            v-for="debt in currentDebts"
            :key="debt.id"
            :id="debt.id"
            :title="debt.title"
            :amount="debt.amount"
          ></DebtBlock>
        </div>
        <div class="data-stroke--empty" v-else>
          <p class="data-item--empty">Долгов нет. <a>Добавить</a></p>
        </div>
      </div>
    </div>
    <div class="data-block">
      <h3 class="data-title">Накопления</h3>
      <div class="data-list">
        <div v-if="currentSavings.length" class="container-for-vue">
          <SavingBlock
            v-for="saving in currentSavings"
            :key="saving.id"
            :id="saving.id"
            :title="saving.title"
            :amount="saving.amount"
          ></SavingBlock>
        </div>
        <div class="data-stroke--empty" v-else>
          <p class="data-item--empty">Накоплений нет. <a>Добавить</a></p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AccountBlock from "../blocks/balance/AccountBlock";
import DebtBlock from "../blocks/balance/DebtBlock";
import SavingBlock from "../blocks/balance/SavingBlock";

export default {
  name: "BalancePage",
  components: { AccountBlock, DebtBlock, SavingBlock },
  data() {
    return {};
  },
  mounted() {
    this.loadDateFromDB();
  },
  methods: {
    loadDateFromDB() {
      this.$store.dispatch("loadAccountsFromDB");
      this.$store.dispatch("loadDebtsFromDB");
      this.$store.dispatch("loadSavingFromDB");
    },
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
    },
  },
};
</script>

<style scoped>
</style>
