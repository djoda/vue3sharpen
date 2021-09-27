import { createStore } from 'vuex'
import Product from "./Product"
import saveToLocalStorage from "./Plugins/webStorage"
import Expenses from './Expenses';

export default createStore({
  state: {
    mockProducts: [],
    products: [new Product("Product1", 111, 4565, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
    new Product("Product2", 222, 3622, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"),
    new Product("Product3", 333, 441565, "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"),
    new Product("Product4", 444, 56, "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg")],
    universalDiscount: 0,
    expenses: [new Expenses("Transport", 500, "$", 111)]
  },
  getters: {
    getByUPC: (state) => (UPC) => {
      return state.products.find(e => e.UPC === UPC);
    },
    getExpensesByUPC: (state) => (UPC) => {
      return state.expenses.filter(e => e.ProductUPC == UPC);
    }
  },
  mutations: {
    addProduct(state, item) {
      state.products.push(item);
    },
    setUniversalDiscount(state, ud) {
      state.universalDiscount = ud;
    },
    setMockProducts(state, items) {
      state.mockProducts = items;
    },
    setUPCDiscount(state, payload) {
      state.products = [...state.products.filter(e => e.UPC != payload.UPC), payload];
    },
    addExpense(state, payload) {
      state.expenses.push(payload);
      console.log(state.expenses)
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
      context.commit("setUPCDiscount", prod);
    },
    async updateProduct(context, payload) {
      context.commit("addProduct", payload);
    },
    async addExpense(context, payload) {
      context.commit("addExpense", payload);
    }
  },
  modules: {
  },
  plugins: [saveToLocalStorage]
})

