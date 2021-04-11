import DebtData from "./DebtData";

export default interface DebtPayoffModel {
  debtData: DebtData;
  additionalPayment: number;
  additionalPaymentStartingMonth: number;
  totalInterest: number;
  totalInterestWithPlan: number;
  numberOfPayments: number;
  numberOfPaymentsWithPlan: number;
}
