<template>
    <div class="setting">
        <div class="setting__header">
            <h2 class="setting__header__title">Настройки</h2>
            <svg
                @click="togglePopupSetting"
                class="icon-close icon-close--auth-reg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
            >
                <path
                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                />
            </svg>
        </div>

        <form
            action=""
            @submit.prevent="submitForm"
            class="setting__account-blocks"
        >
            <div class="setting__account-block">
                <h3 class="setting__account-block__title">Андрей</h3>
                <a class="link link--setting-account">Изменить имя</a>
            </div>
            <div class="setting__account-block">
                <h3 class="setting__account-block__title">1test@gmail.com</h3>
                <a class="link link--setting-account">Изменить почту</a>
                <a class="link link--setting-account">Изменить пароль</a>
            </div>
        </form>
        <div class="setting__setting-blocks">
            <div class="setting__setting-block">
                <h3 class="setting__setting-block__title">Валюта</h3>
                <select
                    class="setting-select"
                    v-if="currentOptionsList"
                    v-model="optionCurrencies"
                >
                    <SettingSelectOption
                        v-for="currency in currentOptionsList['currencies']"
                        :key="currency['id']"
                        :id="currency['id']"
                        :value="currency['value']"
                    ></SettingSelectOption>
                </select>
            </div>
            <div class="setting__setting-block">
                <h3 class="setting__setting-block__title">Разделитель</h3>
                <select
                    class="setting-select"
                    v-if="currentOptionsList"
                    v-model="optionSeparators"
                >
                    <SettingSelectOption
                        v-for="separator in currentOptionsList['separators']"
                        :key="separator['id']"
                        :id="separator['id']"
                        :value="separator['value']"
                    ></SettingSelectOption>
                </select>
            </div>
            <div class="setting__setting-block">
                <h3 class="setting__setting-block__title">
                    Разделитель десятков
                </h3>
                <select
                    class="setting-select"
                    v-if="currentOptionsList"
                    v-model="optionSpaces"
                >
                    <SettingSelectOption
                        v-for="space in currentOptionsList['spaces']"
                        :key="space['id']"
                        :id="space['id']"
                        :value="space['value']"
                    ></SettingSelectOption>
                </select>
            </div>
        </div>
        <div class="setting__button-section">
            <button
                @click="updateOptions"
                type="button"
                class="button setting__button"
            >
                Сохранить
            </button>
        </div>
    </div>
</template>

<script>
import SettingSelectOption from "./SettingSelectOption.vue";
export default {
    name: "PopupSetting",
    data() {
        return {
            optionCurrencies: "",
            optionSeparators: "",
            optionSpaces: "",
        };
    },
    watch: {},
    computed: {
        currentOptionsList() {
            if (this.$store.getters.getOptionsList) {
                this.optionCurrencies =
                    this.$store.getters.getOptionsList["options"][
                        "currency_id"
                    ];
                this.optionSeparators =
                    this.$store.getters.getOptionsList["options"][
                        "separator_id"
                    ];
                this.optionSpaces =
                    this.$store.getters.getOptionsList["options"]["space_id"];
            }
            return this.$store.getters.getOptionsList;
        },
    },
    methods: {
        togglePopupSetting() {
            this.$store.commit("togglePopupSetting", false);
        },
        loadOptions() {
            this.$store.dispatch("loadOptionsByUserId");
        },
        updateOptions() {
            this.$store.dispatch("updateOptionsByUserId", {
                optionCurrencies: this.optionCurrencies,
                optionSeparators: this.optionSeparators,
                optionSpaces: this.optionSpaces,
            });
            this.loadOptions()
        },
    },
    mounted() {
        this.loadOptions();
    },
    components: { SettingSelectOption },
};
</script>

<style scoped></style>
