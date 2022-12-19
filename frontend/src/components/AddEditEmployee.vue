<template>
  <div class="modal is-active">
    <div class="modal-background" @click="EventBus.$emit('closeEmployeeModal')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-html="isEdit ? 'Update User' : 'Create User'"></p>
        <button class="delete" aria-label="close" @click="EventBus.$emit('closeEmployeeModal')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">First Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" name="name" placeholder="First Name"
                  v-model="employeeObject.firstName">
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
                <input class="input" type="text" name="name" placeholder="Date of Birth" v-model="employeeObject.dob">
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
                <input class="input" type="text" name="name" placeholder="Email Id" v-model="employeeObject.email">
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
import {EventBus} from '../plugins/eventBus'

export default {
  name: 'AddEditEmployee',
  props: {
    employee: Object,
    companyId: String
  },
  data() {
    return {
      EventBus,
      employeeObject: {},
      isEdit: false
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
      let params = { firstName, lastName, email, designation, dob }
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
        this.$toast.error("Could Not Process Request")
        console.log(error)
      }
    },
  }

}
</script>