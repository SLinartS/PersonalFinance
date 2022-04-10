<template>
    <option :style="{backgroundColor: value}" :value="id">| {{ title }} |</option>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        value: String,
    },
}
</script>

<style></style>
