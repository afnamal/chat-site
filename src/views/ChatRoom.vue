<template>
  <div>
    <p>Chat Room</p>
    <NavbarComp/>
    <ChatForm/>
  </div>
</template>

<script>
import NavbarComp from '../components/NavbarComp.vue'
import ChatForm from '../components/ChatForm.vue'
export default {
name:'ChatRoom',
components:{NavbarComp,ChatForm}
}
</script>

<style>

</style>