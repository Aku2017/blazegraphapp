<template>
  <div class="main-header">
    <div class="header-content">
      <h1>설정</h1>
      <div class="user-section">
        <span>한국어</span>
        <span class="username">username</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: 'MainHeader'
};
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}

.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-section span {
  margin-left: 10px;
}

.username {
  color: #6c757d;
}
</style>
