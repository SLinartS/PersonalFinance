<template>
    <div class="categories__item categories__item--empty">
        <div
            @click="togglePopupCategoryChange"
            class="categories__item__background categories__item__background--empty color-empty"
        >
            <img
                class="categories__item__image categories__item__image--empty"
                :src="addCategoryImg"
                alt="icon-item"
            />
        </div>
    </div>
</template>

<script>
import addCategoryImg from "../../../../../public/assets/files/images/categories/plus-solid.svg";
export default {
    name: "categoryItemEmpty",
    props: {
        type: String,
    },
    data() {
        return {
            addCategoryImg: addCategoryImg,
        };
    },
    computed: {
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
    },
    methods: {
        togglePopupCategoryChange() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadColorsList");
                this.$store.commit("togglePopupCategoryChange", {
                    status: true,
                    typeAction: "add",
                    typeBlock: this.type,
                });
            }
        },
    },
};
</script>

<style scoped></style>
