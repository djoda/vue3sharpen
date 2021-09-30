import { createStore } from 'vuex'
import { Product } from "./Product"
import saveToLocalStorage from "./Plugins/webStorage"
import Expenses from './Expenses';

export default createStore({
  state: {
    mockProducts: [],
    products:
      [
        new Product("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
        new Product("Product1", 111, 4565, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
        new Product("Product2", 222, 3622, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"),
        new Product("Product3", 333, 441565, "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"),
        new Product("Product4", 444, 56, "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg")
      ],
    universalDiscount: 0,
    expenses: [new Expenses("Transport", 500, "$", 111)],
    beforeDiscount: true,
    additiveMode: true,
    apiKey: "6ca79beb46-556a793292-r0507o",
    rates: [],
    currencies: [],
    ratesLoaded: false
  },
  getters: {
    getByUPC: (state) => (UPC) => {
      return state.products.find(e => e.UPC === UPC);
    },
    getExpensesByUPC: (state) => (UPC) => {
      return state.expenses.filter(e => e.ProductUPC === UPC);
    },
    getCurrencyRate: (state) => (curr) => {
      if (state.rates.results !== undefined) {
        return state.rates.results[String(curr)];
      }
      else {
        state.ratesLoaded = false;
        return 1;
      }
    }
  },
  mutations: {
    addProduct(state, item) {
      state.products.push(item);
    },
    updateProduct(state, payload) {
      state.products = [...state.products.filter(e => e.UPC != payload.UPC), payload];
    },
    setUniversalDiscount(state, ud) {
      state.universalDiscount = ud;
    },
    setMockProducts(state, items) {
      state.mockProducts = items;
    },
    addExpense(state, payload) {
      state.expenses.push(payload);
    },
    changeBeforeDisocunt(state, payload) {
      state.beforeDiscount = payload;
    },
    changeDiscountMode(state, payload) {
      state.additiveMode = payload;
    },
    setRates(state, payload) {
      state.rates = payload;
    },
    setCurrencies(state, payload) {
      state.currencies = payload;
    },
    setRatesLoaded(state, payload) {
      state.ratesLoaded = payload;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const products = await fetch("https://fakestoreapi.com/products").then(res => res.json());
      commit("setMockProducts", products);
    },
    async updateUPCDiscount(context, payload) {
      let prod = context.getters.getByUPC(payload.UPC);
      prod.UPCDiscount = payload.UPCDiscount;
      context.commit("updateProduct", prod);
    },
    async updateProduct(context, payload) {
      context.commit("updateProduct", payload);
    },
    async addExpense(context, payload) {
      context.commit("addExpense", payload);
    },
    async changeBeforeDiscount(context, payload) {
      context.commit("changeBeforeDisocunt", payload);
    },
    async changeDiscountMode(context, payload) {
      context.commit("changeDiscountMode", payload);
    },
    async getRates(context) {
      let rates = await fetch(
        "https://api.fastforex.io/fetch-all?api_key=" + context.state.apiKey
      ).then((res) => res.json());
      context.commit("setRates", rates);
      context.commit("setCurrencies", Object.keys(rates.results))
      context.commit("setRatesLoaded", true);
    }
  },
  modules: {
  },
  plugins: [saveToLocalStorage]
})

