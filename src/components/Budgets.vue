<template>
  <div class="row">

    <div class="d-flex justify-content-center col-12 pt-3">
    <h1><i class="fas fa-piggy-bank"></i> Budget ~> {{ budgetTotal }}</h1>
    </div>
      <div class="col-2 py-2" v-for="b in budgetInfo" :key=b.name >
        <div class="card h-100">
          <div class="flex-column d-flex align-items-center py-3" :class="[(b.amount >= b.amountUsed)? 'good' : 'over']">
            <div class="pointer"><h6><strong>{{b.name}}</strong></h6></div>
            <div class="d-flex pointer">
              <h1><i class="large fas fa-piggy-bank"></i></h1>
              <i v-show="b.recurring" class="fas fa-sync-alt"></i>
            </div>
            <div>
              <button class="btn secondary btn-xs">
                <i class="p-2 fas fa-plus-square" @click="addFunds(b.Name)"></i>
              </button>
              <strong @click="addFundsToBudget" class="px-3">${{ (b.amount - b.amountUsed).toFixed(2)}}</strong>
              <i class="p-2 fas fa-exchange-alt"></i>
            </div>
            <div class="d-flex flex-row p-2">
              $ <input class="m-1">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BudgetData from '../models/BudgetData';

  @Component
  export default class Budgets extends Vue {
    isInBudget = true;
    budgetTotal = 3700;
    amountBudgeted = 0;
    budgetInfo: BudgetData[] = [
      {name: "Giving", amount: 1200, amountUsed: 158.44, recurring: false}, 
      {name: "Fixed Expenses", amount: 2610, amountUsed: 347.11, recurring: true}, 
      {name: "Debt Payment", amount: 850, amountUsed: 251.31, recurring: false}, 
      {name: "Living Expenses", amount: 500, amountUsed: 455.2, recurring: false}, 
      {name: "Just for Fun", amount: 500, amountUsed: 105.55, recurring: false}, 
      {name: "Savings Goals", amount: 1900, amountUsed: 1830.51, recurring: false}, 
      {name: "Goals", amount: 600, amountUsed: 743.51, recurring: true}, 
      {name: "Unexpected Expenses", amount: 100, amountUsed: 370.8, recurring: false}
      ]

      addFundsToBudget(){
        return
      }

      totalAmountBudgeted(){
        let t = 0;
        this.budgetInfo.forEach( b => t += b.amount );
        return t;
      }

      mounted() {
        this.amountBudgeted = this.totalAmountBudgeted();
      }
  }
</script>

<style scoped>
  .good {
    background-color: #2e4c2c;
  }

  .over {
    background-color: firebrick;
  }

  .large {
    font-size: 2.6em;
  }

  .good, .over {
    border-radius: 50px;
    color: #fff;
  }

  .card {
    border-radius: 50px;
  }

  .pointer{
    cursor: pointer;
  }

  .btn-xs{
    padding: .03125rem .0625rem;
  }
</style>