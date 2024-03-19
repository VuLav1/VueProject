<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <Chat msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Chat from '@/components/Chat.vue'
  
  export default {
    name: 'HomeView',
    components: {
        Chat
    }
  }
  </script>
  