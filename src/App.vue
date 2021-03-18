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

  .pointer{
    cursor: pointer;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 17px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #9c6d0a;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: #ffcc6e;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #5a7956;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #5a7956;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
