<template>
    <div class="data-title">
        <img :src="clearImg" @click="clearBlockItems" class="data-title__button">
        <img :src="plusImg" @click="addBlockItems" class="data-title__button">
        <h3 class="data-title__text">{{ title }}</h3>
    </div>
</template>

<script>
import plusImg from "../../../../../public/assets/files/images/categories/plus-solid.svg"
import clearImg from "../../../../../public/assets/files/images/eraser-solid.svg"

export default {
    data() {
        return {
            plusImg: plusImg,
            clearImg: clearImg
        }
    },
    props: {
        title: String,
        type: String,
    },
    methods: {
        clearBlockItems() {
            this.$store.dispatch("clearBalanceDataByUserId", this.type)
            this.$store.dispatch("loadBalanceData", this.type)
        },
        addBlockItems() {
            this.$store.commit("togglePopupBalanceChange", {status: true, typeAction: "add", typeBlock: this.type})
        }
    }
}
</script>

<style>
</style>
