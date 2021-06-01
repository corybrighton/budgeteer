import DebtData from "@/models/DebtData";
import { GetterTree } from "vuex";
import { RootState } from "../types";

export const getters: GetterTree<DebtData[], RootState> = {
  getDebtData(state) {
    return state;
  }
}