<template>
    <main class="general">
        <div class="general__content">
            <h3 class="general__title">70% людей в мире не следят за своими финансами</h3>
            <img
                class="general__analytics"
                :src="img_analytics"
                alt="analytics image"
            />
            <div class="general__text-block">
                <p>
                    В современных экономических условиях одной из самых
                    актуальных проблем человека является контроль над личными
                    финансами. Основой для надёжного контролирования личных
                    финансов является ведение записей о каждой операции с ними.
                </p>
                <p>
                    Бесплатный учёт личных финансов, гибкие настрочки, приятный
                    дизайн Ваш финансовый навигатор в браузере и смартфоне.
                </p>
                <p>
                    Ещё не попробовал? Воспользуйся возможностью прямо сейчас
                    Регистрируйся прямо сейчас по кнопке ниже.
                </p>
                <button
                    type="button"
                    @click="togglePopupReg"
                    class="button general__button button--start-reg"
                    href=""
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import img_analytics from "../../../../public/assets/files/images/analytics.png";
export default {
    name: "MainPage",
    data() {
        return {
            img_analytics: img_analytics,
        };
    },
    methods: {
        togglePopupReg() {
            this.$store.commit("changeErrors", {});
            this.$store.commit("togglePopupReg", true);
        },
    },
};
</script>

<style scoped></style>
