<template>
  <div id="app">
    <AppSidebar />
    <div class="content">
    <MainView/>
    </div> 
  </div>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import MainView from './components/MainView.vue';

export default {
  name: "App",
  components: {
    AppSidebar,
    MainView
  },
};
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  width: 100%;
}

.content {
  flex-grow: 1;
  background-color: #f5f6fa;
  overflow: hidden;
  padding: 20px;
  background-color: #f5f6fa;
  box-sizing: border-box;
}

</style>
