<template>
  <div class="default-layout">
    <router-link to="/">Home</router-link>
    <router-link to="/Add">Add</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
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
