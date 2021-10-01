import { mount } from "@vue/test-utils"
import UPCDiscount from "@/components/UPCDiscount.vue"
import store from "@/store"
import router from "@/router"

describe("UPCDiscount.vue", () => {
    test("tax", async () => {
        const wrapper = mount(UPCDiscount, {
            global: {
                plugins: [store, router],
                mocks: {
                }
            },
        });

        await store.commit("setUniversalDiscount", 15);
        await wrapper.find("select").setValue(12345);
        await wrapper.find("input").setValue(7);

        await wrapper.find("button").trigger("click");
        let prod = store.getters.getByUPC(12345);
        expect(prod.calculateTotal()).toBe(19.84);

    });

})