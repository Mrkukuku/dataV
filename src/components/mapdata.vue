<template>
         <dv-full-screen-container>
                <map></map>
                <div class="headers"> 
                    <dv-decoration-8 style="width: 25%;height: 60px;" />
                    <dv-decoration-5 style="width: 40%;height: 60px;margin-top: 30px;" />    
                    <dv-decoration-8 :reverse="true" style="width: 25%;height: 60px;" />
                    <div class="title">绍兴市应急大数据可视化平台</div>
                </div>
                    <div class="chart_left"> 
                        <dv-border-box-1>
                            <div class="left_tops">
                                <LeftTopCmp></LeftTopCmp>
                            </div>
                            <div class="left_middle">
                                <LeftMiddleCmp></LeftMiddleCmp>
                            </div>
                            <div class="left_bottom">
                                <LeftBottomCmp></LeftBottomCmp>
                            </div>
                        </dv-border-box-1> 
                    </div>

                    <div class="chart_right"> 
                        <dv-border-box-1>
                            <div class="right_top">
                                <RightTopCmp></RightTopCmp>
                            </div>
                            <div class="right_middle">
                                <RightMiddleCmp></RightMiddleCmp>
                            </div>
                            <div class="right_bottom">
                                <RightBottomCmp></RightBottomCmp>
                            </div>
                        </dv-border-box-1> 
                    </div>
                <div class="bottom">
                    <div class="bottom_right">
                        <!-- <dv-decoration-7 style="width:100%;height:100%;">2019-12-23 15:41:30</dv-decoration-7> -->
                    
                    </div>
                </div>
         </dv-full-screen-container>
</template>

<script>
import map from './common/map'
import RightBottomCmp from './common/RightBottomCmp'
import LeftMiddleCmp from './common/LeftMiddleCmp'
import RightTopCmp from './common/RightTopCmp'
import LeftBottomCmp from './common/LeftBottomCmp'
import LeftTopCmp from './common/LeftTopCmp'
import RightMiddleCmp from './common/RightMiddleCmp'
export default {
    components:{
        map,RightBottomCmp,LeftMiddleCmp,RightTopCmp,LeftBottomCmp,LeftTopCmp,RightMiddleCmp
    },
    data() {
        return {
            
        }
    },
    methods: {
        getTime () {
            
        }
    },
    mounted() {
        
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
    // .main{
        // position: relative;
        // height:  calc(100% - 200px);
        // width: 100%;
        // position: absolute;
        // top: 100px;
        .chart_left{
            position: absolute;
            height:calc(100% - 180px);
            width: 20%;
            top: 100px;
            left: 2%;
            background-color: rgba(10, 32, 50, 0.5);
            color: #FFF;
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
    // }
    .bottom{
        height: 80px;
        width: 100%;
        position: absolute;bottom: 0;
        .bottom_right{
         height: 100%;
         width: 20%;
         float: right;
         margin-right: 2%;
         background-color: rgba(10, 32, 50, 0.5);
        }
    }
</style>