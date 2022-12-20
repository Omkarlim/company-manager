<template>
  <div class="modal is-active">
    <div class="modal-background" @click="EventBus.$emit('closeEmployeeModal')"></div>
    <div class="modal-card" style="overflow: visible;">
      <header class="modal-card-head">
        <p class="modal-card-title" v-html="isEdit ? 'Update User' : 'Create User'"></p>
        <button class="delete" aria-label="close" @click="EventBus.$emit('closeEmployeeModal')"></button>
      </header>
      <section class="modal-card-body" style="overflow: visible;">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">First Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" :class="validationErrors.firstName ? 'is-danger' : ''" type="text" name="name"
                  placeholder="First Name" v-model="employeeObject.firstName">
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Last Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" name="name" placeholder="Last Name" v-model="employeeObject.lastName">
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Date of Birth</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <Datepicker type="date" :input-class="validationErrors.dob ? 'input is-danger' : 'input'"
                  v-model="employeeObject.dob"></Datepicker>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Designation</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" name="name" placeholder="Designation"
                  v-model="employeeObject.designation">
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" :disabled="isEdit" :class="{ 'is-danger': validationErrors.email }" type="text"
                  name="name" placeholder="Email Id" v-model="employeeObject.email">
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot column">
        <button class="button is-success" @click="updateUser()" v-html="isEdit ? 'Update' : 'Create'"></button>
        <button class="button" @click="EventBus.$emit('closeEmployeeModal')">Cancel</button>
        <button class="button is-danger is-pulled-right" v-if="isEdit" @click="updateUser('deactivate')">Deactivate
          User</button>
      </footer>
    </div>
  </div>
</template>
<script>
import { EventBus } from '../plugins/eventBus'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  name: 'AddEditEmployee',
  props: {
    employee: Object,
    companyId: String
  },
  components: {
    Datepicker
  },
  watch: {
    'employeeObject.email'(newValue) {
      this.validateEmail(newValue)
    },
  },
  data() {
    return {
      EventBus,
      employeeObject: {},
      isEdit: false,
      validationErrors: {}
    }
  },
  mounted() {
    if (this.employee && this.employee.id) {
      this.isEdit = true
      this.employeeObject = JSON.parse(JSON.stringify(this.employee))
    }
  },
  methods: {
    async updateUser(flag) {
      let { firstName, lastName, email, designation, dob } = this.employeeObject
      if (!firstName) {
        this.$toast.error("First Name is required.")
        return;
      }
      if (!email || this.validationErrors.email) {
        this.$toast.error("Please Enter Proper Email.")
        return;
      }
      try {
        dob = new moment(new Date(dob)).format('DD-MM-YYYY')
      } catch (err) {
        this.validationErrors.date = true;
        this.$toast.error("Invalid Date Selected.")
        return;
      }
      let params = { firstName, lastName, email, designation, dob }
      if(this.isEdit){
        delete params.email
      }
      try {
        let response;
        if (this.isEdit) {
          if (flag) {
            params = {
              isActive: false
            }
          }
          response = await this.$http.put('user/' + this.employee.id, params)
        } else {
          if (this.companyId) {
            params.company = this.companyId
          }
          response = await this.$http.post('user/', params)
        }
        this.$toast.success(response.data.message)
        EventBus.$emit('closeEmployeeModal')
        EventBus.$emit('userUpdated')
      } catch (error) {
        if (error.response.status == 409) {
          this.$toast.error("User with email already exists.")
        } else {
          this.$toast.error("A problem occured.")
        }
        console.log(error)
      }
    },
    validateEmail(value) {
      let pattern = new RegExp(/^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/g)
      this.validationErrors.email = false
      if (!value.match(pattern)) {
        this.validationErrors.email = true
        return;
      }
    },
  }

}
</script>