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
        <p class="data-item">
            {{ refactorAmount }} {{ options["options"]["currencyValue"] }}
        </p>
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
            spaceValue: " ",
        };
    },
    props: {
        id: Number,
        title: String,
        amount: Number,
    },
    mounted() {
        this.loadOptions();
    },
    computed: {
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
        options() {
            if (this.$store.getters.getOptionsList) {
                switch (
                    this.$store.getters.getOptionsList["options"]["spaceValue"]
                ) {
                    case "Нет":
                        this.spaceValue = "";
                        break;
                    case "Пробел":
                        this.spaceValue = " ";
                        break;
                    case "Слэш":
                        this.spaceValue = "/";
                        break;
                }
                return this.$store.getters.getOptionsList;
            } else {
                return {
                    options: {
                        currencyValue: "₽",
                        separatorValue: "",
                        spaceValue: "",
                    },
                };
            }
        },
        refactorAmount() {
            let parts = this.amount.toFixed(2)
                .replaceAll(".", this.options["options"]["separatorValue"])
                .split(".");
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                this.spaceValue
            );
            return parts.join(".");
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
        loadOptions() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOptionsByUserId");
            }
        },
    },
};
</script>

<style scoped></style>
