<template>
    <div class="balance-change balance-change--operation-add">
        <div class="balance-change__header balance-change__header--3fr">
            <img
                :src="deleteImg"
                class="data-title__button"
                @click="togglePopupCategoryDelete"
            />
            <h2 class="balance-change__header__title">
                {{ currentData["title"] }}
            </h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Время</h2>
                <input
                    id="timeOperationAdd"
                    ref="operAddTime"
                    type="datetime"
                    class="change__block-input change__block-input--datetime"
                    :value="currentTime"
                />
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (description = e.target.value)"
                />
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (amount = e.target.value)"
                />
                <h2 class="change__block-title">Тип счёта</h2>
                <select
                    name
                    id
                    class="change__block-input"
                    v-model="storageType"
                >
                    <CategorySelectOption
                        v-for="select in currentData['accounts']"
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
import CategorySelectOption from "./CategorySelectOption.vue";
export default {
    name: "PopupOperationAdd",
    components: { CategorySelectOption },
    data() {
        return {
            deleteImg: deleteImg,
            description: "",
            amount: "",
            storageType: "",
        };
    },
    mounted() {
        new AirDatepicker("#timeOperationAdd", {
            timepicker: true,
            minutesStep: 5,
        });
    },
    computed: {
        currentData() {
            return this.$store.getters.getChangedDataCategory;
        },
        currentTime() {
            return moment().format("YYYY-MM-DD HH:mm").substring(0,16);
        },
    },
    methods: {
        togglePopupOperationAdd() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("setChangedDataCategory", []);
        },
        togglePopupCategoryDelete() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("togglePopupOperationDelete", {
                status: true,
                categoryId: this.currentData["id"],
                typeAction: this.currentData["type"],
                typeBlock: "category",
            });
        },
        addOperationItem() {
            this.$store.dispatch("insertOperationById", {
                id: this.currentData["id"],
                description: this.description,
                amount: this.amount,
                time: moment(this.$refs.operAddTime.value, "DD.MM.YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss"),
                account_id: this.storageType,
            });
            switch (this.currentData["type"]) {
                case "income":
                    this.$store.dispatch("loadIncomeCategoriesFromDB");
                    break;
                case "expenses":
                    this.$store.dispatch("loadExpensesCategoriesFromDB");
                    break;
            }
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("setChangedDataCategory", []);
        },
    },
};
</script>

<style scoped></style>
