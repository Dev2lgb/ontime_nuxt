<template>
  <div class="inner">
    <CommonHeader :link="'/home'" :title="'개인정보처리방침'"/>
    <div class="pa-10 inner">
      <Privacy />
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader";
export default {
  components: {CommonHeader},
  layout: 'common',
  data: () => ({
  }),
  methods: {
  },
}
</script>

<style scoped>

</style>
