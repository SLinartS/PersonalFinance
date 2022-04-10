<template>
    <div class="balance-change balance-change--operation-add">
        <div class="balance-change__header balance-change__header--center">
            <h2 class="balance-change__header__title">{{ currentData["title"] }}</h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => description = e.target.value"
                />
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => amount = e.target.value"
                />
                <h2 class="change__block-title">Тип счёта</h2>
                <select name id class="change__block-input" v-model="storageType">
                    <CategorySelectOption
                        v-for="select in currentData['accounts']"
                        :key="select['id']"
                        :id="select['id']"
                        :title="select['title']"
                        :amount="select['amount']"
                        :type="select['type']"
                    ></CategorySelectOption>
                </select>
                <h2 class="change__block-title">Время</h2>
                <input
                    type="datetime"
                    class="change__block-input change__block-input--datetime"
                    :value="currentTime"
                />
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupOperationAdd"
                >Отмена</button>
                <button
                    type="button"
                    @click="addOperationItem"
                    class="button button--save balance-change__button"
                    href
                >Добавить</button>
            </div>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import CategorySelectOption from "./CategorySelectOption.vue";
export default {
    name: "PopupOperationAdd",
    components: { CategorySelectOption },
    data() {
        return {
            description: "",
            amount: "",
            storageType: "",
        };
    },
    computed: {
        currentData() {
            return this.$store.getters.getChangedDataCategory;
        },
        currentTime() {
            return moment().format("YYYY-MM-DD HH:mm:ss");
        },
    },
    methods: {
        togglePopupOperationAdd() {
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("setChangedDataCategory", []);
        },
        addOperationItem() {
            this.$store.dispatch("insertOperationById", {
                id: this.currentData["id"],
                description: this.description,
                amount: this.amount,
                time: this.currentTime,
                account_id: this.storageType,
            });
            this.$store.commit("togglePopupOperationAdd", { status: false });
            this.$store.commit("setChangedDataCategory", []);
        }
    }

}
</script>

<style scoped>
</style>
