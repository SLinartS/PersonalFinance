<template>
    <div class="wrapper">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./section/Header";
import MainPage from "./pages/MainPage";
import Footer from "./section/Footer";

export default {
    name: "App",
    components: {Footer, MainPage, Header}
}
</script>

<style scoped>

</style>
