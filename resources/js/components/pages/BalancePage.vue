<template>
    <main class="balance-history">
        <div class="data-block">
            <h3 class="data-title">Счета</h3>
            <div class="data-list">
                <div class="data-stroke">
                    <p class="data-item">Наличные</p>
                    <p class="data-item">194,63 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Карта ВТБ</p>
                    <p class="data-item">0,00 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Карта Альфа Банк</p>
                    <p class="data-item">76,05 ₽</p>
                </div>
            </div>
        </div>
        <div class="data-block">
            <h3 class="data-title">Долги</h3>
            <div class="data-list">
                <div class="data-stroke">
                    <p class="data-item">Кредит</p>
                    <p class="data-item">197 494,72 ₽</p>
                </div>
                <div class="data-stroke">
                    <p class="data-item">Долг Андрею</p>
                    <p class="data-item">1000 ₽</p>
                </div>
            </div>
        </div>
        <div class="data-block">
            <h3 class="data-title">Накопления</h3>
            <div class="data-list">
                <div class="data-stroke--empty">
                    <p class="data-item--empty">Накоплений нет. <a>Добавить</a></p>
                </div>
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
