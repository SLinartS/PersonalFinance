<template>
    <main class="balance-history">
        <div class="data-block">
            <h3 class="data-title">14 марта (сегодня)</h3>
            <div class="data-list">
                <div class="data-stroke">
                    <p class="data-item">Корм собаке</p>
                    <p class="data-item expenses">– 194,63 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Новая футболка</p>
                    <p class="data-item expenses">– 504,42 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Аспирин</p>
                    <p class="data-item expenses">– 200 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Проезд на автобусе</p>
                    <p class="data-item expenses">– 76,05 ₽</p>
                </div>
            </div>
        </div>
        <div class="data-block">
            <h3 class="data-title">13 марта (вчера)</h3>
            <div class="data-list">
                <div class="data-stroke">
                    <p class="data-item">Сосиска в тесте</p>
                    <p class="data-item expenses">– 50 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Зарплата</p>
                    <p class="data-item income">+ 25 463,86 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Нашёл деньги</p>
                    <p class="data-item income">+ 100 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Проезд на автобусе</p>
                    <p class="data-item expenses">– 35,70 ₽</p>
                </div>
            </div>
        </div>
        <!--    <h3 class="data-title">12 марта</h3>-->
        <!--    <div class="data-list">-->
        <!--        <div class="data-stroke&#45;&#45;empty">-->
        <!--            <p class="data-item&#45;&#45;empty">Операций нет</p>-->
        <!--        </div>-->
        <!--    </div>-->
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
