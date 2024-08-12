<template>
  <div id="app">
    <Navbar />

    <div class="pages">
      <RouterView />
    </div>
    <Loader />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Loader from './components/Loader.vue';

export default defineComponent({
  name: 'App',
  components: {
    Loader,
    Navbar,
  },
});
</script>
