<template>
    <div class="operation-search">
        <div class="change__block__time-block time-block--oper-an">
            <div class="analytics-input-block">
                <input
                    class="input-calendar"
                    id="timeAnalytics"
                    type="button"
                />
                <input
                    id="timeOperationSearchStart"
                    ref="operSearchTimeStart"
                    type="datetime"
                    class="change__block-input change__block-input--datetime"
                />
                <img
                    :class="['search-error-img', { hiddenOpacity: !timeError }]"
                    :src="errorImg"
                    alt=""
                />
            </div>
            <div class="analytics-input-block">
                <img
                    class="icon-search"
                    :src="searchImg"
                    @click="updateSearch"
                    alt=""
                />
                <input
                    id="timeOperationSearchEnd"
                    ref="operSearchTimeEnd"
                    type="datetime"
                    class="change__block-input change__block-input--datetime"
                />
                <img
                    v-if="timeTwoError"
                    :class="[
                        'search-error-img',
                        { hiddenOpacity: !timeTwoError },
                    ]"
                    :src="errorImg"
                    alt=""
                />
            </div>
        </div>
        <label class="operation-search__label" for="">Поиск: </label>
        <input
            class="operation-search__input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown.enter="$emit('updateSearchText')"
            placeholder="Покормил кота.."
            type="text"
        />
    </div>
</template>

<script>
import moment from "moment";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import searchImg from "../../../../../public/assets/files/images/magnifying-glass.svg";
import errorImg from "../../../../../public/assets/files/images/circle-exclamation.svg";
export default {
    props: {
        modelValue: String,
    },
    data() {
        return {
            searchImg: searchImg,
            errorImg: errorImg,
            rangeStart: "",
            rangeEnd: "",
        };
    },
    computed: {
        timeError() {
            return this.$store.getters.getAllErrors["timeError"];
        },
        timeTwoError() {
            return this.$store.getters.getAllErrors["timeTwoError"];
        },
    },
    methods: {
        updateSearch() {
            this.rangeStart = this.$refs.operSearchTimeStart.value;
            this.rangeEnd = this.$refs.operSearchTimeEnd.value;
            this.$emit("updateSearchTime", {
                rangeStart: this.rangeStart,
                rangeEnd: this.rangeEnd,
            });
        },
    },
    mounted() {
        new AirDatepicker("#timeAnalytics", {
            timepicker: true,
            minutesStep: 5,
            autoClose: true,
            range: true,
            dateFormat: "yyyy-MM-dd",
            onSelect({ date, formattedDate, datepicker }) {
                if (formattedDate[0]) {
                    document.querySelector("#timeOperationSearchStart").value =
                        formattedDate[0];
                } else {
                    document.querySelector("#timeOperationSearchStart").value =
                        "";
                }

                if (formattedDate[1]) {
                    document.querySelector("#timeOperationSearchEnd").value =
                        formattedDate[1];
                } else {
                    document.querySelector("#timeOperationSearchEnd").value =
                        "";
                }
            },
        });
        this.$store.commit("setSearchRangeStart", "1970-01-01 00:00:00");
        this.$store.commit(
            "setSearchRangeEnd",
            moment().format("YYYY-MM-DD HH:mm:ss")
        );
    },
};
</script>

<style></style>
