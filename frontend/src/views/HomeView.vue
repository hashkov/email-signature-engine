<script lang="ts">
import { defineComponent, ref } from 'vue';
import TemplateSelector from '@/components/TemplateSelector.vue';
import PersonalInfoForm from '@/components/PersonalInfoForm.vue';
import SignaturePreview from '@/components/SignaturePreview.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TemplateSelector,
    PersonalInfoForm,
    SignaturePreview,
  },
  setup() {
    const selectedTemplate = ref<string>('');
    const generatedSignature = ref<string>('');
    const error = ref<string>('');

    const handleSignatureGenerated = (signature: string) => {
      generatedSignature.value = signature;
      error.value = '';
    };

    const handleError = (errorMessage: string) => {
      error.value = errorMessage;
      generatedSignature.value = '';
    };

    return {
      selectedTemplate,
      generatedSignature,
      error,
      handleSignatureGenerated,
      handleError,
    };
  },
});
</script>

<template>
  <main class="home">
    <signature-preview :signature="generatedSignature" />
    <div class="signature-configuration">
      <template-selector @select-template="selectedTemplate = $event" />
      <personal-info-form
        :selectedTemplate="selectedTemplate"
        @signature-generated="handleSignatureGenerated"
      />
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
