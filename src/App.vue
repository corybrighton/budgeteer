<template>
  <NavBar />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './components/NavBar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>

<style>
  
/* <color name="primaryColor">#2f4d2d</color>
<color name="primaryLightColor">#5a7956</color>
<color name="primaryDarkColor">#082503</color>
<color name="secondaryColor">#d19b3f</color>
<color name="secondaryLightColor">#ffcc6e</color>
<color name="secondaryDarkColor">#9c6d0a</color>
<color name="primaryTextColor">#ffffff</color>
<color name="secondaryTextColor">#000000</color> */
 
 .primary {
   background-color: #2f4d2d;
   color: #ffffff;
 }
  .secondary {
    background-color: #ffcc6e;
    border-color: #ffcc6e;
    color: #000;
  }

  .lightColor{
    background-color: #5a7956;
    color: white;
  }
</style>
