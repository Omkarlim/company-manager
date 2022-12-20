<template>
  <div>
    <div class="card is-hoverable employee-card">
      <header class="card-header">
        <p class="card-header-title is-5 company-name" :inner-html.prop="employee | fullNameAndEmail">
        </p>
        <button class="card-header-icon has-text-link has-tooltip-top" aria-label="Deactivate User" data-tooltip="Deactivate" @click="deactivateUser()">
          <span class="icon " >
            <i class="ri-archive-line"></i>
          </span>
        </button>
        <button class="card-header-icon has-text-link has-tooltip-top " data-tooltip="Edit User" aria-label="Edit User" @click="toggleEmployeeUpdateModal()">
          <span class="icon " >
            <i class="ri-edit-box-line"></i>
          </span>
        </button>
        <button class="card-header-icon has-text-danger has-tooltip-top" data-tooltip="Delete User" aria-label="Delete User" @click="deleteUser()">
          <span class="icon ">
            <i class="ri-delete-bin-line"></i>
          </span>
        </button>
        <button class="card-header-icon has-text-danger has-tooltip-top" data-tooltip="Unlink Company" aria-label="Unlink Company" v-if="employee.company" @click="unlinkEmployee()">
          <span class="icon " >
            <i class="ri-link-unlink"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <p v-if="showCompany && employee.company">
            Company: {{ employee.company.name }}
          </p>
          <p>
            Designation : {{ employee.designation | capitalize }}
          </p>
          <p>
            Date Of Birth: {{ employee.dob | formatDate }}
          </p>
        </div>
      </div>
    </div>
    <AddEditEmployee :employee="employee" v-if="employeeUpdateModal" ></AddEditEmployee>
  </div>
</template>

<script>
import AddEditEmployee from '../components/AddEditEmployee.vue';
import {EventBus} from '../plugins/eventBus'
import moment from 'moment';

export default {
  name: 'EmployeesListItem',
  props: {
    employee: Object,
    showCompany: Boolean
  },
  components:{
    AddEditEmployee
  },
  data(){
    return {
      employeeUpdateModal: false,
      employeeObject: {}
    }
  },
  filters: {
    fullNameAndEmail: function (value) {
      var toReturn = ''
      if(value.firstName){
        toReturn += value.firstName
      }
      if(value.lastName){
        toReturn +=' ' + value.lastName
      }
      if(value.email){
        toReturn +=' ' + `(${value.email})`
      }
      return toReturn
    },
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    formatDate(val){
      return moment(new Date(val)).format('DD MMM YYYY')
    }
  },
  methods:{
    async unlinkEmployee(){
      let url = '/user/unlink/' + this.employee.id
      try {
        var response = await this.$http.put(url)
        this.$toast.success(response.data.message)
        EventBus.$emit('userUpdated')
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(){
      let url = '/user/' + this.employee.id;
      try {
        var response = await this.$http.delete(url)
        this.$toast.success(response.data.message)
        EventBus.$emit('userUpdated')
      } catch (error) {
        console.log(error)
      }
    },
    
    async deactivateUser(){
      let params = {isActive: false}
      try {
        var response = await this.$http.put('user/'+this.employee.id, params)
        this.$toast.success(response.data.message)
        EventBus.$emit('userUpdated')
      } catch (error) {
        console.log(error)
      }
    },
    toggleEmployeeUpdateModal(){
      this.employeeUpdateModal = !this.employeeUpdateModal
    },
  },
  mounted(){
    EventBus.$on('closeEmployeeModal', () => {
      this.employeeUpdateModal = false;
    })
  },
  beforeDestroy() {
    EventBus.$off('closeEmployeeModal')
  }
  
}
</script>

<style>

</style>