<template>
  <div class="flex j_start a_center">
    <div>
      <v-btn
        fab
        text
        exact
        @click="$router.go(-1)"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
export default {
  layout: 'user',
  props : ['link', 'title'],
  data: () => ({

  })
}
</script>
