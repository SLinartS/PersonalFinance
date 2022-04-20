<template>
    <option :value="id">{{ value }}</option>
</template>

<script>
export default {
    props: {
        id: Number,
        value: String
    },
    computed: {
    }
}
</script>

<style>
</style>
