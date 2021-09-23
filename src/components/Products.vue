<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Category</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in $store.state.products" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.title }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.category }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Products",
  setup() {},
  mounted() {
    this.$store.commit("addPost", "asdsad");
  },
  computed: {
    ...mapState(["posts"]),
  },
};
</script>

<style scoped>
</style>