<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="@/assets/hike.png" alt="HikeDB Logo" class="logo" />
      <h1>Hike Lab</h1>
    </div>
    <ul>
      <li>
        <router-link to="/" exact>
          <i class="fas fa-home"></i>
          <font-awesome-icon icon="home" />
          홈
        </router-link>
      </li>
      <li>
        <router-link to="/data-upload">
          <i class="fas fa-upload"></i>
          <font-awesome-icon icon="upload" />
          데이터 업로드
        </router-link>
      </li>
      <li>
        <router-link to="/namespace">
          <i class="fas fa-project-diagram"></i>
           <font-awesome-icon icon="project-diagram" />
          Namespace
        </router-link>
      </li>
      <li>
        <router-link to="/sparql">
          <i class="fas fa-code"></i>
          <font-awesome-icon icon="code" />
          SPARQL
        </router-link>
      </li>
      <li>
        <router-link to="/settings">
          <i class="fas fa-cog"></i>
          <font-awesome-icon icon="cog" />
          설정
        </router-link>
      </li>
        <li>
        <router-link to="/statistics">
          <i class="fas fa-chart-line"></i>
          <font-awesome-icon icon="chart-line" />
          통계
        </router-link>
      </li>
      <li>
        <router-link to="/graph-exploration">
          <i class="fas fa-sitemap"></i>
          <font-awesome-icon icon="sitemap" />
          그래프 탐색
        </router-link>
      </li>
      <li>
        <router-link to="/my-processes">
          <i class="fas fa-tasks"></i>
          <font-awesome-icon icon="tasks" />
          내 프로세스
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
};
</script>

<style scoped>
.sidebar {
  width: 15%;
  background-color: #1e1e2d;
  color: #fff;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  /* transition: width 0.3s ease; */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 2.0px 0;
  transition: transform 0.3s ease;
}

.sidebar li:hover {
  transform: scale(1.02);
}

.sidebar a {
  text-decoration: none;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: all 0.2s ease-out; /* Smoother transition */
  will-change: transform, opacity; /* Hint browser about changes */  display: flex;
  align-items: center;
  gap: 15px; /* Add gap between icon and text */
  font-family: Arial, sans-serif; /* Replace with your desired font */
  font-size: 18px; /* Adjust font size as needed */
  font-weight: bold; /* Optional: add weight */
  height: 50px
}

.sidebar a:hover {
  background-color: #34344a;
  border-radius: 4px;
  padding-left: 20px;
  /* ... other styles */
  height: 50px; /* Allow content to expand vertically */
}

.sidebar a:active {
  /* ... other styles */
  transform: scale(0.98); /* Slight scale down on click */
}

/* .sidebar i, 
  .sidebar .fa {
  margin-right: 10px; /* Ensure space between icon and text */
  /*font-size: 20px;
/*} */


/* .sidebar li:hover {
  transform: scale(1.05);
} */

.router-link-exact-active,
.router-link-active {
  background-color: #34344a; /* Background color for active item */
  font-weight: bold;          /* Bold text for active item */
  padding-left: 20px;         /* Indentation for active item */
  border-left: 4px solid #ffcc00; /* Highlight with a colored border */
   height: 50px; /* Make sure it takes up full height */
  align-items: center;
}
/* Logo image styling */
.logo {
  width: 50px; /* Adjust width as needed */
  height: auto; /* Ma`intain aspect ratio */
  margin-right: 15px; /* Space between logo and company name */
  border-radius: 50%; /* Optional: makes logo circular */
}

.sidebar-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #FFCCFF;
}

/* Sidebar header styling */
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #34344a;
}
</style>
