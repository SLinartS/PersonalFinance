<template>
    <div class="balance-change balance-change--operation">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Время</h2>
                <input
                    id="timeOperationChange"
                    type="datetime"
                    ref="operChgTime"
                    class="change__block-input change__block-input--datetime"
                    @input="(e) => (time = e.target.value)"
                    :value="currentTime"
                />
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (description = e.target.value)"
                    :value="currentData['description']"
                />
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (amount = e.target.value)"
                    :value="currentData['amount']"
                />
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupOperationChange"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    @click="updateOperationItem"
                    class="button button--save balance-change__button"
                    href
                >
                    Сохранить
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

export default {
  name: "PopupOperationChange",
  data() {
    return {
      id: "",
      description: "",
      amount: "",
      type: "",
      time: "",
      initialTime: ""
    };
  },
  mounted() {
    new AirDatepicker("#timeOperationChange", {
      timepicker: true,
      minutesStep: 5,
    });
  },
  computed: {
    currentTime() {
        if(this.initialTime) {
            return this.initialTime.substring(0, 16);
        }
    },
    currentData() {
      const getData = this.$store.getters.getChangedDataOperation;
      this.description = getData["description"];
      this.amount = getData["amount"];
      this.type = getData["type"];
      this.id = getData["id"];
      this.initialTime = getData["time"];
      return getData;
    },

  },
  methods: {
    togglePopupOperationChange() {
      this.$store.commit("togglePopupOperationChange", { status: false });
      this.$store.commit("setChangedDataOperation", []);
    },
    updateOperationItem() {

      this.$store.dispatch("updateOperationById", {
        id: this.currentData["id"],
        description: this.description,
        amount: this.amount,
        time: moment(this.$refs.operChgTime.value, "DD.MM.YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss"),
      });
      this.$store.dispatch("loadOperationByUserId");
      this.$store.commit("togglePopupOperationChange", { status: false });
      this.$store.commit("setChangedDataOperation", []);
    },
  },
};
</script>

<style scoped></style>
