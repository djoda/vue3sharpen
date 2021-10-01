import { mount } from "@vue/test-utils"
import Products from "@/components/Products.vue"
import store from "@/store"
import router from "@/router"
import Expenses from "../../src/store/Expenses"

describe("Product.vue", () => {

    test("applyBefore", async () => {
        const wrapper = mount(Products, {
            global: {
                plugins: [store, router],
                mocks: {
                }
            },
        });

        let prod = store.getters.getByUPC(12345);
        prod.UPCDiscount = 7;
        await store.commit("setUniversalDiscount", 15);
        await store.dispatch("updateUPCDiscount", prod);

        await wrapper.find("#beforeTax").setValue(false);

        expect(prod.calculateTotal()).toBe(18.95);
    });

    test("discountMode", async () => {
        const wrapper = mount(Products, {
            global: {
                plugins: [store, router],
                mocks: {
                }
            },
        });

        let prod = store.getters.getByUPC(12345);
        prod.UPCDiscount = 7;
        prod.TaxRate = 21;

        await store.dispatch("addExpense", new Expenses("Transport", 2.2, "$", 12345));
        await store.dispatch("addExpense", new Expenses("Packaging", 0.2, "%", 12345));

        await store.commit("setUniversalDiscount", 15);
        await store.dispatch("updateProduct", prod);

        await wrapper.find("#discountMode").setValue(true);

        expect(prod.calculateTotal()).toBe(21.35);

        await wrapper.find("#discountMode").setValue(false);

        expect(prod.calculateTotal()).toBe(25.29);

    });

})