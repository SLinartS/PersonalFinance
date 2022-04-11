<template>
  <div class="operation-search">
    <label class="operation-search__label" for="">Поиск: </label>
    <input
      class="operation-search__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('goSearch')"
      placeholder="Покормил кота.."
      type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>

<style>
</style>
