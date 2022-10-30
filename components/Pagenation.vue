<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  watch : {
    pagination(val) {
      this.page = val.page;
      this.length = val.last_page;
    },
    page(val) {
      this.$emit('page-data', val);
    }
  },
  data () {
    return {
      page: 1,
      length: 1,
    }
  },
}
</script>
