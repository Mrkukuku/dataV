<template>
       <div class="playVideo">
         <div class="container" ref="container">
            <video  ref="video" src="../../static/test.mp4" poster=""></video>
            <div class="control">
                <el-button @click="switchBtn" class="movie">播放/暂停</el-button>
                <div class="process" @click="processLineBtn" ref="process">
                    <div ref="bar" class="bar"></div>
                </div>
                <div class="time">
                    <span>{{currenttime}}</span> /
                    <span>{{durationtime}}</span> 
                </div>
            </div>
        </div>
        <el-button @click="jump">跳转</el-button>

    </div>
</template>

<script>
export default {
    data () {
            return{
                currentVideo: '',
                video: undefined,
                currenttime: '00:00:00',
                durationtime: '00:00:00',
                videoTime: undefined,
                barWidth: '',
                num: 1,
                flag: true,
            }
        },
        created() {
            
        },
        mounted() {
            this.video = this.$refs.video;
            this.getVideoDura();
        },
        updated() {
            this.video = this.$refs.video;
            this.getVideoDura();
        },
        methods:{
            jump () {
                // this.video.currentTime = 10
                console.log(this.$refs.process.offsetWidth)
            },
            // 获取视频总时长
            getVideoDura() {
                var vid = this.video;
                setTimeout(() => {
                    var total = vid.duration;
                    this.durationtime = this.getTime(total);
                }, 800);
            },
            // 播放视频的开关
            switchBtn() {
                let video = this.video;
                if(video.paused) {
                    this.getVideoCurrent();
                    video.play();
                } else {
                    video.pause();
                    clearInterval(this.videoTime);
                }
            },
            // 获取视频播放的进度
            getVideoCurrent() {
                var that = this;
                this.videoTime = setInterval(function () {
                    if (that.getTime(that.video.currentTime) == that.durationtime) {
                        that.$refs.bar.style.width = '100%'
                        clearInterval(that.videoTime);
                    } else {
                        that.currenttime = that.getTime(that.video.currentTime);
                        that.barWidth = that.$refs.process.offsetWidth * that.video.currentTime / that.video.duration;
                        that.$refs.bar.style.width = that.barWidth + 'px';
                    }
                }, 200);
            },
            // 进度条点击
            processLineBtn(e) {
                this.num += 1;
                if ( this.num > 1) {
                    localStorage.setItem('barWidth', this.barWidth);
                }
                var losW = undefined;
                if (localStorage.getItem('barWidth')) {
                    losW = parseFloat(localStorage.getItem('barWidth'))
                }
                if (e.offsetX < losW) { // 
                    this.currenttime = this.getTime(this.video.duration * e.offsetX / this.$refs.process.offsetWidth);
                    this.video.currentTime = this.video.duration * e.offsetX / this.$refs.process.offsetWidth
                } else if (e.offsetX > this.barWidth && e.offsetX < losW) {
                    this.currenttime = this.durationtime * e.offsetX / this.$refs.process.offsetWidth;
                } else if (e.offsetX > this.barWidth) {
                    return;
                }
            },
            // 全屏按钮
            fullBtn() {
                if (this.flag) {
                    this.flag = false;
                    this.$refs.container.style.height = '100%';
                    this.video.style.width = '100%';
                    this.video.style.height = '100%';
                } else {
                    this.flag = true;
                    this.$refs.container.style.height = '4.24rem';
                    this.video.style.width = '100%';
                    this.video.style.height = '4.24rem';
                }
            },
            getTime(time){
                var hours = Math.floor(time%86400/3600);
                var minutes = Math.floor(time%86400%3600/60);
                var seconds = Math.floor(time%60);
                hours = hours >= 10 ? hours : '0' + hours;
                minutes = minutes >= 10 ? minutes : '0' + minutes;
                seconds = seconds >= 10 ? seconds : '0' + seconds;
                
                var str = '';
                str = hours + ':' + minutes + ':' + seconds;
                return str;
            },
        },

}
</script>


<style lang="scss">
// .playVideo {
//         width: 100%;
//         height: 100%;
//     }

.container {
    position: relative;
    width: 100%;
}

.container video {
    width: 100%;
    height: 600px;
    object-fit: scale-down;
}
.container  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: .3rem;
    bottom: .1rem;
    width: 800px;
    height: .3rem;
    margin: 0 auto;
    border-radius: .05rem;
    background: rgba(0, 0, 0, .5);
    .movie{
        position: absolute;
        left: 50px;
        top: -50px;
    }
}

.process {
    width: 100%;
    height: .18rem;
    border-radius: .09rem;
    background-color: #555;
    overflow: hidden;
    cursor: pointer;
.bar {
    width: 0px;
    height: 100%;
    background-color: #fff;
}
.control .time {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 0 .1rem;
}
}
 

    
</style>