<template>
    <div class="categories__item">
        <h4 class="categories__item__title">{{ title }}</h4>
        <div
            @click="togglePopupOperationAdd"
            class="categories__item__background bgcolor-1"
            :style="{ backgroundColor: color }"
        >
            <img
                class="categories__item__image"
                :src="currentImgUrl"
                alt="icon-item"
            />
        </div>
        <p v-if="currentSumOperation" class="categories__item__price color-1">
            {{ currentSumOperation }} {{ options["options"]["currencyValue"] }}
        </p>
        <p v-else class="categories__item__price color-1">0 {{ options["options"]["currencyValue"] }}</p>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {};
    },
    name: "categoryItem",
    props: {
        id: Number,
        type: String,
        title: String,
        imgUrl: String,
        color: String,
    },
    computed: {
        currentImgUrl() {
            return "../" + this.imgUrl;
        },
        currentSumOperation() {
            return this.$store.getters.getSumOperation[this.title];
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
                        currencyValue: "₽",
                        separatorValue: "",
                        spaceValue: "",
                    },
                };
            }
        },
    },
    mounted() {
        this.loadOptions();
    },
    methods: {
        togglePopupOperationAdd() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadCategoryById", this.id);
                this.$store.commit(
                    "setSearchRangeStart",
                    "1970-01-01 00:00:00"
                );
                this.$store.commit(
                    "setSearchRangeEnd",
                    moment().format("YYYY-MM-DD HH:mm:ss")
                );
                this.$store.dispatch("loadOperationByUserId");
                this.$store.commit("togglePopupOperationAdd", { status: true });
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
