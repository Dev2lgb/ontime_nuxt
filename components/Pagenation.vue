<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="pagination.last_page"
      circle
    ></v-pagination>
    {{ last_page }}
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  watch : {
    page(val) {
      this.$emit('page-data', val);
    }
  },
  data () {
    return {
      page: 1,
      length: 1,
      last_page: 1,
    }
  },
}
</script>
