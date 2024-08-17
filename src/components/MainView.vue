<template>
  <div class="main-view">
    <!-- Main Header -->
    <MainHeader />

    <!-- Router View (Other views like Settings, File Upload, etc., will be injected here) -->
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from './MainHeader.vue';
export default {
  components: {
    MainHeader
  }
};
</script>

<style>
.main-view {
  display: flex;
  flex-grow:1;
  flex-direction: column;
  overflow-y: auto;
  /* height: 100vh;
  width: 100%; */
  padding: 20px;
  box-sizing: border-box;
  min-width: 300px;
  height: 100%;
}
</style>
