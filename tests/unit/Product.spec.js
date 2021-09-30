import { mount } from "@vue/test-utils"
import Product from "@/components/Product.vue"
import store from "@/store"
import router from "@/router"
import ProductTest from "../ProductTest"
import { useStore } from "vuex";
import { Product as Prod } from "../../src/store/Product"

describe("Product.vue", () => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", useStore)
    test("newTaxRate", async () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new Prod("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });

        await wrapper.find("#newTaxRateInput").setValue(21);
        expect(wrapper.vm.newTaxRate).toBe(21);

        const btnSave = wrapper.find("#newTaxRateBtnSave");
        await btnSave.trigger("click");

        expect(wrapper.vm.product.calculateWithTax()).toBe(24.50);
    });

    test("snapshot", () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new ProductTest("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });

        expect(wrapper.element).toMatchSnapshot();

    });
})