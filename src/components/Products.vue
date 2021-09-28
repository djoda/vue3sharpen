<template>
  <table class="table">
    <thead>
      <button @click="showTable = true" class="btn btn-dark mt-3 btnMr">
        Table view
      </button>
      <button @click="showTable = false" class="btn btn-dark mt-3">
        Cards
      </button>
      <label style="margin-left: 20px">Apply tax before discount</label>
      <input
        style="margin-left: 15px"
        type="checkbox"
        v-model="taxBeforeDiscount"
      />
      <label style="margin-left: 20px">Switch discount mode</label>
      <input style="margin-left: 15px" type="checkbox" v-model="additiveMode" />
      <tr v-show="showTable">
        <th scope="col">UPC</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Discount</th>
        <th scope="col">TaxRate</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody v-if="showTable">
      <tr v-for="item in $store.state.products" :key="item.id">
        <td>{{ item.UPC }}</td>
        <td>{{ item.Name }}</td>
        <td>{{ item.Price }} {{ item.Currency }}</td>
        <td>{{ item.calculateDiscount() }} {{ item.Currency }}</td>
        <td>{{ item.TaxRate }}%</td>
        <td>{{ item.calculateTotal() }} {{ item.Currency }}</td>
      </tr>
    </tbody>

    <tbody v-else>
      <div
        class="card m-3"
        v-for="item in $store.state.products"
        :key="item.id"
        style="width: 650px; display: inline-block"
      >
        <router-link :to="'/product/' + item.UPC">
          <img
            class="card-img-top"
            :src="item.Image"
            alt="Card image cap"
            style="width: 200px; height: 200px"
          />
          <div class="card-body">
            <ul class="list-group list-group-flush firstUl border-right btnLi">
              <li class="list-group-item">UPC : {{ item.UPC }}</li>
              <li class="list-group-item">Name {{ item.Name }}</li>
              <li class="list-group-item">
                Price : {{ item.Price }} {{ item.Currency }}
              </li>
            </ul>
            <ul class="list-group list-group-flush secondUl btnLi">
              <li class="list-group-item">Tax rate : {{ item.TaxRate }}%</li>
              <li class="list-group-item">
                Discount {{ item.calculateDiscount() }} {{ item.Currency }}
              </li>
              <li class="list-group-item">
                Total : {{ item.calculateTotal() }}{{ item.Currency }}
                {{ item.Currency }}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Products",
  setup() {},
  data() {
    return {
      showTable: true,
      newTaxRate: 0,
      taxBeforeDiscount: true,
      additiveMode: true,
    };
  },
  watch: {
    taxBeforeDiscount(newValue) {
      this.$store.dispatch("changeBeforeDiscount", newValue);
    },
    additiveMode(newValue) {
      this.$store.dispatch("changeDiscountMode", newValue);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.btnMr {
  margin-right: 15px;
}

.firstUl {
  position: absolute;
  left: 200px;
  top: 0;
}

.secondUl {
  position: absolute;
  left: 400px;
  top: 0;
}
.btnLi {
  list-style-type: none;
}

.card:hover {
  border: 1px solid black;
}
</style>