import { createStore } from 'vuex'

export default createStore({
  state: {
    products: []
  },
  getters: {
    getAllProducts: (state) => state.products

  },
  mutations: {
    addPost(state, item) {
      state.products.push(item);
      console.log("item", item)
    },
    setPosts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const products = await fetch("https://fakestoreapi.com/products").then(res => res.json());
      console.log(products)
      commit("setPosts", products)
    }
  },
  modules: {
  }
})
