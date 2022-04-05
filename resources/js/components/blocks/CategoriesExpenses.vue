<template>
    <div class="categories__change-section change-section">
        <router-link class="button change-section__button change-section__button--two" to="/categories/income">Поступления</router-link>
    </div>
    <div class="categories__list categories__list--expenses ">
        <div class="container-for-vue">
            <CategoryItem v-for="category in currentCategories"
            :key="category.id"
            :id="category.id"
            :type="category.type"
            :title="category.title"
            :color="category.color"

            ></CategoryItem>
        </div>
        <div class="categories__item categories__item--empty">
            <div class="categories__item__background categories__item__background--empty color-empty">
                <img class="categories__item__image categories__item__image--empty"
                     src="../../../../public/assets/files/images/categories/plus-solid.svg" alt="icon-item">
            </div>
        </div>
    </div>
</template>

<script>
import CategoryItem from "./category/CategoryItem"

export default {
    components: {CategoryItem},
    name: "CategoriesExpenses",
    mounted() {
        this.loadDateFromDB();
    },
    methods: {
        loadDateFromDB() {
            this.$store.dispatch("loadExpensesCategoriesFromDB");
    },
  },
  computed: {
      currentCategories() {
          return this.$store.getters.getCategories
      }
  }
}
</script>

<style scoped>

</style>
