import { createStore } from 'vuex'
import Product from "./Product"


export default createStore({
  state: {
    products: [new Product("Product1", 111, 4565, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
    new Product("Product2", 222, 3622, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"),
    new Product("Product3", 333, 441565, "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"),
    new Product("Product4", 444, 56, "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg")],
    universalDiscount: 0
  },

  getters: {
    getAllProducts: (state) => state.products

  },
  mutations: {
    addProduct(state, item) {
      state.products.push(item);
    },
    setUniversalDiscount(state, ud) {
      state.universalDiscount = ud;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const products = await fetch("https://fakestoreapi.com/products").then(res => res.json());
      commit("setPosts", products);
    }
  },
  modules: {
  }
})

