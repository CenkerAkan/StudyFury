<template>
  <DoubleInput overText="Sign up" :isSignUp="true" :isLogin="false" buttonText="Sign Up"/>
  <DoubleInput overText="Log in" :isSignUp="false" :isLogin="true" buttonText="Log in"/>
  <DoubleInput overText="Delete User" :isSignUp="false" :isLogin="false" buttonText="Delete"/>
  <QuadroInput />
</template>

<script>
import DoubleInput from './components/Double-input.vue'
import QuadroInput from './components/Quadro-input.vue'
export default {
  name: 'App',
  components: {
    DoubleInput,
    QuadroInput
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: beige;
  border-width: 3px;
  border-color: red;
}
</style>
