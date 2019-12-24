<template>
    <div class="box">
            <video-player class="video-player-box"
                  :options="playerOptions"
                  :playsinline="true"
                  customEventName="customstatechangedeventname"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @statechanged="playerStateChanged($event)"
                  @ready="playerReadied"
                  >
            </video-player>
      <div class="shadow">

      </div>
      <!-- <button @click="change">切换</button> -->
    </div>
</template>

<script>
import "video.js/dist/video-js.css"
import { videoPlayer } from "vue-video-player"
import "videojs-flash"
import SWF_URL from 'videojs-swf/dist/video-js.swf'
export default {
    components:{
        videoPlayer
    },
    data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        autoplay: true,
        width: '460',
        height: '360',
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0,3.0],
        sources: [
          {
            // type: 'application/x-mpegURL',
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            src: "rtmp://58.200.131.2:1935/livetv/hunantv"
          }
        ],
        techOrder: ['flash'],
        flash: {
          hls: {
            withCredentials: false
          },
          swf: SWF_URL
        },
        controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            currentTimeDisplay: false, // 当前时间
            volumeControl: false, // 声音控制键
            playToggle: true, // 暂停和播放键
            progressControl: false, // 进度条
            fullscreenToggle: true // 全屏按钮
         },
      }
    }
  },
  methods: {
    change () {
      this.playerOptions.sources[0].src = "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
    },
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
      return false;
      // player.play()
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>


<style lang="">
    .box{
      height: 600px;
      width: 600px;
      position: relative;
    }
    .shadow{
      position: absolute;
      height: 500px;
      width: 100%;
    }
</style>