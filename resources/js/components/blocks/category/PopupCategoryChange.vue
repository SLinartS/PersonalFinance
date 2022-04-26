<template>
    <div class="balance-change balance-change--category-change">
        <div class="balance-change__header balance-change__header--center">
            <h2 class="balance-change__header__title"></h2>
        </div>
        <form>
            <div class="change__block">
                <h2 class="change__block-title">
                    {{ currentData }}Название
                </h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (title = e.target.value)"
                    :value="title"
                />
                <p class="error-p">{{ titleError }}</p>
                <h2 class="change__block-title">Изображение</h2>
                <input
                    type="text"
                    class="change__block-input"
                    @input="(e) => (img_url = e.target.value)"
                    :value="img_url"
                />
                <p class="error-p">{{ imgError }}</p>
                <h2 class="change__block-title">Цвет</h2>
                <div v-if="currentColor.length > 0">
                    <select
                        :style="{
                            backgroundColor: currentColor[color - 1]['value'],
                        }"
                        class="change__block-input"
                        v-model="color"
                    >
                        <ColorSelectOption
                            v-for="select in currentColor"
                            :key="select['id']"
                            :id="select['id']"
                            :title="select['title']"
                            :value="select['value']"
                        ></ColorSelectOption>
                    </select>
                </div>
                <div v-else>
                    <select class="change__block-input"></select>
                </div>
            </div>
            <div class="balance-change__button-section">
                <button
                    type="button"
                    class="button button--cancel balance-change__button"
                    @click="togglePopupCategoryChange"
                >
                    Отмена
                </button>
                <button
                    v-if="currentPopupCategoryChange['typeAction'] === 'add'"
                    type="button"
                    @click="addCategoryItem"
                    class="button button--save balance-change__button"
                >
                    Добавить
                </button>
                <button
                    v-else
                    type="button"
                    @click="changeCategoryItem"
                    class="button button--save balance-change__button"
                >
                    Изменить
                </button>
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
            id: "",
            title: "",
            img_url: "",
            color: 1,
            type: "",
            computedWork: true,
        };
    },
    computed: {
        currentColor() {
            return this.$store.getters.getColorsList;
        },
        currentData() {
            if (
                this.computedWork &&
                this.currentPopupCategoryChange["typeAction"] === "change"
            ) {
                const getData = this.$store.getters.getChangedDataCategory;
                this.id = getData["id"];
                this.title = getData["title"];
                this.color = getData["color_id"];
                this.img_url = getData["img_url"];
                if (this.title) {
                    this.computedWork = false;
                }
            }
            return "";
        },
        currentPopupCategoryChange() {
            return this.$store.getters.popupCategoryChange;
        },
        titleError() {
            return this.$store.getters.getAllErrors["titleError"];
        },
        imgError() {
            return this.$store.getters.getAllErrors["imgError"];
        },
    },
    methods: {
        togglePopupCategoryChange() {
            if (this.currentPopupCategoryChange["typeAction"] === "change") {
                this.$store.commit("togglePopupOperationAdd", {
                    status: true,
                });
            }
            this.$store.commit("togglePopupCategoryChange", {
                status: false,
                typeAction: "",
                typeBlock: "",
            });

        },
        addCategoryItem() {
            this.$store.dispatch("insertCategoryById", {
                title: this.title,
                type: this.currentPopupCategoryChange["typeBlock"],
                img_url: this.img_url,
                color_id: this.color,
            });
        },
        changeCategoryItem() {
            this.$store.dispatch("updateCategoryById", {
                id: this.id,
                title: this.title,
                type: this.currentPopupCategoryChange["typeBlock"],
                img_url: this.img_url,
                color_id: this.color,
            });
        },
    },
};
</script>

<style scoped></style>
