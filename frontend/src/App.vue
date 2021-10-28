<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"> 
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}

</script>


<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #082032;
  color: #fff;
  height: 100vh;

  .error {
    font-size: .9rem;
    color: rgb(220, 52, 52);
  }
}
</style>
