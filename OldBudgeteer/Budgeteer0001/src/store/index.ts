import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types';
import { BudgetState } from './BudgetData/index';
import { DebtState } from './DebtState/index';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    DebtState,
    BudgetState
  }
}

export default new Vuex.Store<RootState>(store);
