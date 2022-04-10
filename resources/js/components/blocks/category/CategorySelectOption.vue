<template>
    <option :value="id">| {{ currentType }} | {{ title }} [{{ amount }} ₽]</option>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        amount: String,
        type: String
    },
    computed: {
        currentType() {
            switch (this.type) {
                case "account":
                    return "Счёт"
                case "debt":
                    return "Долг"
                case "saving":
                    return "Накопление"
            }
        }
    }
}
</script>

<style></style>
