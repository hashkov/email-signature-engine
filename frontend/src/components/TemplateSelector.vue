<template>
  <div class="template-selector">
    <h2>Select a Template</h2>
    <select v-model="selectedTemplate" @change="emitSelectedTemplate">
      <option value="">Choose a template</option>
      <option v-for="template in templates" :key="template" :value="template">
        {{ template }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from '../services/api.service';

export default defineComponent({
  name: 'TemplateSelector',
  setup(props, { emit }) {
    const selectedTemplate = ref('');
    const templates = ref<string[]>([]);

    const emitSelectedTemplate = () => {
      emit('select-template', selectedTemplate.value);
    };

    onMounted(async () => {
      try {
        templates.value = await apiService.getTemplates();
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    });

    return {
      selectedTemplate,
      templates,
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
