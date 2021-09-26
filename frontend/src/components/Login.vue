<template>
    <form @submit.prevent="login">
        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" id="username" placeholder="Your Username">
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" placeholder="Password">
        <div v-if="incorrectAuth" class="error">Incorrect username or password</div>
        <button>Login</button>
        <div>Don't have an account? Sing-up here</div>
    </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      incorrectAuth: false,
    }
  },
  methods: {
    login () {
      this.$store.dispatch('account/userLogin', {
        username: this.username,
        password: this.password
      })
      .then((data) => {
        this.$router.push({ name: "Chat"})
      })
      .catch((error) => {
        // toggle incorrectAuth to false after 4 seconds
        this.incorrectAuth = true
        setTimeout(() => {
            this.incorrectAuth = false
        }, 4000)
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;

  div {
    text-align: center;
  }

  input, button, .error {
    margin-bottom: 15px;
  }

  input {
    border: 0;
    outline: none;
    padding: 10px 0 10px 15px;
    background-color: #334756;
    color: #fff;
  }

  button {
    font-size: 1.2rem;
    color: #fff;
    border: 0;
    background-color: #FF4C29;
    padding: 1rem 0;
    cursor: pointer;
  }
}
</style>