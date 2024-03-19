<template>
  <nav class="sidebar" v-if="$store.state.user">
    <router-link class="sidebar-menu" active-class="active" to="/"
      >Home</router-link
    >
    <router-link class="sidebar-menu" active-class="active" to="/add"
      >Order</router-link
    >
    <router-link class="sidebar-menu" active-class="active" to="/chatview">ChatView</router-link>
    <router-link class="sidebar-menu" active-class="active" to="/products">Products</router-link>
    <button class="login" @click="$store.dispatch('logout')">Logout</button>
  </nav>
  <div class="left-sidebar" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
};
</script>

<style>
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}
.sidebar .sidebar-menu {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
.left-sidebar {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  .left-sidebar {
    margin-left: 0;
  }
}
.active {
  background-color: #04aa6d;
  color: white;
}
.sidebar a:active {
  background-color: #04aa6d;
  color: white;
}
.sidebar a:hover {
  background-color: #555;
  color: white;
}
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
