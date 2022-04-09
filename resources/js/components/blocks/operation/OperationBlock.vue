<template>
    <div class="data-stroke data-stroke--history">
        <div class="data-stroke__button-block data-stroke__button-block--history">
            <img :src="deleteImg" class="data-title__button" @click="togglePopupOperationDelete" />
            <img :src="changeImg" class="data-title__button" @click="togglePopupOperationChange" />
            <p class="data-item">{{ description }}</p>
        </div>
        <p :class="[operationClass, 'data-item']">{{ operationMark }} {{ amount }} ₽</p>
        <p class="data-item date-item--time">{{ formattedTime }}</p>
    </div>
</template>

<script>
import changeImg from "../../../../../public/assets/files/images/arrows-rotate-solid.svg"
import deleteImg from "../../../../../public/assets/files/images/trash-can-solid.svg"

export default {
    data() {
        return {
            operationClass: "expenses",
            operationMark: "+",
            changeImg: changeImg,
            deleteImg: deleteImg
        }
    },
    name: "OperationBlock",
    props: {
        id: Number,
        description: String,
        amount: String,
        type: String,
        datetime: String,
    },
    mounted() {
        if (this.type === "income") {
            this.operationMark = "+"
            this.operationClass = "income"
        } else {
            this.operationMark = "-"
            this.operationClass = "expenses"
        }
    },
    methods: {
        togglePopupOperationChange() {
            this.$store.dispatch("loadOperationDataById", this.id)
            this.$store.commit("togglePopupOperationChange", { status: true })
        },
        togglePopupOperationDelete() {
            this.$store.dispatch("loadOperationDataById", this.id)
            this.$store.commit("togglePopupOperationDelete", { status: true })

        }
    },
    computed: {
        formattedTime() {
            let date = new Date(this.datetime)
            let options = {
                hour: "2-digit",
                minute: "2-digit",
            }
            return date.toLocaleString("ru", options)
        }
    }
}
</script>

<style scoped>
</style>
