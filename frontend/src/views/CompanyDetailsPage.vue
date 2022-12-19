<template>
  <div>
    <span v-if="isLoading">
      Loading
    </span>
    <span v-else>
      <CompanyDetailsComponent :company-details="companyDetails" :api-key="apiKey"></CompanyDetailsComponent>
      <company-employees-list :company-id="options.id"></company-employees-list>
    </span>
  </div>
</template>
<script>
// import _ from 'lodash';
import CompanyDetailsComponent from  '../components/CompanyDetailsComponent.vue'
import CompanyEmployeesList from '../components/CompanyEmployeesList.vue';

export default {
  name: "CompanyDetailsView",
  props: {},
  data() {
    return {
      options: {},
      companyDetails: {},
      companyEmployees: [],
      apiKey:'',
      isLoading: true
    }
  },
  components:{
    CompanyDetailsComponent,
    CompanyEmployeesList
  },
  methods: {
    async fetchCompany() {
      let id = this.options.id;
      try {
        let response = await this.$http.get(`/company/${id}`)
        this.companyDetails = response.data.data
        this.apiKey = response.data.googleAPIKey
      } catch (error) {
        this.$router.push('/home')
      }
    },
  },
  mounted() {
    this.isLoading=  true
    this.options = this.$route.params;
    this.fetchCompany()
    this.isLoading= false
  }

}
</script>

<style>

</style>