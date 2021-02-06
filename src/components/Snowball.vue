<template>
  <div class="row d-flex justify-content-center">
    <h1> <i class="fas fa-chart-area"></i> Snowball</h1>
    <div class="col-12 d-flex justify-content-center">
      <canvas class="selector-for-some-widget" id="SnowBallChart" :height="canvasHeight" :width="canvasWidth"></canvas>
    </div>
    <div @click="draw()">Here will be the debts</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  class Snowball extends Vue {
    vueCanvas: any;
    canvasHeight = screen.height * 0.6;
    canvasWidth = screen.width * 0.6;

    mounted() {
      const canvas: any = document.getElementById("SnowBallChart");
      this.vueCanvas = canvas.getContext("2d");
      this.draw();
    }

    draw(){
      this.vueCanvas.fillStyle = "#2f4d2d ";
      this.vueCanvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
      this.vueCanvas.strokeStyle = "#ffcc6e";
      this.vueCanvas.lineWidth = 10;
      this.vueCanvas.lineCap = "round"
      this.vueCanvas.moveTo(20, 20);
      this.vueCanvas.lineTo(20, 570);
      this.vueCanvas.stroke();
    }

    drawGraph(){
      this.vueCanvas.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
    }
  }
  export default Snowball;
</script>

<style scoped>
  canvas {
    border: 1px solid black;
  }
</style>