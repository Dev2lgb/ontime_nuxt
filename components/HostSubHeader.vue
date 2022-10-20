<template>
  <div class="flex j_start a_center host_sub_header">
    <div>
      <v-btn
        fab
        text
        exact
        :to="link"
      >
        <v-icon color="#fff">mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <h3 class="font_white">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props : ['link', 'title'],
  data: () => ({

  })
}
</script>

<style>
.host_sub_header { background-color:#173bb3 }
.font_white { color:#fff; }
</style>
