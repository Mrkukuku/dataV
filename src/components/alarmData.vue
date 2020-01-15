<template>
        <dv-full-screen-container>
            
            <maps :module="1" ref="maps"></maps>

            <div class="headerss"> 
                    <dv-decoration-8 style="width: 25%;height: 60px;" />
                    <dv-decoration-5 style="width: 40%;height: 60px;margin-top: 30px;" />    
                    <dv-decoration-8 :reverse="true" style="width: 25%;height: 60px;" />
                    <div class="title">绍兴市应急大数据可视化平台</div>
            </div>

            <div class="chart_lefts">
               
                <div class="weather_alarm">
                    <transition enter-active-class="animated zoomInDown">
                        <weather v-if="flag"></weather>
                    </transition>
                </div>
                <transition-group enter-active-class="animated zoomInDown"  tag="ul" style="overflow: hidden;flex: 1;">
                    <div class="fire_station" v-if="flag" :key="3">
                        <div class="title" @click="change([120.582474,29.996887])" :key="1">
                            消防站
                        </div>
                        <div class="content" :key="2">
                            <div class="list" v-for="(item, index) in fireStation" :key="index+3">
                                <div class="name" >
                                    <div class="index"  >{{index+1}}</div>  
                                    <span class="names" > {{item.site}} </span> 
                                </div>
                                <div class="address" >
                                    <div class="img" >
                                        <img src="../../static/img/address.png" alt="" >
                                        </div> 
                                        <span class="addre"  > {{item.address}} </span>
                                    </div>
                                <div class="distance"  >
                                    <span class="km">距离报警点 : {{item.distance}}km</span>
                                    <span class="detail" >详情 > </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>

            <div class="chart_rights">
                <div class="right_tops">

                  <transition enter-active-class="animated zoomInDown">
                        <RightTopAlarm v-if="flag"></RightTopAlarm>
                  </transition>
                    
                </div>
                <div class="right_middles">
                    <transition enter-active-class="animated zoomInDown">
                        <RightMiddleAlarm v-if="flag" ></RightMiddleAlarm>
                    </transition>
                </div>
                <div class="right_bottoms">
                     <transition enter-active-class="animated zoomInDown">
                        <RightBottomAlarm v-if="flag" ></RightBottomAlarm>
                    </transition>
                </div>

            </div>

            <transition-group enter-active-class="animated zoomInDown">
                <div class="bottom_middles"v-if="flag" key="5">
                        <dv-border-box-8   key="1">
                            <span class="data" key="2">报警大数据</span> 
                            <div style="position:relative" key="3"> <span class="dot"></span> <span class="total">报警总数</span>  18501个</div> 
                            <div style="position:relative" key="4"> <span class="dot"></span> <span class="total">平均出警时间</span>  5.1分钟</div>
                        </dv-border-box-8>
                </div>
            </transition-group>

            <div class="bottom_alarm">
                    <div class="bottom_left">
                            <div class="bottom_content">
                                <img src="../../static/img/icon1 (2).png" alt="" @click="exit(1)">
                                <img src="../../static/img/icon1 (1).png" alt="" >
                                <img src="../../static/img/icon1 (3).png" alt="">
                            </div>
                    </div>
                    <div class="bottom_right">
                            <span>{{time}}</span> 
                    </div>
            </div>

            <!-- <transition enter-active-class="animated zoomInDown"> -->
                <waringPopout ref="cads"></waringPopout>
            <!-- </transition> -->

        </dv-full-screen-container>
</template>

