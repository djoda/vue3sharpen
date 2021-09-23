import { createRouter, createWebHistory } from 'vue-router'
import Products from "@/components/Products.vue"
import Discount from "@/components/Discount.vue"

const routes = [
  {
    path: "/",
    name: "Products",
    component: Products
  },
  {
    path: "/discount",
    name: "Discount",
    component: Discount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
