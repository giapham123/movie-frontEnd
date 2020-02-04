<template>
  <v-app id="app">
    <div id="nav">
      <navigation></navigation>
    </div>
    <v-divider></v-divider>
    <router-view/>
  </v-app>
</template>

<script>
import navigation  from './views/Navigation'
export default {
  components: {
'navigation':navigation
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
