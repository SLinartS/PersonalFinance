<template>
    <div class="operation-search">
        <input
            id="timeOperationSearch"
            ref="operAddTime"
            type="datetime"
            class="change__block-input change__block-input--operation-search"
            :value="currentTime"
        />
        <label class="operation-search__label" for="">Поиск: </label>
        <input
            class="operation-search__input"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keydown.enter="$emit('goSearch')"
            placeholder="Покормил кота.."
            type="text"
        />
    </div>
</template>

<script>
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
export default {
    props: {
        modelValue: String,
    },
    mounted() {
        new AirDatepicker("#timeOperationSearch", {
            timepicker: true,
            minutesStep: 5,
            range: true,
        });
    },
};
</script>

<style></style>
