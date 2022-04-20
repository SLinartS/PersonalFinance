<template>
    <div class="categories__change-section change-section">
        <router-link
            class="button change-section__button change-section__button--one"
            to="/categories/income"
            >Расходы
        </router-link>
    </div>

    <div class="categories__list categories__list--expenses">
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
        <CategoryItemEmpty type="expenses"></CategoryItemEmpty>
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
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadExpensesCategoriesFromDB");
            }
        },
    },
    computed: {
        currentCategories() {
            return this.$store.getters.getCategories;
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
    },
};
</script>

<style scoped></style>
