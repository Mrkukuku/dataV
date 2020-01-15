<template>
        <!-- <div class="screen_wrapper"> -->

         <dv-full-screen-container>
                <maps :module="0"></maps>
                <div class="headers"> 
                    <dv-decoration-8 style="width: 25%;height: 60px;" />
                    <dv-decoration-5 style="width: 40%;height: 60px;margin-top: 30px;" />    
                    <dv-decoration-8 :reverse="true" style="width: 25%;height: 60px;" />
                    <div class="title" @click="flag=!flag">绍兴市应急大数据可视化平台</div>
                </div>
                    <div class="chart_left"> 
                        <dv-border-box-1>
                            <div class="left_tops">
                                 <transition enter-active-class="animated slideInLeft" mode="out-in">
                                    <LeftTopCmp v-if="flag"></LeftTopCmp>
                                 </transition>
                            </div>
                            <div class="left_middle">
                                <transition enter-active-class="animated slideInLeft" mode="out-in">
                                    <LeftMiddleCmp v-if="flag"></LeftMiddleCmp>
                                </transition>
                            </div>
                            <div class="left_bottom">
                                  <transition enter-active-class="animated slideInLeft" mode="out-in">
                                    <LeftBottomCmp v-if="flag"></LeftBottomCmp>
                                  </transition>  
                            </div>
                        </dv-border-box-1> 
                    </div>
                    <div class="chart_right"> 
                        <dv-border-box-1>
                            <div class="right_top">
                                
                                <transition enter-active-class="animated slideInRight" mode="out-in">
                                    <RightTopCmp v-if="flag"></RightTopCmp>
                                </transition>
                            </div>
                            <div class="right_middle">
                                 <transition enter-active-class="animated slideInRight" mode="out-in">
                                    <RightMiddleCmp v-if="flag"></RightMiddleCmp>
                                 </transition>
                            </div>
                            <div class="right_bottom">
                                 <transition enter-active-class="animated slideInRight" mode="out-in">
                                    <RightBottomCmp v-if="flag"></RightBottomCmp>
                                 </transition>
                            </div>
                        </dv-border-box-1> 
                    </div>

                <div class="bottom">
                    <div class="bottom_left">
                            <div class="bottom_content">
                                <img src="../../static/img/icon1 (2).png" alt="" @click="exit(1)">
                                <img src="../../static/img/icon1 (1).png" alt="" @click="exit(2)">
                                <img src="../../static/img/icon1 (3).png" alt="">
                            </div>
                    </div>
                    <div class="bottom_right">
                            <span>{{time}}</span> 
                    </div>
                </div>
         </dv-full-screen-container>
        <!-- </div> -->

</template>

<script>
import maps from './common/map'  
import RightBottomCmp from './scoreAnalysis/RightBottomCmp'
import LeftMiddleCmp from './scoreAnalysis/LeftMiddleCmp'
import RightTopCmp from './scoreAnalysis/RightTopCmp'
import LeftBottomCmp from './scoreAnalysis/LeftBottomCmp'
import LeftTopCmp from './scoreAnalysis/LeftTopCmp'
import RightMiddleCmp from './scoreAnalysis/RightMiddleCmp'
export default {
    components:{
        maps,RightBottomCmp,LeftMiddleCmp,RightTopCmp,LeftBottomCmp,LeftTopCmp,RightMiddleCmp
    },
    data() {
        return {
            time :"",
            flag:false
        }
    },
    methods: {
        getTime () {
            this.time =  this.$moment( new Date() ).format("YYYY-MM-DD HH:mm:ss")
        },
        getTimeLoop () {
           this.timer = setInterval( ()=> {
                this.getTime()
            },1000)
        },
        showTransition () {
            setTimeout( () => {
                this.flag = true
            },500)
        },
        exit (type) {//退出
            if ( type == 1 ) {
                sessionStorage.clear();
                this.$router.push('/')
            }
        },
    },
    mounted() {
        this.getTime()
        this.getTimeLoop()
        this.showTransition()

    },
    destroyed() {
        clearInterval(this.timer)
    },
}
</script>


<style lang="scss">
   #dv-full-screen-container{
    //    height: 100%!important;
    //    color: #FFF;
        background-color: rgba(10, 32, 50, 0.5);
    }
    .headers{
        height: 100px;
        width: 100%;
        width: 100%;
        display: flex;
        justify-content:space-between;
        color: white;
        position: absolute;
        top: 0;
        z-index: 100;
        // background-color: #000001;
        // background-color: rgba(10, 32, 50, 1);
        .title{
            position: absolute;
            font-size: 30px;
            font-weight: 700;
            left: 50%;
            top: 15px;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%)
        }
    }
    
    .chart_left{
        position: absolute;
        height:calc(100% - 180px);
        width: 20%;
        top: 100px;
        left: 2%;
        background-color: rgba(10, 32, 50, 0.5);
        color: #FFF;
        z-index: 100;
        .dv-border-box-1 .right-top,.dv-border-box-1 .right-bottom{
            display: none;
        }
        .left_tops{
            width: 94%;
            height: 26%;
            position: absolute;
            top: 3%;
            left: 4%;
        }
        .left_middle{
            width: 90%;
            height: 30%;
            position: absolute;
            top: 31%;
            left: 4%;
        }
        .left_bottom{
            width: 90%;
            height: 32%;
            position: absolute;
            bottom: 1%;
            left: 4%;
        }
    }
    .chart_right{
        position: absolute;
        height:calc(100% - 180px);
        width: 20%;
        top: 100px;
        right:2%;
        z-index: 100;

        background-color: rgba(10, 32, 50, 0.5);
        .dv-border-box-1 .left-bottom, .dv-border-box-1 .left-top{
            display: none;
        }
        .right_top{
            width: 90%;
            height: 30%;
            position: absolute;
            top: 3%;
            right: 4%;
        }
        .right_middle{
            width: 90%;
            height: 32%;
            position: absolute;
            top: 35%;
            left: 4%;
            color: #FFF;
            
        }
        .right_bottom{
            position: absolute;
            width: 90%;
            height: 28%;
            bottom: 1%;
            right: 4%;
        }

    }
  
    .bottom{
        height: 80px;
        width: 100%;
        position: absolute;bottom: 0;
        z-index: 100;
        color: #FFF;
        //  background-color: rgba(10, 32, 50, 1);
        .bottom_right{
            height: 100%;
            width: 20%;
            float: right;
            margin-right: 2%;
            font-size: 24px;
            // color: #08e5ff;
            background-color: rgba(10, 32, 50, .6);
            text-align: center;
            line-height: 80px;
        }
        .bottom_left{
            height: 100%;
            width: 20%;
            float: left;
            margin-left: 2%;
            font-size: 24px;
            background-color: rgba(10, 32, 50, .6);
            text-align: center;
            line-height: 80px;
            .bottom_content{
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                img{
                    cursor: pointer;
                }
            }
        }
        
    }
</style>