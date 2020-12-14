<template>
  <div class="row">

    <h1 class="col-12"><i class="fas fa-piggy-bank"></i> Budget</h1>
      <div class="col-2 py-2" v-for="(b, index) in budgetInfo" :key="index">
        <div class="card h-100 d-flex justify-content-center">
            <h1 class="d-flex justify-content-center py-4" :class="[(b.amount >= b.amountUsed)? 'good' : 'over']"><i class="large fas fa-piggy-bank"></i></h1>
          <div class="card-body flex-column d-flex justify-content-between align-items-center">
            <div>
              {{b.name}}
            </div>
            <div>
              <strong>
                ${{ b.amount - b.amountUsed}}
              </strong>
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
    budgetInfo: BudgetData[] = [
      {name: "Giving", amount: 1200, amountUsed: 300}, 
      {name: "Fixed Giving Expenses", amount: 2500, amountUsed: 300}, 
      {name: "Debt Payment", amount: 800, amountUsed: 300}, 
      {name: "Living Expenses", amount: 500, amountUsed: 300}, 
      {name: "Just for Fun", amount: 500, amountUsed: 300}, 
      {name: "Savings Goals", amount: 1900, amountUsed: 300}, 
      {name: "Unexpected Expenses", amount: 100, amountUsed: 300}
      ]
  }
</script>

<style scoped>
  .good {
    background-color: #2e4c2c;
    color :#fff;
  }

  .over {
    background-color: firebrick;
    color: #fff;
  }

  .large {
    font-size: 2.6em;
  }
</style>