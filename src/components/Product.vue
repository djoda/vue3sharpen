<template>
  <div v-if="ratesLoaded" class="card product">
    <div class="card-body">
      <img :src="product.Image" class="card-img-top" alt="..." />
      <div>
        <ul class="list-group list-group-flush ml-3">
          <li class="list-group-item">UPC : {{ product.UPC }}</li>
          <li class="list-group-item">Name {{ product.Name }}</li>
          <li class="list-group-item">
            Price : {{ product.Price.toFixed(2) }} {{ product.Currency }}
          </li>
          <li class="list-group-item">Tax rate : {{ product.TaxRate }}%</li>
          <li class="list-group-item">
            Discount {{ product.calculateDiscount() }} {{ product.Currency }}
          </li>
          <li class="list-group-item">
            Total : {{ product.calculateTotal() }} {{ product.Currency }}
          </li>
        </ul>

        <ul id="divExpenses" class="list-group list-group-flush ml-3">
          <li class="list-group-item">Expenses:</li>
          <li
            class="list-group-item"
            v-for="(expense, index) in this.$store.getters.getExpensesByUPC(
              product.UPC
            )"
            :key="index"
          >
            Description: {{ expense.Description }} Amount: {{ expense.Amount
            }}{{ expense.AmountType }}
          </li>
        </ul>
      </div>

      <div id="btnDiv">
        <button
          id="newTaxBtn"
          class="btn btn-primary"
          data-bs-target="#myModal"
          data-bs-toggle="modal"
          @click="newTaxRate = product.TaxRate"
        >
          New tax rate
        </button>
        <button
          class="btn btn-primary"
          data-bs-target="#expensesModal"
          data-bs-toggle="modal"
        >
          Add expenses
        </button>
        <button
          class="btn btn-primary"
          data-bs-target="#capModal"
          data-bs-toggle="modal"
        >
          Add cap
        </button>
        <label class="d-block select">Currency: </label>
        <select v-model="curr" class="form-control select">
          <option v-for="curr in $store.state.currencies" :key="curr">
            {{ curr }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New tax rate</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label>Set new tax rate for product</label>
          <input
            id="newTaxRateInput"
            type="text"
            class="form-control mt-2"
            v-model.number="newTaxRate"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            id="newTaxRateBtnSave"
            type="button"
            class="btn btn-primary"
            @click="updateProduct"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="expensesModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Expense</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label>Description</label>
          <input type="text" class="form-control mt-2" v-model="description" />
          <label>Set new tax rate for product</label>
          <input
            type="text"
            class="form-control mt-2"
            v-model.number="amount"
          />
          <label>Amount type</label>
          <select class="form-control" v-model="amountType">
            <option value="%">%</option>
            <option value="$">$</option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addExpense">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="capModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cap</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label>Amount</label>
          <input type="text" class="form-control mt-2" v-model="cap" />
          <label>Cap type</label>
          <select class="form-control" v-model="capType">
            <option value="%">%</option>
            <option value="$">$</option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addCap">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore, mapState } from "vuex";
import { useRoute } from "vue-router";
import Expenses from "@/store/Expenses.js";

export default {
  name: "Product",
  setup() {
    let store = useStore();
    let product = store.getters.getByUPC(Number(useRoute().params.upc));

    return {
      product,
    };
  },
  data() {
    return {
      newTaxRate: 20,
      amount: 0,
      description: "",
      amountType: "%",
      cap: 0,
      capType: "%",
      curr: "",
    };
  },
  watch: {
    curr(newValue) {
      if (this.$store.getters.getCurrencyRate(newValue) !== undefined) {
        this.product.Price =
          this.product.PriceUSD * this.$store.getters.getCurrencyRate(newValue);
        this.product.Currency = newValue;
        this.$store.dispatch("updateProduct", this.product);
      }
    },
  },
  methods: {
    updateProduct() {
      this.product.TaxRate = this.newTaxRate;
      this.$store.dispatch("updateProduct", this.product);
    },
    addExpense() {
      if (this.amount > 0) {
        this.$store.dispatch(
          "addExpense",
          new Expenses(
            this.description,
            this.amount,
            this.amountType,
            this.product.UPC
          )
        );
      }
      this.amount = 0;
      this.description = "";
    },
    addCap() {
      this.product.Cap = this.cap;
      this.product.CapType = this.capType;
      this.$store.dispatch("updateProduct", this.product);
    },
  },
  mounted() {
    this.curr = this.product.Currency;
  },
  computed: {
    ...mapState(["ratesLoaded"]),
  },
};
</script>

<style scoped>
.product {
  display: flex;
  flex: 0.3 1 500px;
  height: 50vh;
  margin-top: 50px;
}

.product img {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 5px;
  left: 35px;
}

.product ul {
  position: absolute;
  top: 215px;
  left: 35px;
}

#btnDiv {
  position: absolute;
  top: 15px;
  left: 260px;
}

#btnDiv button {
  margin-left: 10px;
}

#divExpenses {
  position: absolute;
  top: 215px;
  left: 260px;
}

.select {
  margin: 10px;
}
</style>