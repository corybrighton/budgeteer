<template>
  <div class="row d-flex justify-content-center">
    <h1 class="col-12 d-flex justify-content-center">
      <i class="fas fa-chart-area"></i>
      Debt Payoff Plan
    </h1>

    <!-- List of Debts -->
    <div class="col-2">
      <div class="d-flex flex-column">
        <div class="primary mt-2">
          <h3 class="primary ml-2 mt-1">Payment Plan</h3>
        </div>

        <!-- Snowball Button --Sort list of debts from smallest to largest and caluculate payoff dates -->
        <div class="primary pl-2"> Monthly Payment ${{totalMonthlyPayment}} </div>
        <div @click="changePayoffMethod('Snowball')" 
          class="pointer"
          :class="payoffMethod === 'Snowball' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" 
            v-if="payoffMethod === 'Snowball'"></i>
          <i class="fas fa-money-bill-alt secondary bill" 
            v-else></i> 
          Snowball
        </div>

        <!-- Avalanche Button --Sort debts by largest interest rate -->
        <div class="pointer"
          @click="changePayoffMethod('Avalanche')" 
          :class="payoffMethod === 'Avalanche' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" 
            v-if="payoffMethod === 'Avalanche'"></i>
          <i class="fas fa-money-bill-alt secondary bill" 
            v-else></i> Avalanche</div>

          <!-- Custom Button --Sort debts by custom payoffs -->
        <div class="pointer"
          @click="changePayoffMethod('Custom')" 
          :class="payoffMethod === 'Custom' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" 
            v-if="payoffMethod === 'Custom'">
          </i>
          <i class="fas fa-money-bill-alt secondary bill" 
            v-else>
          </i> Custom</div>

        <!-- Debts -->
        <div class="primary mt-2">
          <h3 class="primary ml-2 mt-1">My Debts</h3>
        </div>
        <div @click="showThisDebt(Debt.debtData.name)" 
          class="primary pointer" 
          v-for="(Debt, i) in DebtPayoffModelData" 
          :key="Debt.debtData.name">
          <div class="d-flex">

            <div class="ml-2">
              <div class="debtNumber secondary">{{i+1}}</div>
            </div>
            <div class="ml-2">{{Debt.debtData.name}}</div>
          </div>
          <div class="ml-2" 
            v-if="showDebt == Debt.debtData.name">
            <div>
              W/O extra: {{ finalPaymentDate(Debt.payoffWithoutAdditionalPayment) }}
            </div>
            <div>
              ${{Debt.debtData.amount}} @ {{Debt.debtData.interest}}% 
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart -->
    <div class="col-10 d-flex justify-content-center">
      <canvas 
        class="selector-for-some-widget" 
        id="SnowBallChart" 
        :height="canvasHeight" 
        :width="canvasWidth">
      </canvas>
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
    showDebt = "";

    Debts: DebtData[] = [
      {
        name: "Chase", 
        amount: 3500, 
        minimumPayment: 350, 
        interest: 13, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 0, 
        drawOnGraph: true
      },
      {
        name: "Home Depot Card", 
        amount: 3221.92, 
        minimumPayment: 125, 
        interest: 0, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 1, 
        drawOnGraph: true
      },
      {
        name: "Student Loans", 
        amount: 14634.82, 
        minimumPayment: 105.3, 
        interest: 2, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 2, 
        drawOnGraph: true
      },
      {
        name: "RC Willy", 
        amount: 2066.35, 
        minimumPayment: 104, 
        interest: 0, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 3, 
        drawOnGraph: true
      },
      {
        name: "Firstmark Service", 
        amount: 13156.67, 
        minimumPayment: 172.25, 
        interest: 5.74, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 4, 
        drawOnGraph: true
      },
      {
        name: "FedLoan", 
        amount: 50810.27, 
        minimumPayment: 108.65, 
        interest: 6.8, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 7, 
        drawOnGraph: true
      },
      {
        name: "Ford Explorer", 
        amount: 10340.99, 
        minimumPayment: 277.00, 
        interest: 3.99, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 6, 
        drawOnGraph: true
      },
      {
        name: "SunTrust", 
        amount: 221357.61, 
        minimumPayment: 1439.47, 
        interest: 3.75, 
        introRate: 0, 
        introLength: 0, 
        payoffOrder: 5, 
        drawOnGraph: false
      }
    ]

    mounted() {
      const canvas: any = document.getElementById("SnowBallChart");
      this.vueCanvas = canvas.getContext("2d");
      this.mapDebtsToDebtPayoffModels();
      this.draw();
      this.changePayoffMethod("Custom");
      this.graphEachDebt();
    }

    mapDebtsToDebtPayoffModels(){
      this.Debts.forEach((Debt) => {
        this.totalMonthlyPayment += Debt.minimumPayment;
        const numberOfPaymentsLeft = 
          this.numberOfPayments(Debt.amount, Debt.interest, Debt.minimumPayment)
        this.DebtPayoffModelData.push({
          debtData : Debt,
          payoffWithoutAdditionalPayment : numberOfPaymentsLeft,
          additionalPayment : 0,
          additionalPaymentStartingMonth : 0
        });
        if(Debt.drawOnGraph){
          if(Debt.amount > this.largestAmount) 
            this.largestAmount = Math.ceil(Debt.amount/1000)*1000;
          if(numberOfPaymentsLeft > this.longestNumberOfPayments) 
            this.longestNumberOfPayments = numberOfPaymentsLeft;
        }
      });

    }

    graphEachDebt(){
      this.DebtPayoffModelData.forEach(Debt =>{
        if(Debt.payoffWithoutAdditionalPayment >= 0 && Debt.debtData.drawOnGraph)
          this.drawWithoutExtra(Debt.debtData.amount, Debt.payoffWithoutAdditionalPayment);
      })
    }

    draw(){
      this.vueCanvas.fillStyle = "#2f4d2d ";
      this.vueCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
      this.vueCanvas.strokeStyle = "#ffcc6e";
      this.vueCanvas.lineWidth = 4;
      this.vueCanvas.lineCap = "round"
      this.vueCanvas.moveTo(this.xAxisStart, this.xAxis);
      this.vueCanvas.lineTo(this.xAxisEnd, this.xAxis);
      this.vueCanvas.stroke();
    }

    convertX(x:number): number{
      return (x / this.longestNumberOfPayments)*this.chartWidth + this.xAxisStart;
    }

    convertY(y:number): number{
      return this.canvasHeight 
      - (this.canvasHeight - this.xAxis) 
      - (y / this.largestAmount) 
      * this.chartHeight;
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
          this.DebtPayoffModelData.sort(
            (a, b) => a.debtData.amount - b.debtData.amount);
          break;
        case "Avalanche":
          this.DebtPayoffModelData.sort(
            (a, b) => b.debtData.interest - a.debtData.interest);
          break;
        default:
          this.DebtPayoffModelData.sort(
            (a, b) => a.debtData.payoffOrder - b.debtData.payoffOrder)
          break;
      }
      this.payoffMethod = payoffMethod;
    }

    numberOfPayments(amount: number, 
                    interest: number, 
                    payment: number, 
                    additionalPayment: number = 0, 
                    monthAddedAddionalPayment: number = 0): number {
      let count = 0;
      while (amount >= 0) {
        count++;
        const previousAmount = amount;
        amount = (count >= monthAddedAddionalPayment) ? 
        amount + this.interestIncrease(amount, interest / 100) 
        - (payment + additionalPayment) : 
        amount + this.interestIncrease(amount, interest/100) - payment;
        if(amount > previousAmount) return -1;
      }
      return count;
    }

    finalPaymentDate(numberOfMonths: number): string{
      const date: Date = new Date();
      const now: Date = new Date();
      date.setMonth(date.getMonth() + numberOfMonths);
      const months = 
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      return (date > now) ? months[date.getMonth()]+ " " + date.getFullYear() 
      : "Debt growing faster than payment!";
    }

    interestIncrease(amount: number, interest: number): number {
      return amount * interest / 12;
    }

    showThisDebt(debtName: string){
      this.showDebt = (this.showDebt == "") ? debtName : "";
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