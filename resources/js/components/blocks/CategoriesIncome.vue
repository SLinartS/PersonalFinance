<template>
    <div class="categories__change-section change-section">
        <router-link class="button change-section__button change-section__button--one " to="/categories/expenses">Расходы</router-link>
    </div>

    <div class="categories__list categories__list--income">
        <div class="categories__item">
            <h4 class="categories__item__title">Зарплата</h4>
            <div class="categories__item__background bgcolor-9">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/money-bill-wave.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-9">17 003,26 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Подарок</h4>
            <div class="categories__item__background bgcolor-10">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/sack-dollar.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-10">467,02 ₽</p>
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
export default {
    name: "CategoriesExpenses"
}
</script>

<style scoped>

</style>
