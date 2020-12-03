<template>
  <div>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{active : activePage == 'home'}"  @click="navToPage('home')">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'budgets'}"  @click="navToPage('budgets')"><i class="fas fa-piggy-bank"></i> Budgets</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'transactions'}"  @click="navToPage('transactions')">  <i class="fas fa-cash-register"></i> Transactions</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'banks'}"  @click="navToPage('banks')"> <i class="fas fa-university"></i> Banks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'balance'}"  @click="navToPage('balance')"> <i class="fas fa-balance-scale-right"></i> <i class="fas fa-balance-scale"></i>  Balance</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'spending'}"  @click="navToPage('spending')"> <i class="fas fa-chart-pie"></i> Spending</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'worth'}"  @click="navToPage('worth')"> <i class="fas fa-chart-line"></i> Worth</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: activePage == 'snowball'}"  @click="navToPage('snowball')"> <i class="fas fa-chart-area"></i> Snowball</a>
      </li>
    </ul>
    
    <Budgets v-show="activePage == 'budgets'"/>
    <Transactions v-show="activePage == 'transactions'"/>
    <Banks v-show="activePage == 'banks'"/>
    <Balance v-show="activePage == 'balance'"/>
    <Spending v-show="activePage == 'spending'"/>
    <Worth v-show="activePage == 'worth'"/>
    <Snowball v-show="activePage == 'snowball'"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Budgets from './Budgets.vue';
  import Transactions from './Transactions.vue';
  import Banks from './Banks.vue';
  import Balance from './Balance.vue';
  import Spending from './Spending.vue';
  import Worth from './Worth.vue';
  import Snowball from './Snowball.vue';
  
  @Component({
      components: {
        Budgets, Transactions, Banks, Balance, Spending, Snowball, Worth
      },
    })
  export default class NavBar extends Vue {

    private activePage = 'home';
    
    public navToPage(newPage: string): void{
      this.activePage = newPage;
    }
  }
</script>