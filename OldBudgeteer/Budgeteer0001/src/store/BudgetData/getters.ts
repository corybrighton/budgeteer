import { GetterTree } from "vuex";
import { RootState } from "../types";
import BudgetData from "./BudgetData";

export const getters: GetterTree<BudgetData[], RootState> = {
  getBudgetData(state): BudgetData[]{
    return state
  }
}