<template>
  <div class="personal-info-form">
    <h3>Enter Your Information</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          v-model="personalInfo.fullName"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="personalInfo.email" required />
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="personalInfo.phone" required />
      </div>
      <div class="form-group">
        <label for="company">Company:</label>
        <input type="text" id="company" v-model="personalInfo.company" />
      </div>
      <div class="form-group">
        <label for="position">Position:</label>
        <input type="text" id="position" v-model="personalInfo.position" />
      </div>
      <div class="form-group">
        <label for="logo">Upload Logo:</label>
        <input
          type="file"
          id="logo"
          @change="handleFileUpload"
          accept="image/*"
        />
      </div>
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Logo preview" />
      </div>
      <button type="submit" :disabled="isSubmitDisabled">
        Generate Signature
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import { apiService } from '@/services/api.service';
import type { IPersonalInfo } from '@/interfaces';

export default defineComponent({
  name: 'PersonalInfoForm',
  props: {
    selectedTemplate: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const personalInfo = reactive<IPersonalInfo>({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      logoUrl: '',
    });

    const imagePreview = ref('');
    const logoFile = ref<File | null>(null);
    const isSubmitDisabled = computed(
      () =>
        !props.selectedTemplate ||
        !personalInfo.fullName ||
        !personalInfo.email ||
        !personalInfo.phone
    );

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        logoFile.value = target.files[0];
        imagePreview.value = URL.createObjectURL(logoFile.value);
      }
    };

    const submitForm = async () => {
      try {
        if (logoFile.value) {
          personalInfo.logoUrl = await apiService.uploadLogo(logoFile.value);
        } else {
          console.log('No file selected');
        }

        const signature = await apiService.generateSignature(
          personalInfo,
          props.selectedTemplate
        );
        emit('signature-generated', signature);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      personalInfo,
      submitForm,
      handleFileUpload,
      imagePreview,
      isSubmitDisabled,
    };
  },
});
</script>
<style scoped>
label,
input {
  display: block;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  background: var(--primary);
  border: 0;
  color: #fff;
  padding: 10px;
  font-family: 'Poppins';
  border-radius: 4px;
  cursor: pointer;
}
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
input.error {
  border: 1px solid var(--error);
}
.image-preview {
  margin-top: 10px;
}
.image-preview img {
  max-width: 200px;
  max-height: 100px;
}
</style>
