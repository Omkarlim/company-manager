<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title company-name" v-html="company.name" @click="openDetailsPage()">
        </p>
        <button class="card-header-icon has-text-link has-tooltip-top " data-tooltip="Edit Company" aria-label="Edit Company" @click="toggleNewCompanyModal()">
          <span class="icon " >
            <i class="ri-edit-box-line"></i>
          </span>
        </button>
        <button class="card-header-icon has-text-danger" aria-label="more options" @click="deleteCompany()">
          <span class="icon ">
            <i class="ri-delete-bin-line "></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <span v-html="company.address"></span>
        </div>
      </div>
    </div>
    <AddEditCompanyComponent v-if="editCompanyModal" :company="company"></AddEditCompanyComponent>
  </div>
</template>
<script>
import AddEditCompanyComponent from './AddEditCompany.vue'
import {EventBus} from "../plugins/eventBus";

export default {
  name: 'CompanyItemComponent',
  props: {
    company: Object
  },
  components:{
    AddEditCompanyComponent
  },
  data() {
    return {
      editCompanyModal: false
    }
  },
  methods: {
    toggleNewCompanyModal() {
      this.editCompanyModal = !this.editCompanyModal;
    },
    async deleteCompany() {
      let url = '/company/' + this.company.id;
      try {
        var response = await this.$http.delete(url)
        this.$toast.success(response.data.message)
        EventBus.$emit('companyUpdated')
      } catch (error) {
        this.$toast.error("Could not delete company")
        console.log(error)
      }
    },
    openDetailsPage() {
      this.$router.push('/company/' + this.company.id)

    }
  },
  mounted() {
    EventBus.$on('closeCompanyModal', () => {
      this.editCompanyModal = false;
    })
  },
  beforeDestroy() {
    EventBus.$off('closeCompanyModal')
  }
}
</script>

<style scoped>
.company-name {
  cursor: pointer;
}
.card {
  margin-bottom: 10px;
  background-color: rgb(233, 240, 255)
}
</style>