import { createRouter, createWebHistory } from 'vue-router'
import Products from "@/components/Products.vue"
import Discount from "@/components/Discount.vue"
import UPCDiscount from "@/components/UPCDiscount.vue"
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
  },
  {
    path: "/upcdiscount",
    name: "UPCDiscount",
    component: UPCDiscount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
