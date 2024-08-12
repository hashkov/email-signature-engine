<template>
  <div id="app">
    <Navbar />

    <div class="pages">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'App',
});
</script>
