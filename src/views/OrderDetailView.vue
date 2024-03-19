<template>
    <div class="">
      <OrderDetail msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import OrderDetail from '@/components/OrderDetail.vue'
  
  export default {
    name: 'OrderDetailView',
    components: {
      OrderDetail
    }
  }
  </script>