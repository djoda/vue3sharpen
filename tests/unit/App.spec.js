import App from "@/App.vue"
import { mount, } from "@vue/test-utils"
import store from "@/store"
import router from "@/router"

describe("App.vue", () => {
    test("snapshot", () => {
        const wrapper = mount(App, {
            global: {
                plugins: [store, router],
                mocks: {
                }
            },
        });
        expect(wrapper.element).toMatchSnapshot();
    })
})