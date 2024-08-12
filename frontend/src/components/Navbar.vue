<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: {},
});
</script>

<template>
  <header>
    <div class="container">
      <RouterLink to="/">
        <h1>Email Signature Generator</h1>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped></style>
