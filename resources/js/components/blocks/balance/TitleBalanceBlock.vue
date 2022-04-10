<template>
    <div class="data-title">
        <img :src="clearImg" @click="togglePopupBalanceDelete" class="data-title__button">
        <img :src="plusImg" @click="togglePopupBalanceChange" class="data-title__button">
        <h3 class="data-title__text">{{ title }}</h3>   </div>
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
        togglePopupBalanceDelete() {
            this.$store.commit("togglePopupBalanceDelete", { status: true, typeAction: "clear", typeBlock: this.type })
        },
        togglePopupBalanceChange() {
            this.$store.commit("togglePopupBalanceChange", { status: true, typeAction: "add", typeBlock: this.type })
        }
    }
}
</script>

<style></style>
