<template>
<div id="home">
  <div>
    <h1>SPIN</h1>
    <form @submit.prevent="login">
        <label for="username">Username</label>
        <input v-model="username" type="text" name="username" id="username" placeholder="Your Username">
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" placeholder="Password">
        <div v-if="incorrectAuth" class="error">Incorrect username or password</div>
        <PrimaryButton>Login</PrimaryButton>
        <div>
          <p>Don't have an account?</p>
          <router-link class="router__link" to='/register'>Register here</router-link>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue"

export default {
  name: 'Home',
  components: {
    PrimaryButton,
  },
  data () {
    return {
      username: '',
      password: '',
      incorrectAuth: false,
    }
  },
  methods: {
    login () {
      this.$store.dispatch('account/Login', {
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
}
</script>

<style lang="scss" scoped>
#home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background-color: #2C394B;
    width: 100%;
    max-width: 350px;
    height: 100%;
    max-height: 500px;
    padding: 15px;

    h1 {
      text-align: center;
    }

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

      .router__link {
        color: #FF4C29;
        text-decoration: none;
      }
    }
  }
}
</style>