<template>
  <div class="template-selector">
    <h3>Select a Template</h3>
    <select v-model="selectedTemplate" @change="emitSelectedTemplate">
      <option value="">Choose a template</option>
      <option value="template1">Professional Template</option>
      <option value="template2">Minimalist Template</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TemplateSelector',
  setup(props, { emit }) {
    const selectedTemplate = ref('');

    const emitSelectedTemplate = () => {
      emit('select-template', selectedTemplate.value);
    };

    return {
      selectedTemplate,
      emitSelectedTemplate,
    };
  },
});
</script>

<style scoped>
select {
  display: block;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
