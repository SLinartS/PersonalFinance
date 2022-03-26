<template>
    <div class="auth-reg auth-reg--reg">
        <div class="auth-reg__header">
            <h2 class="auth-reg__header__title">Регистрация</h2>
            <svg class="icon-close icon-close--auth-reg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
            </svg>
        </div>
        <div class="auth-reg__input-section">
            <div class="auth-reg__input-block">
                <img class="auth-reg__image" src="../../../../public/assets/files/images/user-solid.svg" alt="">
                <input class="input" type="text" id="e-mail" name="e-mail" placeholder="Электронная почта">
            </div>
            <div class="auth-reg__input-block">
                <img class="auth-reg__image" src="../../../../public/assets/files/images/key-solid.svg" alt="">
                <input class="input" type="text" id="password" name="password" placeholder="Пароль">
            </div>
            <div class="auth-reg__input-block">
                <img class="auth-reg__image" src="../../../../public/assets/files/images/key-solid.svg" alt="">
                <input class="input" type="text" id="repeat-password" name="repeat-password"
                       placeholder="Повторите пароль">
            </div>
        </div>
        <div class="auth-reg__button-section">
            <a class="button button--reg auth-reg__button" href="">Зарегистрироваться</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "PopupReg"
}
</script>

<style scoped>

</style>
