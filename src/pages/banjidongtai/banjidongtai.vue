<template>
    <bScroll class="bscroll" v-bind="bScrollOptions" :data="showingArr" @scrollToEnd="shanglajiazai">
        <div class="wrapper">
            <dataProcess class="min-height100vh" v-bind="dataProcessOptions">
                <ul class="ul">
                    <li class="li" v-for="(item, index) in showingArr" :key="item">
                        <img class="img this-img-need-grow" :src="item.image_url" alt="" v-if="!imgerrArr[index]" @error="onImgErr(index)" :data-index1="index" :data-index2="1">
                        <div class="imgdiv" v-else>加载图片出错！</div>
                        <div class="wenzi" :class="{'close': close[index]}" @click="openContent(index)">
                            <p class="p">
                                <span class="title">{{item.title}}</span>
                                <span class="time">{{item.date}}</span>
                                <img class="arrowimg" src="../../img/c-arrow.png" alt="">
                            </p>
                            <p class="content" v-html="item.description ? item.description.replace(/\n/g, '<br/>') : ''"></p>
                        </div>
                        <div class="line"></div>
                    </li>
                    <div class="dixian" v-if="disableShanglajiazai">- 没有更多 -</div>
                </ul>
            </dataProcess>
        </div>
    </bScroll>
</template>

<script>
import { formatTime } from "../../js/util.js";
import dataProcess from "../../components/common/data-process/data-process.vue";
import bScroll from "../../components/common/b-scroll/b-scroll.vue";
export default {
  components: {
    dataProcess,
    bScroll
  },
  data() {
    return {
      close: [],
      dongtaiArr: [],
      imgerrArr: [],
      showingArr: [],
      disableShanglajiazai: false,
      bScrollOptions: {
        pullup: true,
        click: true
      },
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      currentChildId:'',
    };
  },
  methods: {
    showArr(arr) {
      if (arr.length === 0) {
        return;
      }
      this.showingArr = arr;
    },
    getData(currentlen) {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId"),
        class_id: sessionStorage.getItem("classId"),
        offset: currentlen
      };

      this.axios.post("/School/class_dynamic", postData).then(data => {
        console.log("班级动态", data);
        if (currentlen == 0) {
          // 如果是第一次加载数据，设置loaded为true,上啦加载时不用设置
          this.$set(this.dataProcessOptions, "loaded", true);
        }

        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }

        // 请求成功
        let dongtaiArr = data.data.classView;
        let len = dongtaiArr.length;

        if (currentlen == 0 && len === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        if (dongtaiArr.length < 6) {
          // 返回数据不足6条，就禁用上啦加载
          this.disableShanglajiazai = true;
        }

        // 填充close 数组
        for (let i = 0; i < len; i++) {
          this.close.push(false);
        }

        // 改造时间
        dongtaiArr.forEach((c, i) => {
          c.date = formatTime(new Date(parseInt(c.pubdate + "000"))).dateStr;
        });

        // 拼接数据
        this.dongtaiArr = this.dongtaiArr.concat(dongtaiArr);

        // 更新视图
        this.showArr(this.dongtaiArr);

        // 收集图片
        this.eventHub.$emit("imgsrcgot");
        this.$nextTick(() => {
          this.setHeight(currentlen);
        });
      });
    },
    openContent(index) {
      this.$set(this.close, index, !this.close[index]);
    },
    onImgErr(i) {
      this.$set(this.imgerrArr, i, true);
    },
    shanglajiazai() {
      // 上拉加载
      if (this.disableShanglajiazai) {
        return;
      }
      this.getData(this.showingArr.length);
    },
    setHeight(currentlen) {
      let contentArr = Array.from($('.content'));
      // 只留下新加载的动态，删除已有的
      contentArr.splice(0, currentlen);
      
      contentArr.forEach((c,i)=>{
        let cHeight = c.offsetHeight;
        c.style.height = cHeight + "px";
      })
      
      // 修改close 数组
      let len = this.close.length;
      for (let i = currentlen; i < len; i++) {
        this.$set(this.close, i, true);
      }
    }
  },
  mounted() {
    // 第一次进入页面时的childId,之后页面被缓存
    this.currentChildId = sessionStorage.getItem("childId");

    this.getData(0);
  },
  activated(){
    // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    if (this.currentChildId === sessionStorage.getItem("childId")) {
      return;
    }
    // 如果不同，就重置属性，加载新数据
    this.currentChildId = sessionStorage.getItem("childId");
    this.close = [];
    this.dongtaiArr = [];
    this.imgerrArr = [];
    this.showingArr = [];
    this.disableShanglajiazai = false;
    this.$set(this.dataProcessOptions, "haveData", true);
    this.$set(this.dataProcessOptions, "loaded", false);
    this.getData(0);
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  .ul {
    width: 100vw;
    padding-top: 2rem;

    .li {
      position: relative;
      padding-bottom: 3rem;
      background-color: #fff;

      .line {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate3d(-50%, -1.5rem, 0);
        width: 50%;
        height: 1px;
        background-color: #efefef;
        // background-image: radial-gradient(farthest-corner at 50% 50%, #efefef 0%, #fff 100%);
      }

      .img {
        display: block;
        max-width: 100%;
        height: 20rem;
        margin: 0 auto;
      }

      .imgdiv {
        line-height: 20rem;
        text-align: center;
        color: #ccc;
        background-color: #f4f4f4;
      }

      .wenzi {
        .p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;

          .title {
            width: 60%;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            font-size: 1.51rem;
            font-family: PingFang-SC-Regular;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }

          .time {
            flex-grow: 1;
            text-align: right;
            padding-right: 1rem;
            font-size: 1.2rem;
            font-family: PingFang-SC-Regular;
            color: rgba(102, 102, 102, 1);
          }

          .arrowimg {
            width: 1.5rem;
            height: 1.5rem;
            transform: rotate(90deg);
            transition: all 0.2s ease-out;
          }
        }

        .content {
          // height: 30rem;
          overflow: scroll;
          padding: 0 1rem;
          letter-spacing: 1px;
          text-indent: 2em;
          font-size: 1.2rem;
          line-height: 1.5rem;
          font-family: PingFang-SC-Light;
          color: rgba(153, 153, 153, 1);
          transition: all 0.2s ease-out;
          -webkit-overflow-scrolling: touch;
        }
      }

      .close {
        .p {
          .arrowimg {
            transform: rotate(0deg);
          }
        }

        .content {
          height: 2.8rem !important;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }

    .dixian {
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      background-color: #F9F9F9;
      font-size: 1.2rem;
      letter-spacing: 1px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #999;
    }
  }
}
</style>
