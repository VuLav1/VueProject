<template>
  <div class="">
    <ManageOrder msg="Welcome to Your Vue.js App" />
  </div>
</template>
  
  <script>
// @ is an alias to /src
import ManageOrder from "@/components/ManageOrder.vue";

export default {
  name: "UserCreateView",
  components: {
    ManageOrder,
  },
};
</script>