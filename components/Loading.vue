<template>
  <div v-show="loading" class="loading_back" style="background-color:rgba(255,255,255,.9); position:fixed; transition: .3s; left:0; right:0; top:0; bottom:0; z-index:999">
    <v-progress-circular
      :size="30"
      :width="2"
      indeterminate
      style="color:#483dff; opacity:.5; position: fixed; z-index: 9999; left: 50%; top: 50%; transform:translate(-50%,-50%); width: 60px; height: 60px; text-align:center;"
    />
  </div>
</template>
<script>
export default {
  props: ["loading"],
}
</script>
