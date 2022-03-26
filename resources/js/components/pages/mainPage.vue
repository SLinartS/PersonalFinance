<template>
    <main class="general">
        <div class="general__content">
            <h3 class="general__title"> Крутая кликбейтная фраза?</h3>
            <img class="general__analytics" :src='img_analytics' alt="analytics image">
            <div class="general__text-block">
                <p>Противоположная точка зрения подразумевает, что сделанные на базе интернет-аналитики выводы могут быть
                    обнародованы.
                    Имеется спорная точка зрения, гласящая примерно следующее: интерактивные прототипы призваны к
                    ответу.</p>
                <p>Значимость этих проблем настолько очевидна, что базовый вектор развития требует определения и уточнения
                    направлений прогрессивного развития.
                    Равным образом, убеждённость некоторых оппонентов обеспечивает широкому кругу (специалистов)
                    участие.</p>
                <p>Попробуй воспользоваться, удивись, обрадуйся, прими.
                    Регистрируйся прямо сейчас по кнопке ниже.</p>
                <a class="button general__button button--start-reg" href="">Зарегистрироваться</a>
            </div>
        </div>
    </main>
</template>

<script>
import img_analytics from "../../../../public/assets/files/images/analytics.png"
export default {
    name: "MainPage",
    data() {
        return {
            img_analytics: img_analytics
        }
    }
// :src="require('../../../../public/assets/files/images/analytics.png').default"
}
</script>

<style scoped>

</style>
