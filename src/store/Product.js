import { useStore } from "vuex";

class Product {
    constructor(name, UPC, price, image) {
        this.Name = name;
        this.UPC = UPC;
        this.Price = price;
        this.TaxRate = 20;
        this.UPCDiscount = 0;
        this.Expenses = [{ description: "Transport", amount: 20 }];
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

    calculateTotal() {
        return (
            (this.Price - this.calculateDiscount(this.getUniversalDiscount()) + this.calculateTax()).toFixed(2)
        );
    }
}
export default Product;