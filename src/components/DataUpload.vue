<template>
  <div class="datauploadpage">
    <b-container fluid>
      <b-row>
        <b-col>
          <!-- File Upload Section -->
          <b-card title="File Upload" class="w-100">
            <!-- Import Button with FontAwesome Upload Icon -->
            <b-button @click="triggerFileInput" variant="primary" class="mb-3">
              <font-awesome-icon icon="fa-solid fa-upload" /> Import Selected File
            </b-button>

            <!-- Hidden File Input -->
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              style="display: none"
            />

            <!-- Table to Display Files with Actions -->
            <b-table
              :items="files"
              :fields="fields"
              striped
              hover
              responsive
              class="data-table w-100"
            >
              <!-- Checkbox Column for Selection -->
              <template #cell(checkbox)="data">
                <b-form-checkbox
                  v-model="data.item.selected"
                  class="custom-checkbox"
                  size="lg"
                ></b-form-checkbox>
              </template>

              <!-- File Name Cell -->
              <template #cell(name)="data">
                {{ data.item.name }}
              </template>

              <!-- File Size Cell -->
              <template #cell(size)="data">
                {{ data.item.size }}
              </template>

              <!-- Graph ID Cell with Dropdown -->
              <template #cell(graphId)="data">
                <b-form-select
                  v-model="data.item.graphId"
                  :options="graphOptions"
                  size="sm"
                  class="graph-select"
                ></b-form-select>
              </template>

              <!-- Delete Button with FontAwesome Trash Icon -->
              <template #cell(delete)="data">
                <b-button
                  @click="deleteFile(data.index)"
                  variant="danger"
                  size="sm"
                  class="action-btn"
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </b-button>
              </template>

              <!-- Import Button with FontAwesome Download Icon -->
              <template #cell(import)="data">
                <b-button
                  @click="importFile(data.index)"
                  variant="success"
                  size="sm"
                  class="action-btn"
                >
                  <font-awesome-icon icon="fa-solid fa-download" />
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      graphOptions: ['None', 'graph1', 'graph2'],
      files: [],
      fields: [
        { key: 'checkbox', label: '' },
        { key: 'name', label: 'File', class: 'file-column' },
        { key: 'size', label: 'Size', class: 'size-column' },
        { key: 'graphId', label: 'Named GraphId', class: 'graphid-column' },
        { key: 'delete', label: 'Delete', class: 'action-column' },
        { key: 'import', label: 'Import', class: 'action-column' }
      ]
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click(); // Programmatically open the file dialog
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate the file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'ttl') {
          alert('Please select a .ttl file.');
          return;
        }

        this.selectedFile = file;
        this.files.push({
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`, // Size in KB
          graphId: 'None',
          selected: false
        });
      }
    },
    async importFile(index) {
      const file = this.files[index];
      if (!file) {
        alert('File not found');
        return;
      }

      if (!this.selectedFile) {
        alert('Please select a file to import');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('filename', file.name);
      formData.append('graphId', file.graphId);

      try {
        const response = await axios.post('http://102.37.137.65/5009/import_file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert(`File import status: ${response.data.message}`);
        this.selectedFile = null; // Reset file input
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error importing file');
      }
    },
    deleteFile(index) {
      this.files.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.datauploadpage {
  padding: 10px;
  width: 100%;
}

.data-table {
  width: 100%;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #007bff; /* Bootstrap primary color */
}

.graph-select {
  max-width: 300px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
}

.b-table th,
.b-table td {
  text-align: center;
}

.b-table thead th {
  background-color: #f8f9fa;
  color: #495057;
}

.b-table tr {
  height: 3rem;
}

.file-column {
  width: 30%;
}

.size-column {
  width: 10%;
}

.graphid-column {
  width: 20%;
}

.action-column {
  width: 10%;
}
</style>
