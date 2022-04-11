<template>
  <main class="balance-history">
    <div class="data-block">
      <TitleBalanceBlock title="Счета" type="account"></TitleBalanceBlock>
      <div class="data-list">
        <div v-if="currentAccounts['account'].length" class="container-for-vue">
          <AccountBlock
            v-for="account in currentAccounts['account']"
            :key="account.id"
            :id="account.id"
            :title="account.title"
            :amount="account.amount"
          ></AccountBlock>
        </div>
        <div class="data-stroke data-stroke--empty" v-else>
          <div class="data-stroke__button-block">
            <p class="data-item data-item--empty">
              Счетов нет.
              <a>Добавить</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="data-block">
      <TitleBalanceBlock title="Долги" type="debt"></TitleBalanceBlock>
      <div class="data-list">
        <div v-if="currentAccounts['debt'].length" class="container-for-vue">
          <AccountBlock
            v-for="debt in currentAccounts['debt']"
            :key="debt.id"
            :id="debt.id"
            :title="debt.title"
            :amount="debt.amount"
          ></AccountBlock>
        </div>
        <div class="data-stroke data-stroke--empty" v-else>
          <div class="data-stroke__button-block">
            <p class="data-item data-item--empty">
              Долгов нет.
              <a>Добавить</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="data-block">
      <TitleBalanceBlock title="Накопления" type="saving"></TitleBalanceBlock>
      <div class="data-list">
        <div v-if="currentAccounts['saving'].length" class="container-for-vue">
          <AccountBlock
            v-for="saving in currentAccounts['saving']"
            :key="saving.id"
            :id="saving.id"
            :title="saving.title"
            :amount="saving.amount"
          ></AccountBlock>
        </div>
        <div class="data-stroke data-stroke--empty" v-else>
          <div class="data-stroke__button-block">
            <p class="data-item data-item--empty">
              Накоплений нет.
              <a>Добавить</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AccountBlock from "../blocks/balance/AccountBlock";
import TitleBalanceBlock from "../blocks/balance/TitleBalanceBlock.vue";

export default {
  name: "BalancePage",
  components: { AccountBlock, TitleBalanceBlock },
  data() {
    return {};
  },
  mounted() {
    this.loadDateFromDB();
  },
  methods: {
    loadDateFromDB() {
      this.$store.dispatch("loadAccountsData");
    },
  },
  computed: {
    currentAccounts() {
      let accounts = this.$store.getters.currentAccounts;
      if (accounts["account"] && accounts["debt"] && accounts["saving"]) {
        return this.$store.getters.currentAccounts;
      } else {
        return { account: [], debt: [], saving: [] };
      }
    },
  },
};
</script>

<style scoped>
</style>
