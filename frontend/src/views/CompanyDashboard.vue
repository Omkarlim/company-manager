<template>
  <div>
    <CompaniesListComponent ></CompaniesListComponent>
  </div>
</template>
<script>
import CompaniesListComponent from "../components/CompanyListComponent.vue";

export default {
  name: 'DashBoard',
  components: {
    CompaniesListComponent,
  },
  data() {
    return {
    }
  },
}
</script>
<style>

</style>