<template>
    <div class="categories__item">
            <h4 class="categories__item__title">{{title}}</h4>
            <div class="categories__item__background bgcolor-1" :style="{backgroundColor: color}">
                <img class="categories__item__image" src="../../../../../public/assets/files/images/categories/bus.svg" alt="icon-item">
            </div>
            <p class="categories__item__price color-1">75,26 ₽</p>
        </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    data() {
        return {

        }
    },
    name: "categoryItem",
    props: {
        id: Number,
        type: String,
        title: String,
        color: String
    },
}
</script>

<style scoped>

</style>