<script>
import icons from '../../static/img/huo.png'
import AMap from "AMap";
import Vue from 'vue'
import maps from './common/map'
import waringPopout from './alarmAnalysis/waringPopout'
import RightTopAlarm from './alarmAnalysis/RightTopAlarm'
import RightMiddleAlarm from './alarmAnalysis/RightMiddleAlarm'
import RightBottomAlarm from './alarmAnalysis/RightBottomAlarm'
import weather from './alarmAnalysis/weather'
export default {
  components:{
    maps,waringPopout,RightMiddleAlarm,RightTopAlarm,RightBottomAlarm,weather
  },
  data() {
    return {
      dotArr:[],
      time:"",//时间
      flag:false,
      fireStation:[//消防站
          {
              site:"绍兴市上虞区煌家公馆娱乐会所",
              address:"上虞市百官街道王充路538-552号",
              distance:3
          },
          {
              site:"上虞市金科时代潮城商贸有限公司",
              address:"上虞区市民大道621号",
              distance:5
          },
          {
              site:"上虞颖泰精细化工有限公司",
              address:"浙江省上虞区经济开发区纬九路9号",
              distance:9
          },
          {
              site:"永农生物科学有限公司",
              address:"杭州湾工业园纬七东路3号",
              distance:13
          },
          {
              site:"浙江安诺芳胺化学品有限公司",
              address:"浙江省绍兴市上虞区杭州湾经济开发区纬三路15号",
              distance:14
          },
          {
              site:"上虞宾馆有限公司",
              address:"上虞区百官街道新河路2号",
              distance:17
          },
      ]
    }
  },
  methods: {
      showCad () {
          this.$refs.cads.showcad()
      },
      change (lnglat) {
           var map = this.$refs['maps'].map1
           var _this = this
        //    if ( this.dotArr && this.dotArr.length >0 ) {
        //        for (var i = 0; i < this.dotArr.length; i++){
        //             this.dotArr[i].setMap(null);
        //         }
        //    }
           var index = new AMap.Marker({//创建点标记/
                icon:icons,
                position: lnglat,
            });
            index.setMap(map)
            //  _this.dotArr.push(index)
            map.setZoom(15)
            setTimeout ( () => {
                map.setZoom(10)
            },1000)
            map.setCenter(lnglat)
            // setTimeout( () => {
            //     var lnglat1 = new AMap.LngLat(lnglat[0],lnglat[1]);
            //     index.moveTo(lnglat1, 200000, function (k) { 
            //         if( k > 0.98) {showInfo()}; 
            //         return k;
            //     });
            // },300)
            index.on('click',showInfo)
            showInfo()
            function showInfo () {
                var infoWindow = new AMap.InfoWindow({//信息窗口
                    offset: new AMap.Pixel(-88,52),
                    anchor: "top-left",
                    showShadow: true,
                    isCustom: true,
                    position: lnglat,                                                          
                });
                // _this.dotArr.push(infoWindow)
                _this.$refs['maps'].infoArr.push(infoWindow)
                infoWindow.setMap(map);
                var MyComponent = Vue.extend({
                    template: `<div style="background: rgba(7, 44, 77, .8);opacity: .9;width: 371px;height:170px;padding: 28px; box-sizing: border-box;color:#fff;position: relative;">
                        <div style="flex:390;">
                            <div style="display: flex;justify-content: space-between;">
                                <h3 style="font-size:16px;">鼎任科技网络有限公司</h3> <span style="cursor: pointer;font-size:12px;margin-top:5px;" @click="show">查看详情 ></span>
                            </div>
                            <div style="width:300px;padding:15px 0;text-align: left;">
                                <p style="font-size:14px;">地址:</p>
                                <p style="font-size:14px;margin:10px 0;">控制室电话:</p>
                                <p style="font-size:14px;">主页负责人电话:</p>
                            </div>
                        </div>
                        <div class="arrows" style="position: absolute; top: -31px; left: 100px;border-right: 10px solid transparent;border-left: 10px solid transparent;border-bottom: 30px solid rgba(10, 32, 50, .8);"></div>
                    </div>`,
                    methods:{
                        show () {
                            _this.showCad()
                        }
                    }
                })
                var component= new MyComponent().$mount();
                infoWindow.setContent( component.$el )
            }
      },
      getTime () {
        this.time =  this.$moment( new Date() ).format("YYYY-MM-DD HH:mm:ss")
      },
      getTimeLoop () {
        this.timer =  setInterval( ()=> {
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
      this.getTimeLoop()
      this.showTransition()
  },
  destroyed() {
      clearInterval(this.timer)
  },
}
</script>


<style lang="scss">
    .ellips{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
 
    
    .headerss{
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
    .weather_alarm{
        // position: absolute;
        // left: 23%;
        // top: 172px;
        // width:367px;
        height: 100px;
        width: 92%;
        // background-color: rgba(7, 44, 77, 0.8);
        // border-radius: 20px;
        margin-left: 3%;
        margin-top: 10px;
    }
    .chart_lefts{
        position: absolute;
        height:calc(100% - 180px);
        width: 21%;
        top: 100px;
        left: 1%;
        background-color: rgba(7, 44, 77, 0.5);
        color: #FFF;
        z-index: 100;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .fire_station{
             margin-left: 3%;
             margin-top: 5px;
            //  flex: 1;
            height: 100%;
             display: flex;
             flex-direction: column;
             overflow: hidden;
            .title{
                font-size: 24px;
            }
            .content{
                flex: 1;
                width: 100%;
                overflow-y: auto;
                &::-webkit-scrollbar{
                    width: 5px;
                }
                &::-webkit-scrollbar-thumb { 
                    border-radius: 10px;
                    box-shadow: inset 0 0 5px #232D36;
                    background-color: rgba(7, 44, 77, 0.8);
                }
                .list{
                    width: 95%;
                    height: 142px;
                    background-color: rgba(7, 44, 77,.8);
                    overflow: hidden;
                    border-radius: 16px;
                    margin-top: 2%;
                    cursor: pointer;
                    &:hover{
                        transform: translate3d(0,-3px,0);
                    }
                    .name,.address,.distance{
                        font-size: 18px;
                        margin-left: 5%;
                        margin-top: 5%;
                        display: flex;
                        width: 95%;
                        .index{
                            height: 25px;
                            width: 25px;
                            border-radius: 50%;
                            background-color: rgba(62,149,164,1);
                            text-align: center;
                            font-weight: 600;
                        }
                        .names{
                            flex: 1;
                            padding-left: 12px;
                            box-sizing: border-box;
                            @extend .ellips;
                        }
                    }
                    .address{
                        font-size: 16px;
                        .img{
                            margin-right: 15px;
                        }
                        .addre{
                             flex: 1;
                            @extend .ellips;
                        }
                    }
                    .distance{
                        font-size: 13px;
                        justify-content: space-between;
                        width: 85%;
                        margin-left: 6%;
                        .detail{
                            font-size: 14px;
                            color: rgba(0,146,186 ,1);
                            font-weight: 300;
                        }
                        .km{
                            opacity: .6;
                        }
                    }                    
                }
            }

        }
    }
    .chart_rights{
        position: absolute;
        height:calc(100% - 180px);
        width: 21%;
        top: 100px;
        right:1%;
        z-index: 100;
        background-color: rgba(7, 44, 77, 0.5);
        color: #FFF;
        .right_tops{
            width: 92%;
            height: 25%;
            position: absolute;
            top: 3%;
            right: 4%;
            display: flex;
        }
        .right_middles{
            width: 95%;
            height: 35%;
            position: absolute;
            top:28%;
            right: 2%;
        }
        .right_bottoms{
            width: 92%;
            height: 35%;
            position: absolute;
            right: 4%;
            bottom: 1%;
        }
    }
    .bottom_middles{
        width: 45%;
        height: 120px;
        position: absolute;
        bottom: 100px;
        left: 26%;
        background-color: rgba(7, 44, 77, 0.5);
        color: #FFF;
        font-size: 22px;
         font-weight: bolder;
        .border-box-content{
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .dot{
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: rgba(0,203,254,1);
            position: absolute;
            left: -25px;
            top: 11px;
        }
        .total{
            font-weight: normal;
            font-size: 17px;
        }
    }
    .bottom_alarm{
        height: 80px;
        width: 100%;
        position: absolute;bottom: 0;
        z-index: 100;
        color: #FFF;
        //  background-color: rgba(10, 32, 50, 1);
        .bottom_right{
            height: 100%;
            width: 21%;
            float: right;
            margin-right: 1%;
            font-size: 24px;
            // color: #08e5ff;
            background-color: rgba(7, 44, 77, .6);
            text-align: center;
            line-height: 80px;
        }
        .bottom_left{
            height: 100%;
            width: 21%;
            float: left;
            margin-left: 1%;
            font-size: 24px;
            background-color: rgba(7, 44, 77, .6);
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
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 2s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-400px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(400px);
    }

</style>