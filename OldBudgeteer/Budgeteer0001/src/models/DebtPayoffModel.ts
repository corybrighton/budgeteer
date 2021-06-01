import DebtData from "./DebtData";

export default class DebtPayoffModel {
  debtData: DebtData;
  addPayment: number = 0;
  addPaymentBegins: number = 0;
  amountAtBeginPlan: number = 0;
  totalInterest: number = 0;
  totalInterestWithPlan: number = 0;
  numberOfPayments: number = 0;
  numberOfPaymentsWithPlan: number = 0;

  constructor(data: DebtData) {
    this.debtData = data;
    this.findPaymentsAndInterest();
  }

  findPaymentsAndInterest() {
    let amount = this.debtData.amount;
    while (amount > 0) {
      const interest = this.findInterest(amount);
      if (interest > this.debtData.minimumPayment) {
        this.numberOfPayments = -1;
        this.debtData.drawOnGraph = false;
        return;
      }
      amount += (interest - this.debtData.minimumPayment);
      this.numberOfPayments++;
      this.totalInterest += interest;
    }
  }

  findInterest(amount: number):number {
    return (this.numberOfPayments > this.debtData.introLength)?
      (amount * (this.debtData.interest * 0.01) / 12) :
      (amount * (this.debtData.introRate * 0.01) / 12);
  }

  findPaymentsAndInterestWithPlan() {
    let amount = this.debtData.amount;
    this.numberOfPaymentsWithPlan = 0;
    this.totalInterestWithPlan = 0;
    while (amount > 0) {
      const interest = this.findInterest(amount);
      if (interest > this.debtData.minimumPayment) {
        this.numberOfPayments = -1;
        return;
      }
      amount += (this.addPaymentBegins >= this.numberOfPaymentsWithPlan) ?
        (interest - this.debtData.minimumPayment):
        (interest - this.debtData.minimumPayment - this.addPayment);
      
      if (this.addPaymentBegins == this.numberOfPaymentsWithPlan)
        this.amountAtBeginPlan = amount;
      this.numberOfPaymentsWithPlan++;
      this.totalInterestWithPlan += interest;
    }
  }
}
