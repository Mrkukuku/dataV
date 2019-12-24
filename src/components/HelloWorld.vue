<template>
  <div class="hello">
    <div style="height:600px" id="container" tabindex="0">
      <input id="pickerInput" placeholder="输入关键字选取地点"  />
      <div id="poiInfo"></div>
    </div>

      
      

      <!-- <el-button type="primary"  @click="switchF" class="btn">打开</el-button>
       <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :direction="direction"
          class="drawer"
          size= '35%'
          :modal= false
          :wrapperClosable= false
          >
          <span>我来啦!</span>
      </el-drawer>-->
      <!-- <div style="background: #414E56;opacity: .8;width: 600px;height:200px;display: flex;padding: 20px;color:#fff">
        <div style="flex: 350;height:200px">
            <h3>杭州鼎任科技有限公司</h3>
            <div>
              <p>控制室:054-1568996</p>
              <p>主要负责人:154956498556</p>
              <p>地址:浙江省杭州市下城区朝晖街道中国移动(新市街营业厅)朝晖五小区</p>
            </div>
        </div>
        <div style="flex: 250;height:200px">
            <img style="width:200px;height:200px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567767404488&di=4923e1829c0aef0dab42a3a2ac1873e6&imgtype=0&src=http%3A%2F%2Fs2.lvjs.com.cn%2Fuploads%2Fpc%2Fplace2%2F2016-04-07%2F3fb78042-6ab4-41b8-889a-103f2f31b58a.jpg"/>
        </div>
      </div>-->
    
  </div>
</template>


<style scoped>
#pickerInput{
  width: 160px;
  height: 10px;
  border-radius: 20px;
  padding: 10px;
  background: #414e56;
  opacity: .6;
  color: #fff;
  position: absolute;
  z-index: 10;
  left: 30px;
  top: 50px;
}
input::-webkit-input-placeholder { /* WebKit browsers */
  color: #83888E;
  font-size: 12px
 
}
input{
 outline: none;
}
.info {
  width: 300px;
  height: 200px;
  background: #414e56;
  opacity: 0.5;
}
.amap-info-content {
  background: #414e56 !important;
}
.el-drawer__body {
  padding: 10px;
  background: #414e56 !important;
}
.el-dialog__wrapper {
  z-index: 0 !important;
}
.btn {
  float: right;
  position: relative;
  z-index: 3000;
}
</style>


