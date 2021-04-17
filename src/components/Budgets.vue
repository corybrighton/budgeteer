<template>
  <div class="row">

    <div class="d-flex justify-content-center col-12 pt-3">
    <h1><i class="fas fa-piggy-bank"></i> Budget ~> ${{ budgetTotal.toFixed(2) }}</h1>
    </div>
      <div class="col-2 py-2" v-for="(b, index) in budgetInfo" :key=b.name >
        
        <!-- Budget Card -->
        <div class="card">
          <div class="flex-column d-flex align-items-center py-3" :class="[(b.amount >= b.amountUsed)? 'good' : 'over']">
            <div class="pointer"><h6><strong>{{b.name}}</strong></h6></div>
            <div class="d-flex pointer">
              <h1><i class="large fas fa-piggy-bank"></i></h1>
              <i v-show="b.recurring" class="fas fa-sync-alt"></i>
            </div>
            <div>

              <!-- Add Funds to Budget Button -->
              <button @click="openInputBar(b)" class="btn secondary btn-xs">
                <i class="p-2 fas fa-plus-square"></i>
              </button>

              <strong @click="addFundsToBudget(b.name)" class="px-3">
                ${{ (b.amount - b.amountUsed).toFixed(2)}}
              </strong> 

              <!-- Transfer Funds to another Budget Button -->
              <button v-if="tBudgetFrom === index" 
                class="btn secondary btn-xs">
                <i class="fas fa-long-arrow-alt-right"></i>
              </button>
              <button v-else-if="tBudgetTo === index" class="btn secondary btn-xs">
                <i class="fas fa-long-arrow-alt-left"></i>
              </button>
              <button v-else @click="transferBudgetSelect(index)" 
                class="btn secondary btn-xs">
                <i class="p-2 fas fa-exchange-alt"></i>
              </button>

            </div>

            <!-- Add Funds Input Bar -->
            <div class="d-flex flex-row p-2 row justify-content-center" v-if="showInputBar == b.name">
              <strong class="col-1">$</strong>
              <input class="col-4" v-model="transferAmount">

              <!-- Accept add funds button -->
              <button @click="addToBudget(index)" class="col-2 btn lightColor btn-xs mx-2"><i class="fas fa-check"></i></button>

              <!-- Cancel Button -->
              <button @click="cancelTransfer()" class="col-2 btn cancelColor btn-xs"><i class="fas fa-times"></i></button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BudgetData from '../store/BudgetData/BudgetData';

  @Component
  export default class Budgets extends Vue {
    isInBudget = true;
    showInputBar = "bar";
    budgetTotal = 3700;
    amountBudgeted = 0;
    transferAmount = 0;
    tBudgetFrom = -1;
    tBudgetTo = -1;

    get budgetState(): BudgetData[]{
      return this.$store.getters.getBudgetData;
    }
    budgetInfo: BudgetData[] = [
      { 
        name: "Giving", 
        amount: 1200, 
        amountUsed: 158.44, 
        lastBudgetedAmount: 1200, 
        recurring: false
      }, 
      { 
        name: "Fixed Expenses", 
        amount: 2610, 
        amountUsed: 347.11, 
        lastBudgetedAmount: 2610, 
        recurring: true
      }, 
      { 
        name: "Debt Payment", 
        amount: 850, 
        amountUsed: 251.31, 
        lastBudgetedAmount: 850, 
        recurring: false
      }, 
      { 
        name: "Living Expenses", 
        amount: 500, 
        amountUsed: 455.2, 
        lastBudgetedAmount: 500, 
        recurring: false
      }, 
      { 
        name: "Just for Fun", 
        amount: 500, 
        amountUsed: 105.55, 
        lastBudgetedAmount: 500, 
        recurring: false
      }, 
      { 
        name: "Savings Goals", 
        amount: 1900, 
        amountUsed: 1830.51, 
        lastBudgetedAmount: 1900, 
        recurring: false
      }, 
      { 
        name: "Goals", 
        amount: 600, 
        amountUsed: 743.51, 
        lastBudgetedAmount: 600, 
        recurring: true
      }, 
      { 
        name: "Unexpected Expenses", 
        amount: 100, 
        amountUsed: 370.8, 
        lastBudgetedAmount: 100, 
        recurring: false
      }
      ]

      transferBudgetSelect(budget: number){
        if(this.tBudgetFrom == -1){
          this.tBudgetFrom = budget;
        }else{
          this.tBudgetTo = budget;
          this.openInputBar(this.budgetInfo[budget]);
        }
      }

      transferFunds(bTo: number, transfer: number, bFrom = -1){
        if(bFrom < 0) this.budgetTotal -= this.transferAmount;
        else this.budgetInfo[bFrom].amount -= transfer;
        this.budgetInfo[bTo].amount += transfer;
      }

      openInputBar(budget: BudgetData){
        this.showInputBar = (this.showInputBar != budget.name)? budget.name : "bar";
        this.transferAmount = (budget.amount < budget.amountUsed)? (budget.amountUsed - budget.amount) : budget.lastBudgetedAmount;
      }

      totalAmountBudgeted(){
        let t = 0;
        this.budgetInfo.forEach( b => t += b.amount );
        return t;
      }

      addToBudget(indexTo: number){
        this.transferFunds(indexTo, +this.transferAmount, this.tBudgetFrom);
        this.cancelTransfer();
      }

      cancelTransfer(){
        this.showInputBar = "bar";
        this.transferAmount = 0;
        this.tBudgetFrom = -1;
        this.tBudgetTo = -1;
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

  .cancelColor {
    background-color: red;
    color: white;
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

  .btn-xs{
    padding: .03125rem;
    width: 2rem;
  }

  input{
    width: fit-content;
    border: none;
    border-bottom: 1px solid #fff5;
    background-color: #0000;
    color: white;;
  }
</style>