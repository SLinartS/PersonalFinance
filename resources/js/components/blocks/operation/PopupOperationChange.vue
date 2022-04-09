<template>
    <div class="balance-change balance-change--operation">
        <div class="balance-change__header">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Описание</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => description = e.target.value"
                    :value="currentData['description']"
                />
                <h2 class="change__block-title">Сумма</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => amount = e.target.value"
                    :value="currentData['amount']"
                />
                <h2 class="change__block-title">Время</h2>
                <input
                    type="datetime"
                    class="change__block-input"
                    @input="e => time = e.target.value"
                    :value="currentData['time']"
                />
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupOperationChange"
                >Отмена</button>
                <button
                    type="button"
                    @click="updateOperationItem"
                    class="button button--save balance-change__button"
                    href
                >Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "PopupOperationChange",
    data() {
        return {
            id: "",
            description: "",
            amount: "",
            type: "",
            time: "",
        }
    },
    computed: {
        currentData() {
            const getData = this.$store.getters.getChangedDataOperation
            this.description = getData["description"]
            this.amount = getData["amount"]
            this.type = getData["type"]
            this.id = getData["id"]
            this.time = getData["time"]
            return getData;
        },
        currentPopupOperationChange() {
            return this.$store.getters.popupOperationChange
        }
    },
    methods: {
        togglePopupOperationChange() {
            this.$store.commit("togglePopupOperationChange", { status: false })
            this.$store.commit("setChangedDataOperation", [])
        },
        updateOperationItem() {
            this.$store.dispatch("updateOperationDataById", {
                id: this.currentData["id"],
                description: this.description,
                amount: this.amount,
                time: this.time,
            });
            this.$store.dispatch("loadOperationByUserId")
            this.$store.commit("togglePopupOperationChange", { status: false })
            this.$store.commit("setChangedDataOperation", [])
        },
    },
}
</script>

<style scoped>
</style>
