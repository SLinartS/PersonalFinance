<template>
    <div class="categories__change-section change-section">
        <router-link
            class="button change-section__button change-section__button--two"
            to="/categories/expenses"
        >
            Поступления</router-link
        >
    </div>
    <div class="categories__list categories__list--income">
        <div class="container-for-vue">
            <CategoryItem
                v-for="category in currentCategories"
                :key="category.id"
                :id="category.id"
                :type="category.type"
                :title="category.title"
                :imgUrl="category['img_url']"
                :color="category.color"
            >
            </CategoryItem>
        </div>
        <CategoryItemEmpty type="income"></CategoryItemEmpty>
    </div>
</template>

<script>
import CategoryItem from "./category/CategoryItem";
import CategoryItemEmpty from "./category/CategoryItemEmpty";

export default {
    components: { CategoryItem, CategoryItemEmpty },
    name: "CategoriesExpenses",
    mounted() {
        this.loadDateFromDB();
    },
    methods: {
        loadDateFromDB() {
            this.$store.dispatch("loadIncomeCategoriesFromDB");
        },
    },
    computed: {
        currentCategories() {
            return this.$store.getters.getCategories;
        },
    },
};
</script>

<style scoped></style>
