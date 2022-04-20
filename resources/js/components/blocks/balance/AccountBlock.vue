<template>
    <div class="data-stroke">
        <div class="data-stroke__button-block">
            <img
                :src="deleteImg"
                class="data-title__button"
                @click="togglePopupBalanceDelete"
            />
            <img
                :src="changeImg"
                class="data-title__button"
                @click="togglePopupBalanceChange"
            />
            <p class="data-item data-item--decription">{{ title }}</p>
        </div>
        <p class="data-item">{{ amount }} ₽</p>
    </div>
</template>

<script>
import changeImg from "../../../../../public/assets/files/images/arrows-rotate-solid.svg";
import deleteImg from "../../../../../public/assets/files/images/trash-can-solid.svg";

export default {
    name: "AccountBlock",
    data() {
        return {
            changeImg: changeImg,
            deleteImg: deleteImg,
        };
    },
    props: {
        id: Number,
        title: String,
        amount: String,
    },
    computed: {
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
    },
    methods: {
        togglePopupBalanceChange() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadAccountById", this.id);
                this.$store.commit("togglePopupBalanceChange", {
                    status: true,
                    typeAction: "change",
                    typeBlock: "account",
                });
            }
        },
        togglePopupBalanceDelete() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadAccountById", this.id);
                this.$store.commit("togglePopupBalanceDelete", {
                    status: true,
                    typeAction: "delete",
                    typeBlock: "account",
                });
            }
        },
    },
};
</script>

<style scoped></style>
