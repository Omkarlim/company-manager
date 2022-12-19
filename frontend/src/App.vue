<template>
  <div>
    <nav-bar></nav-bar>
    <div class="columns is-fullheight is-marginless">
      <div class="column sidebar" style="padding: 0; max-width: 20%">
        <side-nav-bar></side-nav-bar>
      </div>
      <div class="column">
        <div class="columns is-multiline">
          <div class="column is-12" id="router-view">
            <router-view :key="$route.path"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './views/NavBar.vue';
import SideNavBar from './views/SideNavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    SideNavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
