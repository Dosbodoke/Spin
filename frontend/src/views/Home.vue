<template>
<div id="home">
  <div>
    <h1>SPIN</h1>
    <Login></Login>
  </div>
</div>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'Home',
  components: {
    Login,
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
  }
}
</style>