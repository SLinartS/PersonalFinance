<template>
    <div class="categories__item">
            <h4 class="categories__item__title">{{title}}</h4>
            <div class="categories__item__background bgcolor-1" :style="{backgroundColor: color}">
                <img class="categories__item__image" :src="currentImgUrl" alt="icon-item">
            </div>
            <p v-if="currentSumOperation" class="categories__item__price color-1">{{currentSumOperation}} ₽</p>
            <p v-else class="categories__item__price color-1">0 ₽</p>
        </div>
</template>

<script>
// import { computed } from '@vue/runtime-core'
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
        imgUrl: String,
        color: String
    },
    computed: {
        currentImgUrl() {
            return "../" + this.imgUrl
        },
        currentSumOperation() {
            console.log("!!!!!!!!", this.$store.getters.getSumOperation)
            console.log("????????",this.title)
            console.log("........",this.$store.getters.getSumOperation[this.title])
            let operByCat = this.$store.getters.getSumOperation[this.title]
            return operByCat
        }
    }
}
</script>

<style scoped>

</style>
