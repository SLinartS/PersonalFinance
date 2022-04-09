<template>
    <div class="data-stroke">
        <div class="data-stroke__button-block">
            <img :src="deleteImg" class="data-title__button" @click="togglePopupBalanceDelete" />
            <img :src="changeImg" class="data-title__button" @click="togglePopupBalanceChange" />
            <p class="data-item">{{ title }}</p>
        </div>
        <p class="data-item">{{ amount }} ₽</p>
    </div>
</template>

<script>
import changeImg from "../../../../../public/assets/files/images/arrows-rotate-solid.svg"
import deleteImg from "../../../../../public/assets/files/images/trash-can-solid.svg"

export default {
    name: "SavingBlock",
    data() {
        return {
            changeImg: changeImg,
            deleteImg: deleteImg
        }
    },
    props: {
        id: Number,
        title: String,
        amount: String
    },
    methods: {
        togglePopupBalanceChange() {
            this.$store.dispatch("loadBalanceDataById", { id: this.id, type: "saving" })
            this.$store.commit("togglePopupBalanceChange", { status: true, typeAction: "change", typeBlock: "saving" })
        },
        togglePopupBalanceDelete() {
            this.$store.dispatch("loadBalanceDataById", { id: this.id, type: "saving" })
            this.$store.commit("togglePopupBalanceDelete", { status: true, typeBlock: "saving" })

        }
    },
}
</script>

<style scoped>
</style>
