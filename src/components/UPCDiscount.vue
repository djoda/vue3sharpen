<template>
  <div class="mt-4">
    <div class="mt-2"><label>Product UPC</label></div>
    <div class="mt-2">
      <select class="form-control" v-model="UPC">
        <option disabled value="">Select product UPC</option>
        <option
          v-for="product in $store.state.products"
          :key="product.UPC"
          :value="product.UPC"
        >
          {{ product.UPC }}
        </option>
      </select>
    </div>
    <div class="mt-2"><label>Discount</label></div>
    <div class="mt-2">
      <input class="form-control" type="text" v-model.number="UPCDiscount" />
    </div>
    <div class="mt-2">
      <button
        @click="
          $store.dispatch('updateUPCDiscount', {
            UPC: UPC,
            UPCDiscount: UPCDiscount,
          })
        "
        class="btn btn-primary"
      >
        Set discount
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UPCDiscount",
  data() {
    return {
      UPCDiscount: 0,
      UPC: 0,
    };
  },
};
</script>

<style scoped>
</style>