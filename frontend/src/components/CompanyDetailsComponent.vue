<template>
  <div class="columns is-fullwidth">
    <div class="column is-7" style="min-height: 300px">
      <h1 class="title" v-html="companyName">
      </h1>
      <br>
      <p>Address:</p>
      <span class="subtitle" v-html="companyAddress">
      </span>
    </div>
    <!-- Show Map Location here -->
    <div class="column is-5" style="padding: 10px" v-if="apiKey">
      <iframe width="100%" height="100%" style="border:1px solid black" loading="lazy" allowfullscreen
        referrerpolicy="no-referrer-when-downgrade" :src="location">
      </iframe>

    </div>
  </div>
</template>

<script>

export default {
  name: 'CompanyDetailsComponent',
  props: {
    companyDetails: {},
    apiKey: String
  },
  components: {
  },
  computed: {
    companyName() {
      return this.companyDetails.name || 'Unknown';
    },
    companyAddress() {
      return this.companyDetails.address || 'Unknown';
    },
    companyLocation() {
      return this.companyDetails.coordinates || '';
    },
    location() {
      let baseUrl = `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.companyLocation || this.companyName || this.companyAddress}`
      return baseUrl;
    }
  }
}

</script>

<style>

</style>