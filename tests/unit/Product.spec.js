import { mount } from "@vue/test-utils"
import Product from "@/components/Product.vue"
import store from "@/store"
import router from "@/router"
import { Product as Prod } from "../../src/store/Product"

describe("Product.vue", () => {

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
                    product: new Prod("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });

        expect(wrapper.element).toMatchSnapshot();

    });

    test("cap", async () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new Prod("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });

        wrapper.vm.product.UPCDiscount = 50;
        await store.dispatch("updateProduct", wrapper.vm.product);

        await wrapper.find("#capAmount").setValue(20);
        await wrapper.find("#capType").setValue("%");

        await wrapper.find("#capBtn").trigger("click");

        expect(wrapper.vm.product.calculateDiscount()).toBe(4.05);

        await wrapper.find("#capAmount").setValue(5);
        await wrapper.find("#capType").setValue("$");

        await wrapper.find("#capBtn").trigger("click");

        expect(wrapper.vm.product.calculateDiscount()).toBe("5");

    });

    test("expenses", async () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new Prod("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });


        await store.commit("setUniversalDiscount", 15);

        wrapper.vm.product.UPCDiscount = 7;
        await store.dispatch("updateUPCDiscount", wrapper.vm.product);

        await wrapper.find("#taxAmount").setValue(2);
        await wrapper.find("#taxType").setValue("%");
        await wrapper.find("#taxBtn").trigger("click");

        await wrapper.find("#taxAmount").setValue(2.2);
        await wrapper.find("#taxType").setValue("$");
        await wrapper.find("#taxBtn").trigger("click");

        expect(wrapper.vm.product.calculateTotal()).toBe(22.45);
    });

    test("currency", async () => {
        const wrapper = mount(Product, {
            global: {
                plugins: [store, router],
                mocks: {
                    product: new Prod("The Little Price", 12345, 20.25, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
                }
            },
        });
        await store.dispatch("getRates");
        //await store.commit("setUniversalDiscount", 0);
        await wrapper.find("select").setValue("GBP");
        wrapper.vm.curr = "GBP";
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.product.Price.toFixed(2)).toBe("14.94");

    });
})