import { mount } from "@vue/test-utils"
import Product from "@/components/Product.vue"
describe("Product.vue", () => {
    test("snapshot", () => {
        const wrapper = mount(Product);
        expect(wrapper).toMatchSnapshot();
    })
})