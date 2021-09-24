<template>
  <div class="mt-4">
    <div class="mt-2"><label>Universal Discunt</label></div>
    <div class="mt-2">
      <input class="form-control" type="text" v-model="ud" />
    </div>
    <div class="mt-2">
      <button @click="updateUd" class="btn btn-primary">Change</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { inject } from "vue";

export default {
  name: "Discount",
  setup() {
    const ud = useStore().state.universalDiscount;
    const showToast = inject("showToast");
    const toastMessage = inject("toastMessage");
    return {
      ud,
      showToast,
      toastMessage,
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