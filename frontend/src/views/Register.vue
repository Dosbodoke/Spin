<template>
  <div id="register">
    <div>
      <h1>SPIN</h1>
      <form @submit.prevent="Register">
        <label for="username">Username</label>
        <input  v-model="username"
                type="text"
                name="username"
                id="username"
                placeholder="Your Username"
        >

        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" id="password" placeholder="Password">
        <label for="password2">Password Confirmation</label>
        <input  v-model="password2" 
                type="password" 
                name="password2" 
                id="password2" 
                placeholder="Repeat Password" 
                @input="checkPassword" 
                @keypress.enter="submit"
        >
        <div v-if="passwordMatch == false" class="error">Passwords don't match.</div>

        <div v-if="error.active" class="error">{{ error.errorMessage }}</div>
        <button>Create Account</button>
        <div>Already have an account? <router-link to="/" class="router__link">Log-in here</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
            error: {
              active: false,
              errorMessage: ''
            },
            passwordMatch: true,
            username: '',
            password: '',
            password2: ''
        }
    },
    methods: {
        Register() {
          if ( [this.username, this.password, this.password2].some(item => item === '') ) {
            this.error.active = true;
            this.error.errorMessage = 'Fill all fields'
            setTimeout(() => {this.error = {active: false, errorMessage: ''}}, 3000)
            return
          }
          if ( this.passwordMatch == false) {
            return
          }
          this.$store.dispatch('account/Register', {
            username: this.username,
            password: this.password
          })
            .then(data => {
              alert("Account created successfully, click 'ok' and go to the login page.")
              this.$router.push({ name: "Home"})
            })
            .catch(error => {
              if (error.response) {
                this.error.active = true
                this.error.errorMessage = 'This username is already being used.'
                setTimeout(() => {this.error = {active: false, errorMessage: ''}}, 3000)
              } else {
                alert('Unable to communicate with the server, check your internet connection or try again later.')
              }
           })
        },
        checkPassword() {
          this.password === this.password2 ? this.passwordMatch = true : this.passwordMatch = false;
        },
    }
}
</script>

<style lang="scss" scoped>
#register {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &>div {
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