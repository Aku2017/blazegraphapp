<template>
  <div class="create-database-form">
    <h2>Create a new database</h2>
    <p class="intro-text">
      To create a new database, please select the type of database, provide the installation path, and enter the port.
      Additionally, you can specify the minimum/maximum memory usage for the database to run accordingly.
    </p>
    <form @submit.prevent="createDatabase">
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
          <label for="installation-path">Installation Path</label>
          <div class="input-with-button">
            <button type="button" @click="triggerFileInput" class="choose-folder-btn">Choose Folder</button>
            <input
              type="text"
              id="installation-path"
              v-model="installationPath"
              placeholder="Select a folder"
            />
            <input
              type="file"
              ref="fileInput"
              style="display: none;"
              webkitdirectory
              @change="triggerFolderSelection"
              aria-label="Select a folder"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="port">Port</label>
          <input type="text" id="port" v-model="port" placeholder="9999" />
        </div>
      </section>

      <section class="form-section">
        <h3>Optional</h3>
        <div class="form-group">
          <label for="min-memory">Minimum Memory Usage (-Xms)</label>
          <input type="text" id="min-memory" v-model="minMemory" placeholder="9999" />
        </div>
        <div class="form-group">
          <label for="max-memory">Maximum Memory Usage (-Xmx)</label>
          <input type="text" id="max-memory" v-model="maxMemory" placeholder="9999" />
        </div>
      </section>

      <div class="form-footer">
        <button type="submit" class="submit-btn">Create database</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  name: "CreateDatabaseForm",
  data() {
    return {
      databaseType: "blazegraph",
      installationPath: "",
      port: "",
      minMemory: "",
      maxMemory: "",
    };
  },
  methods: {
    triggerFileInput() {
      // Trigger the file input click to open the folder picker dialog
      this.$refs.fileInput.click();
    },


    triggerFolderSelection(event) {
      // Create a hidden file input element
      // Add a change event listene
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
          // Extract the folder path from the first file's relative path
          const firstFilePath = fileInput.files[0].webkitRelativePath;
          if (firstFilePath) {
            // Folder path is derived from the file's relative path
            const folderPath = firstFilePath;
            this.installationPath = folderPath;  // Set the installation path
          }
        }
      },
    async createDatabase() {
      // Create the payload with the form data
      const payload = {
        databaseType: this.databaseType,
        installationPath: this.installationPath,
        port: this.port,
        minMemory: this.minMemory,
        maxMemory: this.maxMemory
      };

   try {
  // Make a POST request to your Flask API
  const response = await axios.post('http://localhost:5009/create_database', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Extract message and URL from the response
  const message = response.data.message;
  const url = response.data.url;

  // Alert the user with the message and the URL
  alert(`Success: ${message}\nYou can access Blazegraph here: ${url}`);

} catch (error) {
  // Handle errors here
  alert(`Error: ${error.response ? error.response.data.error : error.message}`);
}

    }
  },
};
</script>

<style scoped>
/* Retain your existing CSS styles */

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

/* p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
} */

.intro-text {
  font-size: 16px; /* Increased font size for better readability */
  line-height: 1.5; /* Increased line height for better spacing between lines */
  color: #333; /* Darker color for better contrast and readability */
  margin-bottom: 20px; /* Space below the paragraph */
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
  flex-wrap: wrap; /* Allow items to wrap if needed */
}

label {
  flex: 0 0 200px; /* Fixed width for the label */
  margin-right: 15px; /* Space between label and input/select */
  font-weight: bold;
  white-space: nowrap; /* Prevent label text from wrapping */
}

input[type="text"],
select {
  width: 100%; /* Full width of the container */
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-with-button {
  display: flex;
  align-items: center;
  width: 100%; /* Ensure full width for the input-with-button */
  
}

.input-with-button button {
  margin-right: 10px; /* Space between button and input */
  padding: 5px 10px; /* Padding inside the button */
  font-size: 14px;
  
}

.choose-folder-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-right: 10px; /* Space between button and input */
  flex-shrink: 0; /* Prevent the button from shrinking */
  height: 100%; /* Match the height of the input */
}

.choose-folder-btn:hover {
  background-color: #0056b3;
}



.input-with-button input[type="text"] {
  flex: 1; /* Allow the input to grow */
  padding: 10px; /* Ensure padding matches button */
}

.submit-btn {
  display: inline-block;
  margin: 20px 0 0; /* Space above and below the button */
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
  text-align: right; /* Align the submit button to the right */
}

@media (max-width: 600px) {
  b-form-group {
    margin-bottom: 15px;
  }
}
</style>
