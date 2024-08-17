<template>
  <div class="modal-overlay" v-if="visible" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">&times;</button>
       <!-- <i class="fas fa-times"></i>
        <font-awesome-icon icon="times" /> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* .modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width:90%;
  max-width: 700px;
  max-height: 98%;
  overflow-y: hidden;
} */

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-height: 90vh; /* Limit maximum height to 90% of the viewport height */
  width: auto; /* Auto width to fit content */
  max-width: 700px; /* Adjust as needed */
  overflow: hidden; /* Prevent scrollbar */
  box-sizing: border-box;
}


.close-btn {
  position: absolute;
  top: 2px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 20px;
  outline: none;
  z-index: 1010; /* Ensure the close button is above other content */
}

.close-btn:hover {
  color: darkred;
}

.close-btn i {
  margin: 0;
}

@media (max-width: 600px) {
  .modal-content {
    max-width: 100%; /* Use the full width of the screen */
    max-height: 80vh; /* Adjust the height to fit smaller screens */
  }
}
</style>
