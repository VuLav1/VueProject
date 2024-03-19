<template>
    <div class="home">
      <ProductDetail msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import ProductDetail from '@/components/ProductDetail.vue'
  
  export default {
    name: 'ProductsView',
    components: {
        ProductDetail
    }
  }
  </script>
  