export default interface BudgetData{
  name: string;
  amount: number;
  amountUsed: number;
  lastBudgetedAmount: number;
  recurring: boolean;
}