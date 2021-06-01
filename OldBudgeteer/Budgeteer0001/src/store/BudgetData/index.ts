import { Module } from "vuex";
import { RootState } from "../types";
import BudgetData from "./BudgetData";
import { getters } from './getters';

const state: BudgetData[] = [{
  amount: 0,
  amountUsed: 0,
  lastBudgetedAmount: 0,
  name: "",
  recurring: false
}]

export const BudgetState: Module<BudgetData[], RootState> = {
  state,
  getters,
}