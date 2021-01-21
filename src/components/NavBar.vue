<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-end fixed-bottom row primary py-2">
    <div class="col-3 d-flex align-items-end"><img src="../assets/BudgeteerLogo.png"></div>
      <div class="col-5"></div>
      <div class="col-3 pt-2">
        <div v-for="n in navigate" :key=n.name @click="navToPage(n.name)" v-show="isNavOpen">
          <h4><i :class=n.icon></i> {{ n.name }}</h4>
        </div>
      </div>
      <div class="col-1 pb-2 row">
        <div class="d-flex align-items-end">
          <button class="btn secondary btn-lg" @click="openCloseNav">
            <i class="fas fa-times" v-if="isNavOpen"></i>
            <i class="fas fa-bars" v-else></i>
          </button>
        </div>
      </div>
    </div>

    <Budgets v-if="activePage == 'Budgets'" />
    <Transactions v-else-if="activePage == 'Transactions'" />
    <Banks v-else-if="activePage == 'Banks'" />
    <Balance v-else-if="activePage == 'Balance'" />
    <Spending v-else-if="activePage == 'Spending'" />
    <Worth v-else-if="activePage == 'Worth'" />
    <Snowball v-else-if="activePage == 'Snowball'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Budgets from "./Budgets.vue";
import Transactions from "./Transactions.vue";
import Banks from "./Banks.vue";
import Balance from "./Balance.vue";
import Spending from "./Spending.vue";
import Worth from "./Worth.vue";
import Snowball from "./Snowball.vue";

@Component({
  components: {
    Budgets,
    Transactions,
    Banks,
    Balance,
    Spending,
    Snowball,
    Worth,
  },
})
export default class NavBar extends Vue {
  private activePage = "Snowball";
  private isNavOpen = false;
  private navigate = [
    {
      name:"Budgets",
      icon: "fas fa-piggy-bank"
    }, 
    {
      name:"Transactions",
      icon: "fas fa-cash-register"
    }, 
    {
      name:"Banks",
      icon: "fas fa-university"
    }, 
    {
      name:"Balance",
      icon: "fas fa-balance-scale-right"
    }, 
    {
      name:"Spending",
      icon: "fas fa-chart-pie"
    }, 
    {
      name:"Snowball",
      icon: "fas fa-chart-area"
    }, 
    {
      name:"Worth",
      icon: "fas fa-chart-line"
    }]

  public navToPage(newPage: string): void {
    this.activePage = newPage;
    this.isNavOpen = false;
  }

  public openCloseNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
}
</script>


<style scoped>
 h4:hover{cursor: pointer}
 img{max-height: 65px;}
</style>