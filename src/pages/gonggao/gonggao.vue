<template>
    <bScroll class="bscroll" v-bind="bScrollOptions" :data="showingArr" @scrollToEnd="shanglajiazai">
      <div class="wrapper">
        <dataProcess v-bind="dataProcessOptions">
          <gonggaoItem  v-for="item in showingArr" :key="item" :gonggao-obj="item"></gonggaoItem>
        </dataProcess>
      </div>
    </bScroll>
</template>

<script>
import dataProcess from "../../components/common/data-process/data-process.vue";
import gonggaoItem from "../../components/common/gonggao-item/gonggao-item.vue";
import bScroll from "../../components/common/b-scroll/b-scroll.vue";
export default {
  components: {
    gonggaoItem,
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
      gonggaoArr: [],
      showingArr: [],
      disableShanglajiazai: false,
      currentChildId: ""
    };
  },
  methods: {
    showArr(arr) {
      if (arr.length === 0) {
        return;
      }
      this.showingArr = arr;
    },
    getGonggao(currentlen) {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId"),
        offset: currentlen
      };

      this.axios.post("/School/notice_list", postData).then(data => {
        console.log("公告", data);

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
        if (currentlen == 0 && data.data.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        if (data.data.length < 6) {
          // 返回数据不足6条，就禁用上啦加载
          this.disableShanglajiazai = true;
        }

        // 拼接数据
        if (data.data) {
          this.gonggaoArr = this.gonggaoArr.concat(data.data);
        }

        // 更新视图
        this.showArr(this.gonggaoArr);        
      });
    },
    shanglajiazai() {
      // 上拉加载
      if (this.disableShanglajiazai) {
        return;
      }
      this.getGonggao(this.showingArr.length);
    }
  },
  mounted() {
    // 第一次进入页面时的childId,之后页面被缓存
    this.currentChildId = sessionStorage.getItem("childId");

    this.getGonggao(0);
  },
  activated() {
    // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    if (this.currentChildId === sessionStorage.getItem("childId")) {
      return;
    }
    // 如果不同，就重置属性，加载新数据
    this.currentChildId = sessionStorage.getItem("childId");
    this.showingArr = [];
    this.gonggaoArr = [];
    this.disableShanglajiazai = false;
    this.$set(this.dataProcessOptions, "haveData", true);
    this.$set(this.dataProcessOptions, "loaded", false);
    this.getGonggao(0);
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
  }
}
</style>
