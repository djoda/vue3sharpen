<template>
  <div class="card cardLogin mt-3">
    <div class="card-body">
      <h5 class="card-title">Login</h5>
      <label>Username</label>
      <input type="text" class="form-control mt-2" v-model="username" />
      <label>Password</label>
      <input type="password" class="form-control mt-2" v-model="password" />
      <button @click="sendLogin" class="btn btn-primary mt-2">Login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  setup() {},
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    sendLogin() {
      axios({
        url: "http://localhost:5000/auth/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data);
          this.$router.go("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.cardLogin {
  height: max-content;
}
</style>