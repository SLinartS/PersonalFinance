<template>
    <div class="balance-change balance-change--category-change">
        <div class="balance-change__header balance-change__header--center">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">Название</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => title = e.target.value"
                />
                <h2 class="change__block-title">Изображение</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="e => image_url = e.target.value"
                />
                <h2 class="change__block-title">Цвет</h2>
                <select name id class="change__block-input" v-model="color">
                    <ColorSelectOption
                        v-for="select in currentColor"
                        :key="select['id']"
                        :id="select['id']"
                        :title="select['title']"
                        :value="select['value']"
                    ></ColorSelectOption>
                </select>
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupCategoryChange"
                >Отмена</button>
                <button
                    type="button"
                    @click="addCategoryItem"
                    class="button button--save balance-change__button"
                    href
                >Добавить</button>
            </div>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import ColorSelectOption from "./ColorSelectOption.vue";
export default {
    name: "PopupCategoryChange",
    components: { ColorSelectOption },
    data() {
        return {
            title: "",
            image_url: "",
            color: "",
        };
    },
    computed: {
        currentColor() {
            return this.$store.getters.getColorsList
        },
        currentPopupCategoryChange() {
            return this.$store.getters.popupCategoryChange
        },
    },
    methods: {
        togglePopupCategoryChange() {
            this.$store.commit("togglePopupCategoryChange", { status: false, typeAction: "", typeBlock: "" })
            // this.$store.commit("setChangedDataCategory", []);
        },
        addCategoryItem() {
            this.$store.dispatch("insertCategoryById", {
                title: this.title,
                type: this.currentPopupCategoryChange["typeBlock"],
                img_url: this.image_url,
                color_id: this.color,
            });
            switch(this.currentPopupCategoryChange["typeBlock"]) {
                case "income":
                    this.$store.dispatch("loadIncomeCategoriesFromDB");
                    break;
                case "expenses":
                    this.$store.dispatch("loadExpensesCategoriesFromDB");
                    break;
            }


            this.$store.commit("togglePopupCategoryChange", { status: false, typeAction: "", typeBlock: "" })
        }
    }

}
</script>

<style scoped>
</style>
