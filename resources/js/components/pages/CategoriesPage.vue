<template>
    <main class="categories">
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
        <router-view></router-view>
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
