<template>
  <div class="create-database-form">
    <h2>Connect to an existing database</h2>
    <p class="intro-text">
      To connect to an existing database, please provide the IP address and port number.
    </p>
    <form @submit.prevent="connectDatabase">
      <section class="form-section">
        <h3>Required</h3>
        <div class="form-group">
          <label for="database-type">Database Type</label>
          <select id="database-type" v-model="databaseType">
            <option value="blazegraph">Blazegraph</option>
            <!-- Add other database types as needed -->
          </select>
        </div>
        <div class="form-group">
          <label for="ip-address">IP Address</label>
          <input
            type="text"
            id="ip-address"
            v-model="ipAddress"
            placeholder="192.168.30.195"
          />
        </div>
        <div class="form-group">
          <label for="port">Port</label>
          <input
            type="text"
            id="port"
            v-model="port"
            placeholder="9999"
          />
        </div>
      </section>

      <div class="form-footer">
        <button type="submit" class="submit-btn">Connect to database</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ConnectDatabaseForm",
  props: {
    onSuccess: {
      type: Function, // Add this to accept the event handler from the parent
      required: true
    }
  },
  data() {
    return {
      databaseType: "blazegraph",
      ipAddress: "",  // Initialize with an empty string
      port: "",       // Initialize with an empty string
    };
  },
  methods: {
    async connectDatabase() {
      try {
        // Construct the payload for the POST request
        const payload = {
          ipAddress: this.ipAddress,
          port: this.port,
        };

        // Make a POST request to your Flask API
        const response = await axios.post('http://102.37.137.65/5009/connect_database', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Extract the message and URL from the response
        const message = response.data.message;
        const url = response.data.url;

        // Alert the user with the message and the URL
        alert(`Success: ${message}\nYou can access Blazegraph here: ${url}`);

        // Optionally, redirect the user to the Blazegraph URL
        // window.location.href = url;
       
        // Emit an event to notify the parent component
        
        // Call the onSuccess callback to fetch database info
        if (this.onSuccess && typeof this.onSuccess === 'function') {
          this.onSuccess();
        }

         // Open the URL in a new tab
        //window.open(url, '_blank');

      } catch (error) {
        // Handle errors here
        alert(`Error: ${error.response ? error.response.data.error : error.message}`);
      }
    },
  },
};
</script>

<style scoped>
.create-database-form {
  width: 650px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.intro-text {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
}

.form-section {
  margin-bottom: 15px;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

label {
  flex: 0 0 200px;
  margin-right: 15px;
  font-weight: bold;
  white-space: nowrap;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  display: inline-block;
  margin: 20px 0 0;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.form-footer {
  text-align: right;
}
</style>
