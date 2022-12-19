<template>
  <div class="modal is-active">
    <div class="modal-background" @click="EventBus.$emit('closeCompanyModal')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" v-html="isEdit ? 'Update Company' : 'Create Company'"></p>
        <button class="delete" aria-label="close" @click="EventBus.$emit('closeCompanyModal')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Company Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" name="name" placeholder="Company Name" v-model="companyObject.name">
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Company Address</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Company Address" v-model="companyObject.address"></textarea>
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot column">
        <button class="button is-success" @click="updateCompany()" v-html="isEdit ? 'Update' : 'Create'"></button>
        <button class="button" @click="EventBus.$emit('closeCompanyModal')">Cancel</button>
      </footer>
    </div>
  </div>
</template>
<script>
import {EventBus} from "../plugins/eventBus";

export default {
  name: 'AddEditCompany',
  props: {
    company: Object
  },
  data() {
    return {
      EventBus,
      companyObject: {},
      isEdit: false
    }
  },
  mounted() {
    if (this.company && this.company.id) {
      this.isEdit = true
      this.companyObject = JSON.parse(JSON.stringify(this.company))
    }
  },
  methods: {
    async updateCompany() {
      let { name, address } = this.companyObject
      let params = { name, address }
      try {
        let response;
        if (this.isEdit) {
          response = await this.$http.put('/company/' + this.companyObject.id, params)
        } else {
          response= await this.$http.post('/company', params)
        }
        this.$toast.success(response.data.message)
        EventBus.$emit('closeCompanyModal')
        EventBus.$emit('companyUpdated')
      } catch (error) {
        this.$toast.error("Could not complete request")
        console.log(error)
      }
    },
  }

}
</script>