<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/Add">Add</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss" scoped>
  .navbar {
    & > a + a {
      margin-left: 15px;
    }
  }
</style>
