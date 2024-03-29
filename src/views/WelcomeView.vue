<template>
  <div class="welcome container">
    <div v-if="!Login">
      <SingupComp />
      <p>Already have an Account? <span @click="Login=!Login">Login</span> </p>
    </div>
    <div v-else>
      <LoginComp ></LoginComp>
      <p>Don't you have an Account? <span @click="Login=!Login">Signup</span> </p>
    </div>
  </div>
</template>

<script>
import SingupComp from '../components/SingupComp.vue'
import LoginComp from '../components/LoginComp.vue'
import { ref } from 'vue'

export default {
  name: 'welcomeView',
  components: { SingupComp, LoginComp },
  setup() {
    const Login = ref(true);

    return { Login };
  }
}
</script>
<style>
.welcome{
  text-align: center;
  padding: 20px auto;
}
.welcome label{
}
.welcome form{
  width: 300px;
  margin: 20px 0 10px;
}
.welcome input{
  
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #ddd;
  outline: none;
  color: #777;
  margin: 10px auto;
  height: 30px;
  width: 200px;
  
}
.welcome button {
  display: block;
  margin-bottom: 10px; 
  margin: 10px auto;
  cursor: pointer;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
span{
  text-decoration: underline;
  text-decoration-color: blue;
  font-size: large;
  font-style: bold;
  cursor: pointer;
}
.error{
  color: red;
}

</style>
