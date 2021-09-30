import { mount, } from "@vue/test-utils"
import Product from "@/components/Product.vue"
import store from "@/store"
import router from "@/router"
import { config } from '@vue/test-utils'
import ProductTest from "../ProductTest"


describe("Product.vue", () => {
    test("snapshot", () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new ProductTest("Product1", 111, 4565, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    })
})