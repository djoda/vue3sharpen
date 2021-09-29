import { createRouter, createWebHistory } from 'vue-router'
import Products from "@/components/Products.vue"
import Discount from "@/components/Discount.vue"
import UPCDiscount from "@/components/UPCDiscount.vue"
import Product from "@/components/Product.vue"
import Login from "@/components/Login.vue"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true }
  },
  {
    path: "/",
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: "/discount",
    name: "Discount",
    component: Discount,
    meta: { requiresAuth: true },
  },
  {
    path: "/upcdiscount",
    name: "UPCDiscount",
    component: UPCDiscount,
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:upc",
    name: "Product",
    component: Product,
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath == "/login") {
    if (localStorage.getItem("token")) {
      next("/")
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next("/login")
    }
  }
  next()
});

export default router
