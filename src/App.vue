<template>
  <div id="app">
    
    <!-- <HelloWorld/> -->
    <!-- <div class="circle animated wobble" @click="stop" ref="circle" :class="{infinite:flag}"></div> -->
    <!-- <vido></vido> -->
    <!-- <Map></Map> -->
    <!-- <hotmap></hotmap> -->
    <!-- <players></players> -->
    <!-- <move></move> -->
    <!-- <echar></echar> -->
    <!-- <cascader/> -->
    <!-- <dataV></dataV> -->
    <!-- <Charts></Charts> -->
     <!-- <MapData></MapData> -->
     <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import vido from './components/vido'
// import Map from './components/map'
import hotmap from './components/hotmap'
import players from './components/player'
import move from './components/move'
import cascader from './components/cascader'
import echar from './components/echar'
import dataV from './components/dataV'
import datacharts from './components/datacharts'
// import MapData from './components/MapData'

export default {
  name: 'App',
  components: {
    HelloWorld,vido,hotmap,players,move,cascader,echar,dataV,datacharts
  },
  data() {
    return {
      flag:true
    }
  },
  methods: {
    stop () {
      this.flag = false
    } 
  },
}
</script>

<style>
    #app{
      height: 100%;
      width: 100%;
    }
</style>
