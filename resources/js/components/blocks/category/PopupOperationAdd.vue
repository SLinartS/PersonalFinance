<template>
    <div class="balance-change balance-change--operation-add">
        <div class="balance-change__header balance-change__header--3fr">
            <img
                :src="deleteImg"
                class="data-title__button"
                @click="togglePopupCategoryDelete"
            />
            <h2 class="balance-change__header__title">
                {{ currentData }}{{ currentTime }}{{ title }}
            </h2>
            <img
                :src="changeImg"
                class="data-title__button data-title__button--two"
                @click="togglePopupCategoryChange"
            />
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Время</h2>
                <div class="change__block__time-block">
                    <input
                        id="inputOperAdd"
                        ref="operAddTime"
                        type="datetime"
                        class="change__block-input change__block-input--datetime"
                        :value="time"
                    />
                    <input
                        class="input-calendar"
                        id="timeOperationAdd"
                        type="button"
                    />
                </div>

                <p class="error-p">{{ timeError }}</p>
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (description = e.target.value)"
                />
                <p class="error-p">{{ descriptionError }}</p>
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (amount = e.target.value)"
                    placeholder="0.00"
                />
                <p class="error-p">{{ amountError }}</p>
                <h2 class="change__block-title">Тип счёта</h2>
                <select class="change__block-input" v-model="storageType">
                    <CategorySelectOption
                        v-for="select in accounts"
                        :key="select['id']"
                        :id="select['id']"
                        :title="select['title']"
                        :amount="select['amount']"
                        :type="select['type']"
                    >
                    </CategorySelectOption>
                </select>
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupOperationAdd"
                >
                    Отмена
                </button>
                <button
                    type="button"
                    @click="addOperationItem"
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
import moment from "moment";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import deleteImg from "../../../../../public/assets/files/images/trash-can-solid.svg";
import changeImg from "../../../../../public/assets/files/images/arrows-rotate-solid.svg";
import CategorySelectOption from "./CategorySelectOption.vue";
export default {
    name: "PopupOperationAdd",
    components: { CategorySelectOption },
    data() {
        return {
            deleteImg: deleteImg,
            changeImg: changeImg,
            description: "",
            amount: "",
            title: "",
            id: "",
            type: "",
            time: "",
            storageType: 1,
            computedWork: true,
            accounts: [],
        };
    },
    mounted() {
        new AirDatepicker("#timeOperationAdd", {
            timepicker: true,
            minutesStep: 5,
            autoClose: true,
            dateFormat: "yyyy-MM-dd",
            onSelect({ date, formattedDate, datepicker }) {
                document.querySelector("#inputOperAdd").value = formattedDate;
            },
        });
    },
    computed: {
        currentData() {
            if (this.computedWork) {
                const getData = this.$store.getters.getChangedDataCategory;
                this.id = getData["id"];
                this.type = getData["type"];
                this.title = getData["title"];
                this.accounts = getData["accounts"];
                if (this.title) {
                    this.computedWork = false;
                }
                return "";
            }
        },
        currentTime() {
            if (this.computedWork) {
                if (this.accounts) {
                    this.computedWork = false;
                }
                this.time = moment()
                    .format("YYYY-MM-DD HH:mm")
                    .substring(0, 16);
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
        togglePopupOperationAdd() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("setChangedDataCategory", []);
            this.$store.commit("clearAllErrors");
        },
        togglePopupCategoryDelete() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("togglePopupOperationDelete", {
                status: true,
                categoryId: this.id,
                typeAction: this.type,
                typeBlock: "category",
            });
        },
        togglePopupCategoryChange() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.dispatch("loadCategoryById", this.id);
            this.$store.dispatch("loadColorsList");
            this.$store.commit("togglePopupCategoryChange", {
                status: true,
                typeAction: "change",
                typeBlock: this.type,
            });
        },
        addOperationItem() {
            this.time = this.$refs.operAddTime.value;
            this.$store.dispatch("insertOperationById", {
                id: this.id,
                description: this.description,
                amount: this.amount,
                time: this.$refs.operAddTime.value + ":00",
                account_id: this.storageType,
                typeCategory: this.type,
            });
        },
    },
    watch: {
        storageType() {
            this.time = this.$refs.operAddTime.value;
        },
    },
};
</script>

<style scoped></style>
