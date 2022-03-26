<template>
    <main class="analytics">
        <div class="analytics__main-bar">
            <div class="analytics__main-bar__calendar">
                <svg class="icon-calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"/>
                </svg>
                <p class="analytics__main-bar__date">14-20 марта 2022</p>
            </div>
            <div class="analytics__main-bar__elem-result">
                <h3 class="analytics__main-bar__title">Текущий баланс:</h3>
                <p class="analytics__main-bar__amount-result result">106 457,69 ₽</p>
            </div>
            <div class="analytics__main-bar__additional-information">
                <div class="analytics__main-bar__elem-middle-day">
                    <h3 class="analytics__main-bar__title">Ср. день</h3>
                    <p class="analytics__main-bar__amount analytics__setting-amount--middle-day expenses">16 417,72 ₽</p>
                </div>
                <div class="analytics__main-bar__elem-middle-week">
                    <h3 class="analytics__main-bar__title">Ср. неделя</h3>
                    <p class="analytics__main-bar__amount analytics__setting__amount--middle-week expenses">9 046,14 ₽</p>
                </div>
            </div>
        </div>
        <div class="current-balance">
            <div class="current-balance__elem current-balance__elem--income">
                <h3 class="current-balance__title">Поступления</h3>
                <p class="current-balance__amount income">25 463,86 ₽</p>
            </div>
            <div class="current-balance__elem current-balance__elem--result">
                <h3 class="current-balance__title">Итог</h3>
                <p class="current-balance__amount current-balance__amount--result">16 417,72 ₽</p>
            </div>
            <div class="current-balance__elem current-balance__elem--expenses">
                <h3 class="current-balance__title">Расходы</h3>
                <p class="current-balance__amount expenses">9 046,14 ₽</p>
            </div>
        </div>
        <div class="analytics__all-blocks">
            <div class="analytics__one-block">
                <div class="analytics__circle-diagram-">
                    <img src="../../../../public/assets/files/images/chart.svg" alt="">
                    <!--                Здесь должена быть круговая диаграмма-->
                </div>
            </div>
            <div class="analytics__two-block">
                <div class="analytics__buttons-section">
                    <a class="button analytics__button bgincome" href="">Поступления</a>
                    <a class="button analytics__button bgexpenses" href="">Расходы</a>
                </div>
                <div class="analytics__graph-diagram">
                    <img src="../../../../public/assets/files/images/graph.svg" alt="">
                    <!--                Здесь должен быть график по дням-->
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
