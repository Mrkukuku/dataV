<template>
   <div class="tops">
         <div class="table-name">
            <div style="float: right;"> 平台报警数量日统计:2518 </div> 
            <dv-decoration-2  dur=1 style="width:100%;height:5px;" />
        </div>
       <div class="firefighting">
          <dv-capsule-chart :config="config" style="width:100%;height:100%" />
       </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            config:{
                data: [
                    {
                    name: '越都社区',
                    value: 258
                    },
                    {
                    name: '绍兴金帝银泰城',
                    value: 568
                    },
                    {
                    name: '柯桥银泰百货',
                    value: 156
                    },
                    {
                    name: '(柯桥区) 金汇大厦',
                    value: 534
                    },
                    {
                    name: '（衢州市）吾悦华府',
                    value: 426
                    },
                    {
                    name: '（柯桥区）国贸大厦',
                    value: 459
                    },
                    {
                    name: '（柯桥区）银泰百货',
                    value: 153
                    }
                ]
            }
        }
    },
}
</script>

<style lang="scss">
    .tops{
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        .firefighting{
            flex: 1;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>