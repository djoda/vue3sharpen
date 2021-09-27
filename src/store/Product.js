import { useStore } from "vuex";

class Product {
    constructor(name, UPC, price, image) {
        this.Name = name;
        this.UPC = UPC;
        this.Price = price;
        this.TaxRate = 20;
        this.UPCDiscount = 0;
        this.Image = image;
    }

    getUniversalDiscount() {
        return (useStore()).state.universalDiscount;
    }

    calculateGlobal() {
        return this.Price * this.getUniversalDiscount() / 100;
    }

    calculateDiscount() {
        if (useStore().state.additiveMode && this.UPCDiscount != 0) {
            return this.calculateGlobal() + this.calculateUCPDiscount();
        } else {
            return (this.Price - this.calculateGlobal()) * this.UPCDiscount / 100;
        }
    }

    calculateTax() {
        // console.log((useStore()).state.beforeDiscount)
        if ((useStore()).state.beforeDiscount)
            return this.Price * (this.TaxRate / 100);
        else {
            // console.log("ASDAS", this.calculateDiscount(this.getUniversalDiscount()))
            return (this.Price - this.calculateDiscount()) * this.TaxRate / 100;
        }
    }

    calculateUCPDiscount() {
        return this.Price * this.UPCDiscount / 100;
    }

    calculateExpenses() {
        let total = 0;
        for (let expense of useStore().state.expenses) {
            if (expense.AmountType === "%") {
                total += this.Price * expense.Amount / 100;
            } else {
                total += expense.Amount;
            }
        }
        return total;
    }

    calculateTotal() {
        return (
            (this.Price + this.calculateExpenses() - this.calculateDiscount() + this.calculateTax()).toFixed(2)
        );
    }
}
export default Product;