<template>
    <div class="wrapper">
        <dataProcess class="background-color" v-bind="dataProcessOptions">
          <!-- <div class="inner-wrapper" v-for="(item, index) in shexiangtouArr" :key="index">
              <div class="item" v-for="(subitem, i) in item" :key="i" @click="toVideo($event)" :data-account="subitem.account" :data-camera_id="subitem.id" :data-serial_no="subitem.serial_no" :data-channel_no="subitem.channel_no" :data-index="index">
                  <div class="img-wrapper">
                    <img class="img" src="../../img/jiaoshi.png" alt=""> 
                  </div>
                  <p class="jiaoshi">{{subitem.name}}</p>
              </div>
          </div> -->
          <div class="inner-wrapper2" v-for="(item, index) in shexiangtouArr" :key="item" @click="toVideo($event)" :data-account="item.account" :data-camera_id="item.id" :data-serial_no="item.serial_no" :data-channel_no="item.channel_no" :data-index="index">
              <img class="img" :src="imgUrl[item.state]" alt=""> 
              <p class="jiaoshi">{{item.name}}{{state[item.state]}}</p>
          </div>
        </dataProcess>
    </div>
</template>

<script>
import dataProcess from "../../components/common/data-process/data-process.vue";
import huiji from "../../img/jiaoshi.png";
import huangji from "../../img/ji.png";
export default {
  components: {
    dataProcess
  },
  data() {
    return {
      shexiangtouArr: [],
      imgUrl: [huiji, huangji],
      state: ["（离线）", "（在线）"],
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      currentChildId: ""
    };
  },
  methods: {
    toVideo(e) {
      sessionStorage.setItem(
        "shexiangtouDataset",
        JSON.stringify(e.currentTarget.dataset)
      );
      this.$router.push({ name: "video", params: e.currentTarget.dataset });
    },
    getJiankong() {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId"),
        len: 100
      };
      this.axios.post("/School/get_cameras", postData).then(data => {
        console.log(data);
        this.$set(this.dataProcessOptions, "loaded", true);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        if (data.data.cameras.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }
        // 改造成二维数组
        // data.data.cameras.pop();
        // for (let i = 0; i < data.data.cameras.length; i += 2) {
        //   this.shexiangtouArr.push(data.data.cameras.slice(i, i + 2));
        // }

        // 能播放的摄像头排在前面
        data.data.cameras.sort((a, b) => {
          return b.state - a.state;
        });
        // 更新视图
        this.shexiangtouArr = data.data.cameras;
      });
    }
  },
  mounted() {
    // 第一次进入页面时的childId,之后页面被缓存
    this.currentChildId = sessionStorage.getItem("childId");
    this.getJiankong();
  },
  activated() {
    // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    if (this.currentChildId === sessionStorage.getItem("childId")) {
      return;
    }
    // 如果不同，就重置属性，加载新数据
    this.currentChildId = sessionStorage.getItem("childId");
    this.shexiangtouArr = [];
    this.$set(this.dataProcessOptions, "haveData", true);
    this.$set(this.dataProcessOptions, "loaded", false);
    this.getJiankong();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 1.5rem 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;

  // .inner-wrapper {
  //   display: flex;
  //   justify-content: space-between;
  //   width: 100%;
  //   margin-bottom: 4rem;

  //   .item {
  //     position: relative;
  //     width: 50%;

  //     .img-wrapper {
  //       margin: 0 auto;
  //       width: 100%;
  //       border-radius: 1rem;

  //       .img {
  //         display: block;
  //         margin: 0 auto;
  //         width: 100%;
  //         background: #fff;
  //         box-shadow: 0 0 40px 0px #fff0e3;
  //       }
  //     }

  //     .jiaoshi {
  //       position: absolute;
  //       bottom: -4rem;
  //       left: 0;
  //       width: 100%;
  //       height: 4rem;
  //       line-height: 4rem;
  //       text-align: center;
  //       font-size: 1.5rem;
  //       color: #646464;
  //     }
  //   }

  //   .item:first-child {
  //     margin-right: 0.5rem;
  //   }

  //   .item:last-child {
  //     margin-left: 0.5rem;
  //   }
  // }

  .inner-wrapper2 {
    position: relative;
    display: inline-block;
    width: calc(((100% - 1rem) / 2));
    margin-bottom: 4rem;

    .img {
      display: block;
      margin: 0 auto;
      width: 100%;
      background: #fff;
      box-shadow: 0 0 40px 0px #fff0e3;
      border-radius: 10px;
    }

    .jiaoshi {
      position: absolute;
      bottom: -4rem;
      left: 0;
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
      font-size: 1.5rem;
      color: #646464;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .inner-wrapper2:nth-of-type(odd) {
    margin-right: 1rem;
  }
}
</style>
