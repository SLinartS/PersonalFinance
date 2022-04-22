<template>
    <option :value="id">
        | {{ currentType }} | {{ title }} [{{ amount }}
        {{ options["options"]["currencyValue"] }}]
    </option>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        amount: String,
        type: String,
    },
    computed: {
        currentType() {
            switch (this.type) {
                case "account":
                    return "Счёт";
                case "debt":
                    return "Долг";
                case "saving":
                    return "Накопление";
            }
        },
        options() {
            if (this.$store.getters.getOptionsList) {
                return this.$store.getters.getOptionsList;
            } else {
                return {
                    options: {
                        currencyValue: "",
                    },
                };
            }
        },
    },
    mounted() {
        this.loadOptions();
    },
    methods: {
        loadOptions() {
            if (this.AuthStatusStatus) {
                this.$store.dispatch("loadOptionsByUserId");
            }
        },
    },
};
</script>

<style></style>
