<template>
    <div class="wrapper">
        <Header></Header>
        <router-view v-slot="{ Component }">
            <Transition mode="out-in">
                <component :is="Component" />
            </Transition>
        </router-view>
        <Footer></Footer>   </div>
</template>

<script>
import Header from "./section/Header";
import MainPage from "./pages/MainPage";
import Footer from "./section/Footer";

export default {
    name: "App",
    components: { Footer, MainPage, Header },
    mounted() {

    }
}
</script>

<style scoped>
.v-enter-from {
    opacity: 0;
    transform: translate(0, 100%);
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
    transform: translate(0, 100%);
}
</style>
