export default function saveToLocalStorage(store) {
    store.subscribe((mutation, state) => {
        console.log("stateFromPlguin", state)
        if (mutation.type === 'setMockProducts') {
            const payload = mutation.payload;
            // localStorage.setItem("payload", payload)
            console.log("payload", payload);
        }
    })
}