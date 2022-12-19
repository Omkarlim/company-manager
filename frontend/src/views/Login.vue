<template>
  <div class="column is-4 is-offset-4">
    <h1 class="title">
      LOGIN TO YOUR ACCOUNT
    </h1>
    <div class="box">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="e.g. alex@example.com">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="********">
        </div>
      </div>
      <button class="button is-primary" @click="login()">Sign in</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'LogIn',
  data() {
    return {
    }
  },
  methods: {
    async login() {
      let response = await this.$http.post('/login', {
        email: "admin@example.com",
        password: "abc123"
      })
      console.log(response.data)
    }
  }
}
</script>
<style>

</style>