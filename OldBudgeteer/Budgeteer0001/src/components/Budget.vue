<template>
  <h1>Budget</h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Budget extends Vue {
  private budgets: Budget = new Budget();
}
</script>
