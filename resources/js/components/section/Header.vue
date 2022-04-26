<template>
    <header class="header">
        <div class="main-title">
            <img
                class="icon-main"
                src="../../../../public/assets/files/images/icon-svg.svg"
                alt
            />
            <h1 class="main-title__text">
                <router-link to="/">РЭSources</router-link>
            </h1>
        </div>
        <ul class="navigation-list">
            <li class="navigation-item">
                <router-link to="/balance">Баланс</router-link>
            </li>
            <li class="navigation-item">
                <router-link to="/categories/expenses">Категории</router-link>
            </li>
            <li class="navigation-item">
                <router-link to="/operations">История</router-link>
            </li>
            <li class="navigation-item">
                <router-link to="/analytics">Аналитика</router-link>
            </li>
        </ul>
        <div v-if="!authStatus.status" class="header__buttons-section">
            <button
                type="button"
                class="button header__button button--auth"
                @click="togglePopupAuth"
            >
                Войти
            </button>
            <button
                type="button"
                class="button header__button button--reg"
                @click="togglePopupReg"
            >
                Регистрация
            </button>
        </div>
        <div v-else class="header__buttons-section">
            <p class="header__buttons-section__user-name" id="header__buttons-section__user-name">{{ userName }}</p>
            <button
                type="button"
                class="button header__button button--exit"
                @click="exitAccount"
            >
                Выйти
            </button>
            <button
                type="button"
                @click="toggleSetting"
                class="icon-setting button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path
                        d="M16 9v-2l-1.7-0.6c-0.2-0.6-0.4-1.2-0.7-1.8l0.8-1.6-1.4-1.4-1.6 0.8c-0.5-0.3-1.1-0.6-1.8-0.7l-0.6-1.7h-2l-0.6 1.7c-0.6 0.2-1.2 0.4-1.7 0.7l-1.6-0.8-1.5 1.5 0.8 1.6c-0.3 0.5-0.5 1.1-0.7 1.7l-1.7 0.6v2l1.7 0.6c0.2 0.6 0.4 1.2 0.7 1.8l-0.8 1.6 1.4 1.4 1.6-0.8c0.5 0.3 1.1 0.6 1.8 0.7l0.6 1.7h2l0.6-1.7c0.6-0.2 1.2-0.4 1.8-0.7l1.6 0.8 1.4-1.4-0.8-1.6c0.3-0.5 0.6-1.1 0.7-1.8l1.7-0.6zM8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
                    />
                    <path
                        d="M10.6 7.9c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5z"
                    />
                </svg>
            </button>
        </div>
        <button @click="togglePopupNav" class="icon-bars button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
                />
            </svg>
        </button>

        <Transition mode="out-in">
            <PopupNav v-if="popupNav"></PopupNav>
        </Transition>

        <Transition mode="out-in">
            <PopupAuth v-if="popupAuth"></PopupAuth>
        </Transition>
        <Transition mode="out-in">
            <PopupReg v-if="popupReg"></PopupReg>
        </Transition>
        <Transition mode="out-in">
            <PopupSetting v-if="popupSetting"></PopupSetting>
        </Transition>
        <Transition mode="out-in">
            <PopupBalanceChange
                v-if="popupBalanceChange['status']"
            ></PopupBalanceChange>
        </Transition>
        <Transition mode="out-in">
            <PopupBalanceDelete
                v-if="popupBalanceDelete['status']"
            ></PopupBalanceDelete>
        </Transition>
        <Transition mode="out-in">
            <PopupOperationChange
                v-if="popupOperationChange['status']"
            ></PopupOperationChange>
        </Transition>
        <Transition mode="out-in">
            <PopupOperationDelete
                v-if="popupOperationDelete['status']"
            ></PopupOperationDelete>
        </Transition>
        <Transition mode="out-in">
            <PopupOperationAdd
                v-if="popupOperationAdd['status']"
            ></PopupOperationAdd>
        </Transition>
        <Transition mode="out-in">
            <PopupCategoryChange
                v-if="PopupCategoryChange['status']"
            ></PopupCategoryChange>
        </Transition>
    </header>
</template>

<script>
import PopupNav from "../blocks/globalPopup/PopupNav";
import PopupAuth from "../blocks/globalPopup/PopupAuth";
import PopupReg from "../blocks/globalPopup/PopupReg";

import PopupBalanceChange from "../blocks/balance/PopupBalanceChange.vue";
import PopupBalanceDelete from "../blocks/balance/PopupBalanceDelete.vue";

import PopupOperationChange from "../blocks/operation/PopupOperationChange.vue";
import PopupOperationDelete from "../blocks/operation/PopupOperationDelete.vue";
import PopupOperationAdd from "../blocks/category/PopupOperationAdd.vue";
import PopupCategoryChange from "../blocks/category/PopupCategoryChange.vue";
import PopupSetting from "../blocks/globalPopup/PopupSetting.vue";

export default {
    name: "Header",
    components: {
        PopupReg,
        PopupAuth,
        PopupNav,
        PopupSetting,
        PopupBalanceChange,
        PopupBalanceDelete,
        PopupOperationChange,
        PopupOperationDelete,
        PopupOperationAdd,
        PopupCategoryChange,
    },
    computed: {
        userName() {
            return this.$store.getters.getAuthStatus.userName;
        },
        authStatus() {
            return this.$store.getters.getAuthStatus;
        },
        popupNav() {
            return this.$store.getters.popupNav;
        },
        popupAuth() {
            return this.$store.getters.popupAuth;
        },
        popupReg() {
            return this.$store.getters.popupReg;
        },
        popupSetting() {
            return this.$store.getters.popupSetting;
        },
        popupBalanceChange() {
            return this.$store.getters.popupBalanceChange;
        },
        popupBalanceDelete() {
            return this.$store.getters.popupBalanceDelete;
        },
        popupOperationChange() {
            return this.$store.getters.popupOperationChange;
        },
        popupOperationDelete() {
            return this.$store.getters.popupOperationDelete;
        },
        popupOperationAdd() {
            return this.$store.getters.popupOperationAdd;
        },
        PopupCategoryChange() {
            return this.$store.getters.popupCategoryChange;
        },
    },
    methods: {
        exitAccount() {
            this.$router.push({ name: "main", params: {} });
            this.$store.commit("clearAccounts");
            this.$store.commit("clearCategoryData");
            this.$store.commit("clearOperationData");
            this.$store.commit("clearAnalytictData");

            this.$store.commit("setAuthStatus", {
                field: "status",
                value: false,
            });
        },
        togglePopupNav() {
            this.$store.commit("togglePopupNav", true);
        },
        togglePopupAuth() {
            this.$store.commit("changeErrors", {});
            this.$store.commit("togglePopupAuth", true);
        },
        togglePopupReg() {
            this.$store.commit("changeErrors", {});
            this.$store.commit("togglePopupReg", true);
        },
        toggleSetting() {
            this.$store.commit("changeErrors", {});
            this.$store.commit("togglePopupSetting", true);
        },
    },
};
</script>

<style scoped>

.v-enter-from {
    opacity: 0;
    transform: translate(0, -100%);
}
.v-enter-to {
    opacity: 1;
    transition: all 0.4s ease-out;
}

.v-leave-from {
    opacity: 1;
}

.v-leave-to {
    opacity: 0;
    transition: all 0.4s ease-out;
    transform: translate(0, -100%);
}
</style>
