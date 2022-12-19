<template>
  <div>
    <CompanyEmployeesList :showCompany="true"></CompanyEmployeesList>
  </div>
</template>

<script>
import CompanyEmployeesList from '../components/CompanyEmployeesList.vue';
export default {
  name: 'EmployeeDashboard',
  components: {
    CompanyEmployeesList
  }

}
</script>