<template>
  <div class="default-layout">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'DefaultLayout',
  components: {
    Navbar
  }
}
</script>


<style lang="scss" scoped>
  :global(#app) {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .default-layout {
    margin-top: 60px;
  }
</style>
