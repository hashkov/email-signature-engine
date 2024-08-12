<template>
  <div class="signature-preview">
    <h2>Signature Preview</h2>
    <div v-if="signature" class="content-wrapper">
      <div v-html="signature" class="signature"></div>
      <textarea
        :value="signature"
        name="markup"
        class="markup"
        readonly
        rows="20"
      ></textarea>
    </div>
    <div v-else class="no-preview">No signature generated yet.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignaturePreview',
  props: {
    signature: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.signature-preview {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 4px;
}

.content-wrapper {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.signature {
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;
}

.markup {
  border: 1px solid transparent;
  resize: none;
  border-radius: 4px;
}

.no-preview {
  color: #888;
  font-style: italic;
}
</style>
