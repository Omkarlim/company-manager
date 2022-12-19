<template>
  <div class="box" style="background-color: #EEE;">
    <div class="columns is-fullwidth is-multiline">
      <div class="column is-12">
        <span class="title">
          Companies
        </span>
        <button class="button is-primary is-pulled-right" @click="toggleNewCompanyModal()">
          Create Company
        </button>
      </div>
      <span class="column is-6" v-for="company in companies" :key="company.id">
        <CompanyItemComponentVue :company="company" @companyDeleted="getCompanies()"></CompanyItemComponentVue>
      </span>
    </div>
    <AddEditCompanyComponent v-if="newCompanyModal"></AddEditCompanyComponent>
  </div>
</template>
<script>
import CompanyItemComponentVue from './CompanyItemComponent.vue';
import AddEditCompanyComponent from "./AddEditCompany.vue";
import {EventBus} from "../plugins/eventBus";


export default {
  name: 'CompanyListComponent',
  props: {
  },
  components: {
    CompanyItemComponentVue,
    AddEditCompanyComponent
  },
  data() {
    return {
      companies: [],
      newCompanyModal: false,
    }
  },
  methods: {
    toggleNewCompanyModal() {
      this.newCompanyModal = !this.newCompanyModal;
    },
    async getCompanies() {
      var vm = this;
      let response = await this.$http.get('/company')
      vm.companies = response.data.result
      vm.count = response.data.count
    }
  },
  async mounted() {
    this.getCompanies()
  },
  created() {
    EventBus.$on('closeCompanyModal', () => {
      this.newCompanyModal = false;
    })
    EventBus.$on('companyUpdated', () => {
      this.getCompanies()
    })
  },
  beforeDestroy() {
    EventBus.$off('closeCompanyModal')
    EventBus.$off('companyUpdated')
  }
}
</script>
<style>

</style>