<template>
  <div class="mt-4">
    <div class="mt-2"><label>Universal Discunt</label></div>
    <div class="mt-2">
      <input
        id="udInput"
        class="form-control"
        type="text"
        v-model.number="ud"
      />
    </div>
    <div class="mt-2">
      <button @click="updateUd" class="btn btn-primary">Change</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Discount",
  setup() {
    const ud = useStore().state.universalDiscount;
    return {
      ud,
    };
  },
  methods: {
    updateUd() {
      this.toastMessage = "Universal discount has been set to " + this.ud + "%";
      this.$store.commit("setUniversalDiscount", this.ud);
      this.showToast = true;
    },
  },
};
</script>

<style scoped>
</style>