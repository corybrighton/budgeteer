import DebtData from "./DebtData";

export default interface DebtPayoffModel {
  debtData: DebtData;
  payoffWithoutAdditionalPayment: number;
  additionalPayment: number;
  additionalPaymentStartingMonth: number;
}
