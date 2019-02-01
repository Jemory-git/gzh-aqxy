<template>
    <bScroll class="bscroll" v-bind="bScrollOptions" :data="showingArr" @scrollToEnd="shanglajiazai">
      <div class="wrapper">
        <dataProcess v-bind="dataProcessOptions">
          <div class="biaoji-today">
            <div class="div1">今天
              <div class="div2 positiondiv">
                <div class="div3 positiondiv"></div>
              </div>
            </div>
          </div>
          <div class="meiyouzuoye" v-if="todayShowingArr.length === 0">今天没有作业哦</div>
          <keyeItem  v-for="item in todayShowingArr" :key="item" :keye-obj="item"></keyeItem>
          <div class="biaoji-today" v-if="zuotianShowingArr.length > 0">
            <div class="div1">昨天
              <div class="div2 positiondiv">
                <div class="div3 positiondiv"></div>
              </div>
            </div>
          </div>
          <!-- <div class="meiyouzuoye" v-if="zuotianShowingArr.length === 0">昨天没有作业哦</div> -->
          <keyeItem  v-for="item in zuotianShowingArr" :key="item" :keye-obj="item"></keyeItem>
          <div class="biaoji-today" v-if="qiantianShowingArr.length > 0">
            <div class="div1">前天
              <div class="div2 positiondiv">
                <div class="div3 positiondiv"></div>
              </div>
            </div>
          </div>
          <!-- <div class="meiyouzuoye" v-if="qiantianShowingArr.length === 0">前天没有作业哦</div> -->
          <keyeItem  v-for="item in qiantianShowingArr" :key="item" :keye-obj="item"></keyeItem>
          <div class="biaoji-today">
            <div class="div1">之前
              <div class="div2 positiondiv">
                <div class="div3 positiondiv"></div>
              </div>
            </div>
          </div>
          <keyeItem  v-for="item in gengjiuShowingArr" :key="item" :keye-obj="item"></keyeItem>
        </dataProcess>
      </div>
    </bScroll>
</template>

<script>
import { formatTime } from "../../js/util.js";
import dataProcess from "../../components/common/data-process/data-process.vue";
import keyeItem from "../../components/common/keye-item/keye-item.vue";
import bScroll from "../../components/common/b-scroll/b-scroll.vue";
export default {
  components: {
    keyeItem,
    bScroll,
    dataProcess
  },
  data() {
    return {
      bScrollOptions: {
        pullup: true,
        click: true
      },
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      keyeArr: [],
      showingArr: [],
      todayShowingArr: [],
      zuotianShowingArr: [],
      qiantianShowingArr: [],
      gengjiuShowingArr: [],
      disableShanglajiazai: false,
      currentChildId: ""
    };
  },
  methods: {
    showArr(arr) {
      console.log('arr', arr);
      
      if (arr.length === 0) {
        return;
      }

      this.showingArr = arr;

      // 计算今天 明天 后天
      let cNow = Date.now();
      let oneDay = 24 * 60 * 60 * 1000;
      let todayStr = formatTime(new Date(cNow)).dateStr;
      let zuotianStr = formatTime(new Date(cNow - oneDay)).dateStr;
      let qiantianStr = formatTime(new Date(cNow - oneDay * 2)).dateStr;

      this.todayShowingArr = [];
      this.zuotianShowingArr = [];
      this.qiantianShowingArr = [];
      this.gengjiuShowingArr = [];

      // 将要展示的数组中每一项进行判断，放入对应的分类中
      arr.forEach((c, i) => {
        if (c.datetime === todayStr) {
          this.todayShowingArr.push(c);
          return;
        }
        if (c.datetime === zuotianStr) {
          this.zuotianShowingArr.push(c);
          return;
        }
        if (c.datetime === qiantianStr) {
          this.qiantianShowingArr.push(c);
          return;
        }

        this.gengjiuShowingArr.push(c);
      });
    },
    getKeye(currentlen) {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId"),
        offset: currentlen
      };

      this.axios.post("/School/homework_history", postData).then(data => {
        console.log("课业", data);

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
        if (currentlen == 0 && data.data.homework.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        if (data.data.homework.length < 6) {
          // 返回数据不足6条，就禁用上啦加载
          this.disableShanglajiazai = true;
        }

        // 拼接数据
        this.keyeArr = this.keyeArr.concat(data.data.homework);

        // 更新视图
        this.showArr(this.keyeArr);
      });
    },
    shanglajiazai() {
      // 上拉加载
      if (this.disableShanglajiazai) {
        return;
      }
      this.getKeye(this.showingArr.length);
    }
  },
  mounted() {
    // 第一次进入页面时的childId,之后页面被缓存
    this.currentChildId = sessionStorage.getItem("childId");

    this.getKeye(0);
  },
  activated() {
    // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    if (this.currentChildId === sessionStorage.getItem("childId")) {
      return;
    }
    // 如果不同，就重置属性，加载新数据
    this.currentChildId = sessionStorage.getItem("childId");
    this.showingArr = [];
    this.keyeArr = [];
    this.disableShanglajiazai = false;
    this.$set(this.dataProcessOptions, "haveData", true);
    this.$set(this.dataProcessOptions, "loaded", false);
    this.getKeye(0);
  }
};
</script>

<style lang="stylus" scoped>
.bscroll {
  box-sizing: border-box;
  padding: 1.5rem;
  background-color: #fff;

  .wrapper {
    box-sizing: border-box;
    width: 100%;
    min-height: 101vh;
    padding-bottom: 3rem;

    .biaoji-today {
      position: relative;
      height: 3rem;
      width: 100%;
      margin-bottom: 1.5rem;

      .positiondiv {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
      }

      .div1 {
        position: absolute;
        left: -1.5rem;
        height: 3rem;
        width: 6rem;
        padding-left: 1rem;
        line-height: 3rem;
        background-color: #FFCC34;
        overflow: hidden;
        font-size: 1.3rem;
        font-family: DengXian-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;

        .div2 {
          right: 0;
          top: 0;
          border-width: 3rem;
          border-color: transparent #fff transparent transparent;

          .div3 {
            right: -3rem;
            bottom: 0;
            border-width: 1.5rem;
            border-color: transparent transparent #FFCC34 transparent;
          }
        }
      }
    }

    .meiyouzuoye {
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      text-align: center;
      font-size: 1rem;
      letter-spacing: 1px;
      color: #666;
      border-bottom: solid 1px #f1f1f1;
    }
  }
}
</style>
