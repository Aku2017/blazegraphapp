<template>
  <div class="settings-page">
    <!-- Database Connection Status -->
    <div class="section-header">
      <h2>
        Active Database Information
        <i class="fas fa-info-circle"></i>
      </h2>
      <!-- Add Button for Active Database Information -->
      <button class="add-button" @click="addDatabase('active')">
        <i class="fas fa-plus"></i>
        <font-awesome-icon icon="plus" />
      </button>
    </div>

    <!-- Conditional Rendering: Show info-table if connected, otherwise show message box -->
    <div v-if="isDatabaseConnected && databaseInfo" class="db-info">
      <table class="info-table">
        <thead>
          <tr>
            <th colspan="2">Basic Information</th>
            <th colspan="4">Additional Information</th>
          </tr>
          <tr>
            <th>Configuration</th>
            <th>Details</th>
            <th>Metric</th>
            <th>Values</th>
            <th>Metric</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Database Type</td>
            <td>{{ databaseInfo.databaseType }}</td>
            <td>runningQueriesCount</td>
            <td>{{ databaseInfo.status.runningQueriesCount }}</td>
            <td>deadlineQueueSize</td>
            <td>{{ databaseInfo.status.deadlineQueueSize }}</td>
          </tr>
          <tr>
            <td>Port</td>
            <td>{{ databaseInfo.port }}</td>
            <td>queryPerSecond</td>
            <td>{{ databaseInfo.status.queryPerSecond }}</td>
            <td>queryErrorCount</td>
            <td>{{ databaseInfo.status.queryErrorCount }}</td>
          </tr>
          <tr>
            <td>IP Address</td>
            <td>{{ databaseInfo.ipAddress }}</td>
            <td>operatorActiveCount</td>
            <td>{{ databaseInfo.status.operatorActiveCount }}</td>
            <td>operatorStartCount</td>
            <td>{{ databaseInfo.status.operatorStartCount }}</td>
          </tr>
          <tr>
            <td>Repositories</td>
            <td>1</td>
            <td>queryStartCount</td>
            <td>{{ databaseInfo.status.queryStartCount }}</td>
            <td>queryDoneCount</td>
            <td>{{ databaseInfo.status.queryDoneCount }}</td>
          </tr>
          <tr>
            <td>Connection Status</td>
            <td>Connected</td>
            <td>operatorTasksPerQuery</td>
            <td>{{ databaseInfo.status.operatorTasksPerQuery }}</td>
            <td>operatorHaltCount</td>
            <td>{{ databaseInfo.status.operatorHaltCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Show this message box if no database is connected -->
    <div v-else class="message-box">
      <i class="fas fa-database message-icon"></i>
      <div class="message-content">
        <p class="message-text">
          There is no database connected to this manager.
        </p>
        <p class="message-text">
          Press the button below to create a new database or connect to an existing one.
        </p>
      </div>
      <button class="action-button" @click="addDatabase('active')">
        Create or Connect Database
      </button>
    </div>

    <!-- Section Header for Repository -->
    <div class="section-header">
      <h2>
        Repository
        <i class="fas fa-plus"></i>
      </h2>
      <!-- Add Button for Repository -->
      <button class="add-button" @click="addDatabase('repository')">
        <i class="fas fa-plus"></i>
        <font-awesome-icon icon="plus" />
      </button>
    </div>
    
    <!-- Namespace Table -->
    <section class="repository-content">
      <table v-if="namespaces.length" class="info-table">
        <thead>
          <tr>
            <th>Namespace</th>
            <th>Blazegraph URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="namespace in namespaces" :key="namespace.name">
            <td>{{ namespace.name }}</td>
            <td>{{ namespace.url }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No namespaces available.</p>
    </section>
    
    <!-- Modal for Add Database -->
    <Modal v-model:visible="isModalVisible">
      <div class="modal-header">
        <button 
          :class="{ active: activeTab === 'create' }" 
          @click="activeTab = 'create'">
          Create Database
        </button>
        <button 
          :class="{ active: activeTab === 'connect' }" 
          @click="activeTab = 'connect'">
          Connect to Existing Database
        </button>
      </div>

      <!-- Conditional Rendering of Forms -->
      <div class="modal-body">
        <CreateDatabaseForm v-if="activeTab === 'create'" />
        <ConnectDatabaseForm v-else :onSuccess="fetchDatabaseInfo" />
      </div>
    </Modal>

    <!-- NamespaceForm Component -->
    <!-- NamespaceForm Component -->
    <NamespaceForm
      v-if="showNamespaceForm"
      :isVisible="showNamespaceForm"
      @update:isVisible="showNamespaceForm = $event"
      @namespaceCreated="handleNamespaceCreated"
    />
  </div>
</template>

<script>
import Modal from './Modal.vue';
import axios from 'axios';
import CreateDatabaseForm from './CreateDatabasePage.vue';
import ConnectDatabaseForm from './ConnectDatabaseForm.vue';
import NamespaceForm from './NamespaceForm.vue'; 

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Settings",
  components: {
    Modal,
    CreateDatabaseForm,
    ConnectDatabaseForm,
    NamespaceForm
  },
  data() {
    return {
      databaseInfo: null,
      isModalVisible: false,
      showNamespaceForm: false, // Controls the visibility of the NamespaceForm
      activeTab: "create", // Default to the "Create Database" tab
      isDatabaseConnected: false, // Change to true for testing the connected state
      namespaces: [], // Array to hold the namespace data
    };
  },
  methods: {
    async fetchDatabaseInfo() {
      try {
        const response = await axios.get('http://102.37.137.65/5009/database_info');
        this.databaseInfo = response.data;
        this.isDatabaseConnected = true;
      } catch (error) {
        console.error('Error fetching database info:', error);
        this.isDatabaseConnected = false;
        this.databaseInfo = null;
      }
    },
    addDatabase(location) {
      if (location === 'active') {
        this.isModalVisible = true;
      } else if (location === 'repository') {
        if (this.isDatabaseConnected) {
          this.showNamespaceForm = true;
        } else {
          alert('Please connect to a database first.');
        }
      }
    },
    openNamespaceModal() {
      if (this.isDatabaseConnected) {
        this.showNamespaceForm = true;
      } else {
        alert('Please connect to a database first.');
      }
    },
    async handleNamespaceCreated(namespaceName) {
      try
      {
          console.log("dsdfsdf", namespaceName)
        this.namespaces.push(namespaceName); 
        }
   catch (error) {
        console.error("Error creating namespace:", error);
      }
    },
    mounted() {
      this.fetchDatabaseInfo();
    }
  },
};
</script>

<style scoped>
.settings-page {
  padding: 20px;
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: flex-start;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
}

h2 i {
  margin-left: 10px;
  font-size: 18px;
  color: #7a7a7a;
}

.db-info {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
}

.info-table th, .info-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.info-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}

.add-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: #808080;
  background-color: #ffffff;
  border: 2px solid #808080;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5px;
}

.add-button:hover {
  background-color: #f0f0f0;
  border-color: #606060;
}

.add-button i {
  margin: 0;
  font-size: 16px;
  text-shadow: 
    0 0 2px #808080, 
    0 0 4px #808080, 
    0 0 6px #808080;
}

.message-box {
  display: flex;
  align-items: center;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
}

.message-icon {
  font-size: 24px;
  color: #721c24;
  margin-right: 15px;
}

.message-content {
  flex: 1;
}

.message-text {
  margin: 0;
  color: #721c24;
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.action-button:hover {
  background-color: #0056b3;
}

.repository-content {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
}

.repo-item {
  display: block;
  margin-bottom: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-around;
  padding: 10px 10px 10px;
  margin-bottom: 20px;
}

.modal-header button {
  flex: 1;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.modal-header button.active {
  background-color: #007bff;
  color: #fff;
}

.modal-body {
  height: 680px;
  overflow-y: auto;
  padding: 1px;
  background-color: #fff;
  border-radius: 4px;
}

.modal-body form {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
</style>
