<template>
  <div>
    <h1> <i class="fas fa-chart-area"></i> Snowball</h1>
    <canvas id="c"></canvas>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Snowball extends Vue {
    vueCanvas;
    rectWidth = 100;

    mounted() {
      this.vueCanvas = document.getElementById("c").getContext("2d");
      this.vueCanvas.clearRect(0, 0, 400, 200);

      // draw rect
      this.vueCanvas.beginPath();
      this.vueCanvas.rect(20, 20, this.rectWidth, 100);
      this.vueCanvas.stroke();
    }
  }
</script>