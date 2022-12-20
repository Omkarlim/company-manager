<template>
  <div class="box" style="background-color: #EEE;">
    <div class="columns is-fullwidth is-multiline">
      <div class="column is-12">
        <span class="title">
          Employees
        </span>
        <button class="button is-primary is-pulled-right" @click="toggleEmployeeCreateModal()">
          Create Employee
        </button>
        <button class="button is-link is-pulled-right" v-if="companyId" @click="toggleEmployeeLinkModal()"
          style="margin-right:5px">
          Link Employee
        </button>
        
      </div>
      <div class="column is-12 is-fullwidth">
        <label class="checkbox">
          <input type="checkbox" v-model="showArchived">
          Only Show Archived Employees
        </label>
      </div>
      <span class="column is-6" v-for="employee in employees" :key="employee.id">
        <EmployeeListItem :employee="employee" :showCompany="showCompany" @userDeleted="fetchCompanyEmployees()"
          @userUpdated="fetchCompanyEmployees()"></EmployeeListItem>
      </span>
    </div>
    <AddEditEmployee v-if="showCreateModal" :companyId="companyId"></AddEditEmployee>
    <div class="modal is-active" v-if="showLinkModal">
      <div class="modal-background" @click="toggleEmployeeLinkModal()"></div>
      <div class="modal-card" style="min-height: 500px;">
        <header class="modal-card-head">
          <p class="modal-card-title"> Link Employee </p>
          <button class="delete" aria-label="close" @click="toggleEmployeeLinkModal()"></button>
        </header>
        <section class="modal-card-body">
          <vue-multiselect v-model="employeesToLink" :options="allEmployees" :searchable="true" :multiple="true"
            track-by="id" :custom-label="customLabel" placeholder="Employees to link"></vue-multiselect>
        </section>
        <footer class="modal-card-foot" style="display: flex; ">
          <button class="button is-success" @click="linkEmployees()">Link</button>
          <button class="button" @click="toggleEmployeeLinkModal()">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {EventBus} from '../plugins/eventBus'

import EmployeeListItem from './EmployeeListItem.vue';
import AddEditEmployee from '../components/AddEditEmployee.vue';
import VueMultiselect from 'vue-multiselect'


export default {
  name: 'CompanyEmployeesList',
  components: {
    EmployeeListItem,
    AddEditEmployee,
    VueMultiselect
  },
  props: {
    companyId: String,
    showCompany: Boolean
  },
  data() {
    return {
      skip: 0,
      limit: 10,
      employees: [],
      showCreateModal: false,
      showLinkModal: false,
      showArchived: false,
      employeesToLink: '',
      allEmployees: []
    }
  },
  watch:{
    showArchived(){
      this.fetchCompanyEmployees()
    }
  },
  methods: {
    customLabel({ firstName, lastName, company }) {
      let toReturn = `${firstName}`
      if (lastName) {
        toReturn += ` ${lastName}`
      }
      if (company && company.name) {
        toReturn += ` (${company.name})`
      }
      return toReturn
    },
    async createEmployee() {
      try {
        var response = await this.$http.post('/user', {})
        this.$toast.success(response.data.message)
        this.fetchCompanyEmployees()
      } catch (error) {
        console.log(error)
      }
    },
    async fetchCompanyEmployees() {
      let params = {
        skip: this.skip,
        limit: this.limit,
        company: this.companyId,
        archived: this.showArchived
      }
      try {
        var response = await this.$http.get('/user', { params: params })
        this.employees = response.data.results
      } catch (err) {
        console.log(err)
      }
    },
    toggleEmployeeCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    toggleEmployeeLinkModal() {
      this.employeesToLink = []
      this.showLinkModal = !this.showLinkModal;
    },
    async linkEmployees() {
      let url = '/company/link/' + this.companyId
      let employeesToLink = _.map(this.employeesToLink, (val)=> val.id)
      try {
        var response =  await this.$http.put(url,{employeeIds :employeesToLink})
        this.$toast.success(response.data.message)
        this.showLinkModal = false
        this.fetchCompanyEmployees()
      }catch(err){
        console.log(err)
      }
    }
  },
  created() {
    this.fetchCompanyEmployees()
  },
  async mounted() {
    let params = {
      limit: 100,
      skipCompany: this.companyId
    }
    try {
      var response = await this.$http.get('/user', { params: params })
      this.allEmployees = response.data.results
    } catch (err) {
      console.log(err)
    }
    EventBus.$on('closeEmployeeModal', () => {
      this.showCreateModal = false;
    })
    EventBus.$on('userUpdated', () => {
      this.fetchCompanyEmployees();
    })
  }
}
</script>

<style>

</style>