<template>
  <div class="row d-flex justify-content-center">
    <h1 class="col-12 d-flex justify-content-center"><i class="fas fa-chart-area"></i>Debt Payoff Plan</h1>

    <!-- List of Debts -->
    <div class="col-2">
      <div class="d-flex flex-column">

        <!-- Snowball Button --Sort list of debts from smallest to largest and caluculate payoff dates -->
        <div @click="changePayoffMethod('Snowball')" :class="payoffMethod === 'Snowball' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" v-if="payoffMethod === 'Snowball'"></i>
          <i class="fas fa-money-bill-alt secondary bill" v-else></i> Snowball</div>

        <!-- Avalanche Button --Sort debts by largest interest rate -->
        <div @click="changePayoffMethod('Avalanche')" :class="payoffMethod === 'Avalanche' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" v-if="payoffMethod === 'Avalanche'"></i>
          <i class="fas fa-money-bill-alt secondary bill" v-else></i> Avalanche</div>

        <!-- Debts -->
        <h3 class="primary text-center mt-2">My Debts</h3>
        <div class="primary d-flex justify-content-between" v-for="(Debt, i) in DebtPayoffModelData" :key="Debt.debtData.name">
          <div><div class="debtNumber secondary">{{i+1}}</div></div>
          <div class="mr-2">{{Debt.debtData.name}}</div>
          <div>{{ finalPaymentDate(Debt.payoffWithoutAdditionalPayment) }}</div>
          <div>${{Debt.debtData.amount}} @ {{Debt.debtData.interest}}% </div>
        </div>
      </div>
    </div>

    <!-- Cart -->
    <div class="col-10 d-flex justify-content-center">
      <canvas class="selector-for-some-widget" id="SnowBallChart" :height="canvasHeight" :width="canvasWidth"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import DebtData from '../models/DebtData';
  import DebtPayoffModel from '../models/DebtPayoffModel'

  @Component
  class Snowball extends Vue {
    vueCanvas: any;
    canvasHeight = screen.height * 0.6;
    canvasWidth = screen.width * 0.6;
    xAxis = Math.round(this.canvasHeight * 0.85);
    xAxisStart = Math.round(this.canvasWidth * 0.05);
    xAxisEnd = Math.round(this.canvasWidth * 0.95);
    chartHeight = Math.round(this.canvasHeight * 0.75);
    chartWidth = Math.round(this.canvasWidth * 0.85);
    extraPayment = 0;
    monthsStartExtraPayment = 0;
    largestAmount = 0;
    longestNumberOfPayments = 0;
    payoffMethod: string = "Custom";
    extraForPayoff: number = 0;
    totalMonthlyPayment: number = 0;
    DebtPayoffModelData: DebtPayoffModel[] = [];

    Debts: DebtData[] = [
      {name: "Chase", amount: 3500, minimumPayment: 350, interest: 13, introRate: 0, introLength: 0},
      {name: "Home Depot Card", amount: 3221.92, minimumPayment: 125, interest: 0, introRate: 0, introLength: 0 },
      {name: "Student Loans", amount: 14634.82, minimumPayment: 105.3, interest: 2, introRate: 0, introLength: 0 },
      {name: "RC Willy", amount: 2066.35, minimumPayment: 104, interest: 0, introRate: 0, introLength: 0 },
      {name: "Firstmark Service", amount: 13156.67, minimumPayment: 172.25, interest: 5.74, introRate: 0, introLength: 0 },
      {name: "FedLoan", amount: 50810.27, minimumPayment: 108.65, interest: 6.8, introRate: 0, introLength: 0 },
      {name: "Ford Explorer", amount: 10340.99, minimumPayment: 277.00, interest: 3.99, introRate: 0, introLength: 0 },
      {name: "SunTrust", amount: 221357.61, minimumPayment: 1439.47, interest: 3.75, introRate: 0, introLength: 0 }
    ]

    mounted() {
      const canvas: any = document.getElementById("SnowBallChart");
      this.vueCanvas = canvas.getContext("2d");
      this.draw();
      this.Debts.forEach((Debt, index) => {
        this.totalMonthlyPayment += Debt.minimumPayment;
        const numberOfPaymentsLeft = this.numberOfPayments(Debt.amount, Debt.interest, Debt.minimumPayment)
        this.DebtPayoffModelData.push({
          debtData : Debt,
          payoffWithoutAdditionalPayment : numberOfPaymentsLeft,
          additionalPayment : 0,
          additionalPaymentStartingMonth : 0
        });
        if(Debt.amount > this.largestAmount) this.largestAmount = Math.ceil(Debt.amount/1000)*1000;
        if(numberOfPaymentsLeft > this.longestNumberOfPayments) this.longestNumberOfPayments = numberOfPaymentsLeft;
      });
      this.DebtPayoffModelData.forEach(Debt =>{
        if(Debt.payoffWithoutAdditionalPayment >= 0)
          this.drawWithoutExtra(Debt.debtData.amount, Debt.payoffWithoutAdditionalPayment);
      })
    }

    draw(){
      this.vueCanvas.fillStyle = "#2f4d2d ";
      this.vueCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
      this.vueCanvas.strokeStyle = "#ffcc6e";
      this.vueCanvas.lineWidth = 6;
      this.vueCanvas.lineCap = "round"
      this.vueCanvas.moveTo(this.xAxisStart, this.xAxis);
      this.vueCanvas.lineTo(this.xAxisEnd, this.xAxis);
      this.vueCanvas.stroke();
    }

    convertX(x:number): number{
      return (x / this.longestNumberOfPayments)*this.chartWidth + this.xAxisStart;
    }

    convertY(y:number): number{
      return this.canvasHeight - (this.canvasHeight - this.xAxis) - (y / this.largestAmount) * this.chartHeight;
    }

    drawWithoutExtra(startAmount: number, numberOfMonthsLeft: number){
      this.vueCanvas.beginPath();
      this.vueCanvas.moveTo(this.xAxisStart, this.convertY(startAmount));
      this.vueCanvas.lineTo(this.convertX(numberOfMonthsLeft), this.xAxis);
      this.vueCanvas.stroke();
    }

    changePayoffMethod(payoffMethod: string){
      switch(payoffMethod){
        case "Snowball":
          this.DebtPayoffModelData.sort((a, b) => a.debtData.amount - b.debtData.amount);
          break;
        case "Avalanche":
          this.DebtPayoffModelData.sort((a, b) => b.debtData.interest - a.debtData.interest);
          break;
        case "Custom":
          break;
      }
      this.payoffMethod = payoffMethod;
    }

    numberOfPayments(amount: number, interest: number, payment: number, additionalPayment: number = 0, monthAddedAddionalPayment: number = 0): number {
      let count = 0;
      while (amount >= 0) {
        count++;
        const previousAmount = amount;
        amount = (count >= monthAddedAddionalPayment) ? 
        amount + this.interestIncrease(amount, interest / 100) - (payment + additionalPayment) : 
        amount + this.interestIncrease(amount, interest/100) - payment;
        if(amount > previousAmount) return -1;
      }
      return count;
    }

    finalPaymentDate(numberOfMonths: number): string{
      const date: Date = new Date();
      const now: Date = new Date();
      date.setMonth(date.getMonth() + numberOfMonths);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      return (date > now) ? months[date.getMonth()]+ " " + date.getFullYear() : "Debt growing faster than payment!";
    }

    interestIncrease(amount: number, interest: number): number {
      return amount * interest / 12;
    }
  }
  export default Snowball;
</script>

<style scoped>
  canvas {
    border: 1px solid black;
  }

  .bill{
    padding: 0 0.2em;
    border-radius: 30%;
    margin-left: 0.2em;
  }

  .debtNumber{
    font-size: .8em;
    border-radius: 50%;
    padding: .2em .4em;
    margin: .2em 0;
  }
</style>