<template>
  <Sidebar v-if="logedIn" />
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
  setup() {
    let logedIn = false;
    if (localStorage.getItem("token")) {
      logedIn = true;
    } else logedIn = false;
    useStore().dispatch("getRates");

    return {
      logedIn,
    };
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
