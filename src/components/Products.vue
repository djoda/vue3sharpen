<template>
  <table class="table">
    <thead>
      <button @click="showTable = true" class="btn btn-dark mt-3 btnMr">
        Table view
      </button>
      <button @click="showTable = false" class="btn btn-dark mt-3">
        Cards
      </button>
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
        <td>{{ item.Price }}</td>
        <td>{{ item.calculateDiscount() }}</td>
        <td>{{ item.TaxRate }}</td>
        <td>{{ item.calculateTotal() }}</td>
      </tr>
    </tbody>

    <tbody v-else>
      <div
        class="card m-3"
        v-for="item in $store.state.products"
        :key="item.id"
        style="width: 650px; display: inline-block"
      >
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
            <li class="list-group-item">Price : {{ item.Price }}$</li>
            <li>
              <button class="btn btn-primary m-2 list-group-item">
                New tax rate
              </button>
            </li>
          </ul>
          <ul class="list-group list-group-flush secondUl btnLi">
            <li class="list-group-item">Tax rate : {{ item.TaxRate }}%</li>
            <li class="list-group-item">
              Discount {{ item.calculateDiscount() }}$
            </li>
            <li class="list-group-item">
              Total : {{ item.calculateTotal() }}$
            </li>
            <li>
              <button class="btn btn-primary m-2 list-group-item">
                Add expenses
              </button>
            </li>
          </ul>
        </div>
      </div>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      showTable: true,
    };
  },
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
</style>