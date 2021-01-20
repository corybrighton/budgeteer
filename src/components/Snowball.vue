<template>
  <div>
    <h1> <i class="fas fa-chart-area"></i> Snowball</h1>
    <canvas id="SnowBallChart"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Snowball extends Vue {
    vueCanvas: any;

    mounted() {
      const canvas = <HTMLCanvasElement>document.getElementById("SnowBallChart")
      this.vueCanvas = canvas.getContext("2d");
      this.vueCanvas.clearRect(0, 0, 400, 200);

      // draw rect
      this.vueCanvas.beginPath();
      this.vueCanvas.rect(20, 20, 100, 100);
      this.vueCanvas.stroke();
    }
  }
</script>