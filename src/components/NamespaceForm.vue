<template>
  <div v-if="isVisible" class="namespace-form-overlay">
    <div class="namespace-form-dialog">
      <button class="close-button" @click="closeForm">×</button>
      <form @submit.prevent="handleSubmit" class="namespace-form">
        <h2 class="form-title">Create Namespace</h2>

        <div class="input-group">
          <label for="namespace" class="input-label">Namespace</label>
          <input 
            type="text" 
            id="namespace" 
            v-model="namespace" 
            placeholder="Enter your namespace" 
            class="input-field" 
            required 
          />
        </div>

        <button type="submit" class="submit-button">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      namespace: '',
    };
  },
  methods: {
    async handleSubmit() {
      const payload = {
        namespace: this.namespace,
      };
      try {
        const response = await axios.post('http://localhost:5009/create_namespacenew', payload,
        {
           headers: {
          'Content-Type': 'application/json'
        }
      });
          // Extract only the name and url properties
        const namespaceData = {
          name: response.data.name,
          url: response.data.url,
        };
       console.log ("NamespaceC",namespaceData) 
        // Emit the extracted data to the parent component
        this.$emit('namespaceCreated', namespaceData);
      } catch (error) {
        console.error('Error creating namespace:', error);
      }
    },
    closeForm() {
      this.$emit('update:isVisible', false);
    },
  },
};
</script>

<style scoped>
.namespace-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.namespace-form-dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.form-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
