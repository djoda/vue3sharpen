<template>
  <div class="mt-4">
    <div class="mt-2"><label>Cap</label></div>
    <div class="mt-2">
      <input class="form-control" type="text" v-model="newCap" />
    </div>
    <div class="mt-2">
      <button
        @click="$store.dispatch('setCap', newCap)"
        class="btn btn-primary"
      >
        Change
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cap",
  data() {
    return {
      newCap: 0,
    };
  },
  mounted() {
    this.newCap = this.$store.state.cap;
  },
};
</script>

<style scoped>
</style>