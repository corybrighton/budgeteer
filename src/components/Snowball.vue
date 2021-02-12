<template>
  <div class="row d-flex justify-content-center">
    <h1 class="col-12 d-flex justify-content-center"> <i class="fas fa-chart-area"></i> Snowball</h1>
    
    <!-- List of Debts -->
    <div class="col-2">
      <div class="d-flex flex-column">
        <div class="pill primary d-flex justify-content-between my-1" v-for="(Debt, i) in Debts" :key="Debt.name">
          <div class="debtNumber secondary">{{i+1}}</div>
          <div class="mr-2">{{Debt.name}}</div>
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

  @Component
  class Snowball extends Vue {
    vueCanvas: any;
    canvasHeight = screen.height * 0.6;
    canvasWidth = screen.width * 0.6;
    extraPayment = 0;

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
    }

    draw(){
      const axisStart = 20;
      const axisEnd = 1100;
      const axisOffSet = 590;
      this.vueCanvas.fillStyle = "#2f4d2d ";
      this.vueCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
      this.vueCanvas.strokeStyle = "#ffcc6e";
      this.vueCanvas.lineWidth = 6;
      this.vueCanvas.lineCap = "round"
      this.vueCanvas.moveTo(axisStart, axisOffSet);
      this.vueCanvas.lineTo(axisEnd, axisOffSet);
      this.vueCanvas.stroke();
    }

    drawGraph(){
      this.vueCanvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }
  export default Snowball;
</script>

<style scoped>
  canvas {
    border: 1px solid black;
  }

  .pill {
    padding-right: .6em;
    padding-left: .6em;
    border-radius: 10rem;
  }

  .debtNumber{
    font-size: .8em;
    border-radius: 50%;
    padding: .2em .4em;
    margin: .2em 0;
  }
</style>