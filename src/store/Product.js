import { useStore } from "vuex";

class Product {
    constructor(name, UPC, price, image) {
        this.Name = name;
        this.UPC = UPC;
        this.PriceUSD = price;
        this.Price = price;
        this.TaxRate = 20;
        this.UPCDiscount = 0;
        this.Image = image;
        this.Cap = 0;
        this.CapType = "%";
        this.Currency = "USD";
    }

    getUniversalDiscount() {
        return (useStore()).state.universalDiscount;
    }

    calculateGlobal() {
        return this.Price * this.getUniversalDiscount() / 100;
    }

    calculateDiscount() {
        let ret;
        if (useStore().state.additiveMode && this.UPCDiscount != 0) {
            ret = this.calculateGlobal() + this.calculateUCPDiscount();
        } else {
            ret = (this.Price - this.calculateGlobal()) * this.UPCDiscount / 100;
        }

        if (this.Cap !== 0) {
            if (this.CapType === "%") {
                let cap = this.Price * this.Cap / 100;
                if (cap <= ret)
                    return cap;
                else
                    return ret;
            } else {
                if (this.Cap <= ret)
                    return this.Cap;
                else
                    return ret;
            }
        } else
            return ret;
    }

    calculateTax() {
        if ((useStore()).state.beforeDiscount)
            return this.Price * (this.TaxRate / 100);
        else {
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