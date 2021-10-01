<template>
  <div class="sidebar">
    <router-link style="width: 100%" to="/"
      ><button class="btn btn-primary">Show products</button></router-link
    >
    <router-link style="width: 100%" to="/discount"
      ><button class="btn btn-primary mt-3">Set discount</button></router-link
    >

    <router-link style="width: 100%" to="/upcdiscount"
      ><button class="btn btn-primary mt-3">
        Set UPC discount
      </button></router-link
    >
    <button @click="deleteToken" class="btn btn-primary mt-3">Logout</button>
    <button @click="test" class="btn btn-primary mt-3">Test</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sidebar",
  methods: {
    test() {
      let chal = "Bearer " + localStorage.getItem("token");
      axios({
        url: "http://localhost:5000/home/secret",
        method: "post",
        headers: {
          Authorization: chal,
        },
      });
    },
    deleteToken() {
      localStorage.removeItem("token");
      this.$router.go("/login");
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  flex-direction: column;
  width: 250px;
  min-height: 100vh;
  padding: 20px;
  background-color: rgb(99, 112, 112);
}

.btn {
  width: 100%;
}
</style>