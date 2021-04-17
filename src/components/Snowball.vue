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

        <!-- Snowball Button 
        --Sort list of debts from smallest to largest and caluculate payoff dates -->
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
            v-else></i> 
            Avalanche
        </div>

          <!-- Custom Button --Sort debts by custom payoffs -->
        <div class="pointer"
          @click="changePayoffMethod('Custom')" 
          :class="payoffMethod === 'Custom' ? 'secondary' : 'primary'">
          <i class="far fa-money-bill-alt primary bill" 
            v-if="payoffMethod === 'Custom'">
          </i>
          <i class="fas fa-money-bill-alt secondary bill" v-else></i> 
          Custom
        </div>

        <!-- List of Debts -->
        <div class="primary mt-2">
          <h3 class="primary ml-2 mt-1">My Debts</h3>
        </div>
        <div class="primary pointer" 
          v-for="(Debt, i) in DebtPayoffModelData" 
          :key="Debt.debtData.name">
          <div @click="showThisDebt(Debt.debtData.name)" class="d-flex">

            <div class="ml-2">
              <div class="debtNumber secondary">{{i+1}}</div>
            </div>
            <div class="ml-2">{{Debt.debtData.name}}</div>
          </div>
          <div class="ml-2 secondary" 
            v-if="showDebt == Debt.debtData.name">
            <div @click="showThisDebt(Debt.debtData.name)" 
                class="mt-2" 
                v-if="Debt.numberOfPayments > 0">
              <div class="ml-2">
                ${{Debt.debtData.amount}} @ {{Debt.debtData.interest}}% 
              </div>
              <div class="ml-2">
                will take {{Debt.numberOfPayments}} 
              </div>
              <div class="ml-2">
                which is {{finalPaymentDate(Debt.numberOfPayments)}}
              </div>
              <div class="ml-2">
                at a cost of ${{ Debt.totalInterest.toFixed(2) }}
              </div>
            </div>
            <div @click="showThisDebt(Debt.debtData.name)" 
                class="mt-2" 
                v-else>
              <div class="ml-2">{{finalPaymentDate(Debt.numberOfPayments)}}</div>
            </div>
            <label class="ml-2 switch">
              <input 
                @click="changeGraph(Debt)" 
                type="checkbox" 
                v-model="Debt.debtData.drawOnGraph">
              <span class="slider round"></span>
            </label>
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
    xAxisY = Math.round(this.canvasHeight * 0.85);
    xAxisStart = Math.round(this.canvasWidth * 0.1);
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

    get Debts(): DebtData[]{
      return this.$store.state.DebtState;
    }

    mounted() {
      const canvas: any = document.getElementById("SnowBallChart");
      this.vueCanvas = canvas.getContext("2d");
      this.mapDebtsToDebtPayoffModels();
      this.changePayoffMethod("Custom");
      this.graphEachDebt();
    }

    mapDebtsToDebtPayoffModels(){
      this.Debts.forEach((Debt) => {
        this.totalMonthlyPayment += Debt.minimumPayment;
        this.DebtPayoffModelData.push({
          debtData : Debt,
          additionalPayment : 0,
          additionalPaymentStartingMonth : 0,
          totalInterest: 0,
          totalInterestWithPlan: 0,
          numberOfPayments: 0,
          numberOfPaymentsWithPlan: 0
        });
        this.countPaymentsAndInterest(
            this.DebtPayoffModelData[this.DebtPayoffModelData.length-1]);
      });
    }

    changeGraph(Debt: DebtPayoffModel){
      if(Debt.numberOfPayments < 0){
        Debt.debtData.drawOnGraph = false;
        return;
      }
      Debt.debtData.drawOnGraph = !Debt.debtData.drawOnGraph;
      this.graphEachDebt();
    }

    findLargestAmount(){
      this.largestAmount = 0;
      this.longestNumberOfPayments = 0;
      this.DebtPayoffModelData.forEach((Debt) => {
        if(Debt.debtData.drawOnGraph){
          if(Debt.debtData.amount > this.largestAmount) 
            this.largestAmount = Math.ceil(Debt.debtData.amount / 1000) * 1000;
          if(Debt.numberOfPayments > this.longestNumberOfPayments) 
            this.longestNumberOfPayments = Debt.numberOfPayments;
        }
      });
    }

    graphEachDebt(){
      this.vueCanvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.drawCanvasBackGround()
      this.findLargestAmount();
      this.DebtPayoffModelData.forEach(Debt =>{
        if(Debt.numberOfPayments >= 0 && Debt.debtData.drawOnGraph)
          this.drawWithoutExtra(Debt.debtData.name, 
            Debt.debtData.amount, 
            Debt.numberOfPayments);
      })
    }

    drawCanvasBackGround(){
      this.vueCanvas.fillStyle = "#2f4d2d";
      this.vueCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
      this.vueCanvas.strokeStyle = "#ffcc6e";
      this.vueCanvas.lineWidth = 4;
      this.vueCanvas.lineCap = "round";
      this.vueCanvas.moveTo(this.xAxisStart, this.xAxisY);
      this.vueCanvas.lineTo(this.xAxisEnd+25, this.xAxisY);
      this.vueCanvas.stroke();
    }

    convertX(x:number): number{
      return (x / this.longestNumberOfPayments) 
      * this.chartWidth + this.xAxisStart;
    }

    convertY(y:number): number{
      return this.canvasHeight 
      - (this.canvasHeight - this.xAxisY) 
      - (y / this.largestAmount) * this.chartHeight;
    }

    drawWithoutExtra(debtName:string, startAmount: number, numberOfMonthsLeft: number){
      const yStart = this.convertY(startAmount);
      const xEnd = this.convertX(numberOfMonthsLeft);
      this.vueCanvas.beginPath();
      this.vueCanvas.moveTo(this.xAxisStart, yStart);
      this.vueCanvas.lineTo(xEnd, this.xAxisY);
      this.vueCanvas.stroke();
      this.vueCanvas.font = "11px Comic Sans MS";
      this.vueCanvas.fillStyle = "#ffcc6e";
      this.vueCanvas.textAlign = "end";
      this.vueCanvas.fillText(debtName, this.xAxisStart - 10, yStart);
      
      const finalDate:string[] 
        = this.finalPaymentDate(numberOfMonthsLeft).split(" ");
      this.vueCanvas.fillText(finalDate[0], xEnd, this.xAxisY+20);
      this.vueCanvas.fillText(finalDate[1], xEnd, this.xAxisY+35);
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

    countPaymentsAndInterest(Debt: DebtPayoffModel){
      let amount = Debt.debtData.amount;
      while (amount >= 0) {
        const previousAmount = amount;
        const increaseInInterest = 
          this.interestIncrease(amount, Debt.debtData.interest);

        Debt.numberOfPayments++;
        Debt.totalInterest += increaseInInterest;
        amount += (increaseInInterest - Debt.debtData.minimumPayment);
        if(amount > previousAmount) {
          Debt.numberOfPayments = -1;
          Debt.debtData.drawOnGraph = false;
          return;
        }
      }
    }

    finalPaymentDate(numberOfMonths: number): string{
      const date: Date = new Date();
      const now: Date = new Date();
      date.setMonth(date.getMonth() + numberOfMonths);
      const months = 
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      return (date > now) ? 
        months[date.getMonth()] + " " + date.getFullYear() 
        : "Debt growing faster than payment!";
    }

    interestIncrease(amount: number, interest: number): number {
      return (amount * (interest * 0.01) / 12);
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