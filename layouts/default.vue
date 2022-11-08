<template>
<div class="">
    <Nuxt />
</div>
</template>

<script>
export default {
  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  }
}
</script>

<style scoped>

</style>
