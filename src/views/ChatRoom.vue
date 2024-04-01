<template>
  <div>
    <p>Chat Room</p>
    <NavbarComp/>
    <ChatWindow/>
    <ChatForm/>
  </div>
</template>

<script>
import NavbarComp from '../components/NavbarComp.vue'
import ChatForm from '../components/ChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
export default {
name:'ChatRoom',
components:{NavbarComp,ChatForm,ChatWindow}
}
</script>

<style>

</style>