<script>
import AMap from "AMap";
export default {
  name: "HelloWorld",
  data() {
    return {
      center: null,
      mapInfon: "定位中",
      markerArr: [],
      drawer: false,
      direction: "ltr",
      address: "",
      lat: "",
      lng: ""
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    switchF() {
      this.drawer = !this.drawer;
    },
    init: function() {
      var _this = this;
      let map = new AMap.Map("container", {
        center: _this.center,
        resizeEnable: true,
        zoom: 15,
        lang: "ch"
      });

      map.on("click", showInfo);
      // map.setMapStyle("amap://styles/fresh"); //地图主题

      function showInfo(e) {
        if (_this.markerArr.length != 0) {
          //清楚marker
          for (var i = 0; i < _this.markerArr.length; i++)
            _this.markerArr[i].setMap(null);
        }

        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        });

        geocoder.getAddress(e.lnglat, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息

            var endIcon = new AMap.Icon({
              size: new AMap.Size(25, 34),
              image:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
              imageSize: new AMap.Size(135, 40),
              imageOffset: new AMap.Pixel(-98, -3)
            });
            var marker = new AMap.Marker({
              icon: endIcon,
              zoom: 10,
              iconLabel: "A",
              // content:'A'
            });
            _this.markerArr.push(marker);
            // console.log(_this.markerArr)
            var infoWindow = new AMap.InfoWindow({
              // offset: new AMap.Pixel(2, 31),
              anchor: "top-center",
              showShadow: true,
              isCustom: true
            });
            marker.setMap(map);
            infoWindow.setMap(map);
            marker.setPosition(e.lnglat);
            infoWindow.setPosition(e.lnglat);
            // infoWindow.setContent('<div style="background:#414E56;opacity: .5;width: 600px;height:200px;"><h3>地址</h3>'+result.regeocode.formattedAddress+'经度'+e.lnglat.lng+'纬度'+e.lnglat.lat+'</div>');
            infoWindow.setContent(`<div style="background: #414E56;opacity: .8;width: 600px;height:200px;display: flex;padding: 20px;color:#fff">
         <div style="flex: 350;height:200px">
            <h3>杭州鼎任科技有限公司</h3>
            <div>
              <p>控制室:054-1568996</p>
              <p>主要负责人:154956498556</p>
              <p>${result.regeocode.formattedAddress}</p>
            </div>
        </div>
        <div style="flex: 250;height:200px">
            <img style="width:200px;height:200px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567767404488&di=4923e1829c0aef0dab42a3a2ac1873e6&imgtype=0&src=http%3A%2F%2Fs2.lvjs.com.cn%2Fuploads%2Fpc%2Fplace2%2F2016-04-07%2F3fb78042-6ab4-41b8-889a-103f2f31b58a.jpg"/>
        </div>
     </div>
    </div>`);
          }
        });
        // infoWindow.open(map, marker.getPosition());
      }

      //插件
      AMap.plugin(
        ["AMap.ToolBar", "AMap.Scale", "AMap.Geolocation", "AMap.Geocoder"],
        function() {
          // map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale());
          //自动定位
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: "RB"
          });

          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, "complete", onComplete);
          AMap.event.addListener(geolocation, "error", onError);

          function onComplete(data) {
            // data是具体的定位信息
            _this.center = [data.position.lat, data.position.lng];

            setTimeout(() => {
              _this.mapInfon =
                "<strong>地址:</strong>" +
                data.formattedAddress +
                "经度:" +
                data.position.lat +
                "纬度:" +
                data.position.lng;
            }, 0);
          }

          function onError(data) {
            // 定位出错
            console.log(data);
          }
        }
      );

      AMapUI.loadUI(
        ["overlay/SimpleMarker", "overlay/SimpleInfoWindow", "misc/PoiPicker"],
        function(SimpleMarker, SimpleInfoWindow, PoiPicker) {
          const marker = new SimpleMarker({
            iconLabel: "A",
            iconStyle: "blue",
            map: map,
            position: map.getCenter()
          });
          marker.on("click", show);
          function show() {
            var infoWindow = new SimpleInfoWindow({
              infoTitle: "<strong>杭州xxx有限公司</strong>",
              infoBody: _this.mapInfon,

              //基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            });
            infoWindow.open(map, marker.getPosition());
          }

          var poiPicker = new PoiPicker({
            city: "北京",
            input: "pickerInput"
          });

          //初始化poiPicker
          poiPickerReady(poiPicker);

          function poiPickerReady(poiPicker) {
            window.poiPicker = poiPicker;

            var marker = new AMap.Marker();
            _this.markerArr.push(marker);
            var infoWindow = new AMap.InfoWindow({
              offset: new AMap.Pixel(0, -20)
            });

            //选取了某个POI
            poiPicker.on("poiPicked", function(poiResult) {
              var source = poiResult.source,
                poi = poiResult.item,
                info = {
                  source: source,
                  id: poi.id,
                  name: poi.name,
                  location: poi.location.toString(),
                  address: poi.address
                };

              marker.setMap(map);
              infoWindow.setMap(map);

              marker.setPosition(poi.location);
              infoWindow.setPosition(poi.location);

              infoWindow.setContent(
                "POI信息: <pre>" + JSON.stringify(info, null, 2) + "</pre>"
              );
              infoWindow.open(map, marker.getPosition());

              //map.setCenter(marker.getPosition());
            });

            // poiPicker.onCityReady(function() {
            //     poiPicker.suggest('杭州');
            // });
          }
        }
      );
    }
  }
};
</script>