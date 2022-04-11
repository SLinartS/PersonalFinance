<template>
  <main class="categories">
      <CurrentBalance></CurrentBalance>
    <router-view></router-view>
  </main>
</template>

<script>
import CurrentBalance from "../blocks/category/CurrentBalance.vue";
export default {
    name: "CategoriesPage",
    data() {
        return {};
    },
    components: { CurrentBalance }
};
</script>

<style scoped>
</style>
