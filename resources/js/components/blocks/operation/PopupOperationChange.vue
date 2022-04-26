<template>
    <div class="balance-change balance-change--operation">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">{{ currentData }}Время</h2>
                <div class="change__block__time-block">
                    <input
                        type="datetime"
                        id="inputOperChange"
                        ref="operChgTime"
                        class="change__block-input change__block-input--datetime"
                        :value="time"
                    />
                    <input class="input-calendar" id="timeOperationChange" type="button" />
                </div>
                <p class="error-p">{{ timeError }}</p>
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (description = e.target.value)"
                    :value="description"
                />
                <p class="error-p">{{ descriptionError }}</p>
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (amount = e.target.value)"
                    :value="amount"
                    placeholder="0.00"
                />
                <p class="error-p">{{ amountError }}</p>
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
            computedWork: true,
        };
    },
    mounted() {
        new AirDatepicker("#timeOperationChange", {
            timepicker: true,
            minutesStep: 5,
            autoClose: true,
            dateFormat: "yyyy-MM-dd",
            onSelect({ date, formattedDate, datepicker }) {
                document.querySelector("#inputOperChange").value = formattedDate;
            },
        });
    },
    computed: {
        currentData() {
            if (this.computedWork) {
                const getData = this.$store.getters.getChangedDataOperation;
                this.description = getData["description"];
                this.amount = getData["amount"];
                this.type = getData["type"];
                this.id = getData["id"];
                this.time = getData["time"]
                if(this.time) {
                    this.time = this.time.substring(0, 16)
                }
                if (this.description) {
                    this.computedWork = false;
                }
                return "";
            }
        },
        timeError() {
            return this.$store.getters.getAllErrors["timeError"];
        },
        descriptionError() {
            return this.$store.getters.getAllErrors["descriptionError"];
        },
        amountError() {
            return this.$store.getters.getAllErrors["amountError"];
        },
    },
    methods: {
        togglePopupOperationChange() {
            this.$store.commit("togglePopupOperationChange", { status: false });
            this.$store.commit("setChangedDataOperation", []);
            this.$store.commit("clearAllErrors");
        },
        updateOperationItem() {
            this.time = this.$refs.operChgTime.value
            this.$store.dispatch("updateOperationById", {
                id: this.id,
                description: this.description,
                amount: this.amount,
                time: this.$refs.operChgTime.value + ":00",
            });
        },
    },
};
</script>

<style scoped></style>
