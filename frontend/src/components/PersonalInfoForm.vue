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
      <button type="submit">Generate Signature</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PersonalInfoForm',
  setup(props, { emit }) {
    const personalInfo = reactive({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      logoUrl: '',
    });

    const imagePreview = ref('');
    const logoFile = ref<File | null>(null);

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        logoFile.value = target.files[0];
        imagePreview.value = URL.createObjectURL(logoFile.value);
      }
    };

    const submitForm = async () => {
      if (personalInfo.fullName && personalInfo.email && personalInfo.phone) {
        if (logoFile.value) {
          const formData = new FormData();
          formData.append('logo', logoFile.value);

          try {
            const response = await axios.post(
              'http://localhost:4000/api/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            personalInfo.logoUrl = response.data.url;
          } catch (error) {
            console.error('Error uploading logo:', error);
          }
        }

        emit('submit-info', { ...personalInfo });
      }
    };

    return {
      personalInfo,
      submitForm,
      handleFileUpload,
      imagePreview,
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
