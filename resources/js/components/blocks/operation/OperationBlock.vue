<template>
    <div class="data-stroke data-stroke--history">
        <div
            class="data-stroke__button-block data-stroke__button-block--history"
        >
            <img
                :src="deleteImg"
                class="data-title__button"
                @click="togglePopupOperationDelete"
            />
            <img
                :src="changeImg"
                class="data-title__button"
                @click="togglePopupOperationChange"
            />
            <p class="data-item data-item--decription">
                {{ formattedDescription }}
            </p>
        </div>
        <p :class="[operationClass, 'data-item data-item--amount']">
            {{ operationMark }} {{ amount }}
            {{ options["options"]["currencyValue"] }}
        </p>
        <p class="data-item date-item--title">{{ formattedAccountTitle }}</p>
        <p class="data-item date-item--type">{{ currentType }}</p>
        <p class="data-item date-item--time">{{ formattedTime }}</p>
    </div>
</template>

<script>
import changeImg from "../../../../../public/assets/files/images/arrows-rotate-solid.svg";
import deleteImg from "../../../../../public/assets/files/images/trash-can-solid.svg";
import moment from "moment";
export default {
    data() {
        return {
            operationClass: "expenses",
            operationMark: "+",
            changeImg: changeImg,
            deleteImg: deleteImg,
        };
    },
    name: "OperationBlock",
    props: {
        id: Number,
        description: String,
        amount: String,
        type: String,
        datetime: String,
        accountType: String,
        accountTitle: String,
    },
    mounted() {
        if (this.type === "income") {
            this.operationMark = "+";
            this.operationClass = "income";
        } else {
            this.operationMark = "-";
            this.operationClass = "expenses";
        }
        this.loadOptions();
    },
    methods: {
        togglePopupOperationChange() {
            this.$store.dispatch("loadOperationById", this.id);
            this.$store.commit("togglePopupOperationChange", { status: true });
        },
        togglePopupOperationDelete() {
            this.$store.dispatch("loadOperationById", this.id);
            this.$store.commit("togglePopupOperationDelete", {
                status: true,
                categoryId: "",
                typeAction: "",
                typeBlock: "operation",
            });
        },
        loadOptions() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOptionsByUserId");
            }
        },
    },
    computed: {
        formattedTime() {
            return moment(this.datetime).format("HH:mm");
        },
        currentType() {
            switch (this.accountType) {
                case "account":
                    return "Счёт";
                case "debt":
                    return "Долг";
                case "saving":
                    return "Накоп..";
            }
        },
        formattedAccountTitle() {
            let title = this.accountTitle;
            if (title.length > 10) {
                return title.substring(0, 10) + "..";
            } else {
                return title;
            }
        },
        formattedDescription() {
            let description = this.description;
            if (description.length > 15) {
                return description.substring(0, 15) + "..";
            } else {
                return description;
            }
        },
        AuthStatusStatus() {
            return this.$store.getters.getAuthStatusStatus;
        },
        options() {
            if (this.$store.getters.getOptionsList) {
                return this.$store.getters.getOptionsList;
            } else {
                return {
                    options: {
                        currencyValue: "",
                    },
                };
            }
        },
    },
};
</script>

<style scoped></style>
