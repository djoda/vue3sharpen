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
        return ((this.calculateTax() + this.Price) * this.getUniversalDiscount()) / 100;
    }

    calculateDiscount() {
        return this.calculateGlobal(this.getUniversalDiscount()) + this.calculateUCPDiscount();
    }

    calculateTax() {
        return this.Price * (this.TaxRate / 100);
    }

    calculateUCPDiscount() {
        return (this.Price * this.UPCDiscount) / 100;
    }

    calculateTaxes() {
        let total = 0;
        for (let expense of useStore().state.expenses) {
            console.log(expense)
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
            (this.Price + this.calculateTaxes() - this.calculateDiscount(this.getUniversalDiscount()) + this.calculateTax()).toFixed(2)
        );
    }
}
export default Product;