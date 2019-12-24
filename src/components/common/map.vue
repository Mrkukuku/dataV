<template>
    <div class="wrapper">
        <div  id="container" tabindex="0"> </div>
    </div>
</template>


<script>
import AMap from "AMap";
export default {
    data() {
        return {
            center:[120.582112,29.997117]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init () {
            var _this = this
            this.map = new AMap.Map('container', {
                center:_this.center,
                resizeEnable: true,
                zoom: 25,
                lang: "ch"
            });
           this.map.setMapStyle("amap://styles/darkblue");


        }
    },
}
</script>



<style lang="scss">
    .wrapper {
        height: 100%;
        width: 100%;
    }
    #container{
        height: 100%;
        width: 100%;
        outline: none!important;
    }
</style>