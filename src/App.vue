<template>
  <div class="sidebar">
    <router-link to="/"
      ><button class="btn btn-primary">Show products</button></router-link
    >
    <router-link to="/discount"
      ><button class="btn btn-primary mt-3">Set discount</button></router-link
    >

    <router-link to="/upcdiscount"
      ><button class="btn btn-primary mt-3">
        Set UPC discount
      </button></router-link
    >
  </div>

  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    useStore().dispatch("getRates");
  },
  data() {
    return {};
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  min-height: 100%;
}

.sidebar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  flex-direction: column;
  width: 250px;
  min-height: 100vh;
  padding-top: 20px;
  background-color: rgb(99, 112, 112);
}

.main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: calc(100vw - 250px - 15px);
  position: absolute;
  left: 260px;
  top: 0px;
  padding-left: 15px;
  background-color: rgb(250, 250, 250);
}
</style>
