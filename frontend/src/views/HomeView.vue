<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import TemplateSelector from '@/components/TemplateSelector.vue';
import PersonalInfoForm from '@/components/PersonalInfoForm.vue';
import SignaturePreview from '@/components/SignaturePreview.vue';
import type { IPersonalInfo } from '@/interfaces';

export default defineComponent({
  name: 'HomeView',
  components: {
    TemplateSelector,
    PersonalInfoForm,
    SignaturePreview,
  },
  setup() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const selectedTemplate = ref<string>('');
    const generatedSignature = ref<string>('');
    const uploadedImageUrl = ref<string>('');

    const generateSignature = async (personalInfo: IPersonalInfo) => {
      try {
        const response = await axios.post(`${apiUrl}/api/signatures/generate`, {
          templateName: selectedTemplate.value,
          personalInfo,
        });

        generatedSignature.value = response.data.signature;
      } catch (error) {
        console.error('Failed to generate signature:', error);
      }
    };

    const handleImageUploaded = (imageUrl: string) => {
      console.log(imageUrl);
      uploadedImageUrl.value = imageUrl;
    };

    return {
      selectedTemplate,
      generatedSignature,
      generateSignature,
      handleImageUploaded,
    };
  },
});
</script>

<template>
  <main class="home">
    <signature-preview :signature="generatedSignature" />
    <div class="signature-configuration">
      <template-selector @select-template="selectedTemplate = $event" />
      <personal-info-form @submit-info="generateSignature" />
    </div>
  </main>
</template>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
}
</style>
