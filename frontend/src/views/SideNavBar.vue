<template>
  <aside class="menu" style="padding-bottom: 20px;">
    <span class="tab-item" @click="navigateTo('/home')">
      <i v-bind:class="['ri-home-line', 'menu-icon']"></i>
      <p class="menu-item-name">Dashboard</p>
    </span>
    <span class="tab-item" @click="navigateTo('/companies')">
      <i v-bind:class="['ri-organization-chart', 'menu-icon']"></i>
      <p class="menu-item-name">Companies</p>
    </span>
    <span class="tab-item" @click="navigateTo('/employees')">
      <i v-bind:class="['ri-user-line', 'menu-icon']"></i>
      <p class="menu-item-name">Employees</p>
    </span>
  </aside>
</template>
<script>
export default {
  name: 'SideNavBar',
  methods: {
    navigateTo(url) {
      this.$router.push(url)
    }
  }
}
</script>
<style>

</style>