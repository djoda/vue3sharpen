import { mount, } from "@vue/test-utils"
import store from "@/store"
import router from "@/router"
import Discount from "@/components/Discount"
import ProductTest from "../ProductTest";
import { useStore } from "vuex";

describe("Discount.vue", () => {
    test("univesal discount", async () => {
        const wrapper = mount(Discount, {
            global: {
                plugins: [store, router],
                mocks: {
                    ud: 456
                }
            },
        });
        await wrapper.find("#udInput").setValue(15);
        expect(wrapper.vm.ud).toBe(15);

        await wrapper.find("button").trigger("click");

        let pr = store.getters.getByUPC(12345);

        expect(pr.calculateWithTax() - pr.calculateGlobal()).toBe(21.2625);
    })
})