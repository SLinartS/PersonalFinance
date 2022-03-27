<template>
    <div class="categories__change-section change-section">
        <router-link class="button change-section__button change-section__button--two" to="/categories/income">Поступления</router-link>
    </div>
    <div class="categories__list categories__list--expenses ">
        <div class="categories__item">
            <h4 class="categories__item__title">Транспорт</h4>
            <div class="categories__item__background bgcolor-1">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/bus.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-1">75,26 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Продукты</h4>
            <div class="categories__item__background bgcolor-2">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/cart.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-2">467,02 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Подарки</h4>
            <div class="categories__item__background bgcolor-3">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/gift.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-3">2000,77 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Здоровье</h4>
            <div class="categories__item__background bgcolor-4">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/medkit.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-4">200 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Квартира и...</h4>
            <div class="categories__item__background bgcolor-5">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/home.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-5">5000,86 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Одежда</h4>
            <div class="categories__item__background bgcolor-6">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/shirt.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-6">504,42 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Вредные пр...</h4>
            <div class="categories__item__background bgcolor-7">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/smoking.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-7">461,30 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Животные</h4>
            <div class="categories__item__background bgcolor-8">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/cat.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-8">867,66 ₽</p>
        </div>
        <div class="categories__item">
            <h4 class="categories__item__title">Дети</h4>
            <div class="categories__item__background bgcolor-9">
                <img class="categories__item__image" src="../../../../public/assets/files/images/categories/children.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-9">1005 ₽</p>
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
