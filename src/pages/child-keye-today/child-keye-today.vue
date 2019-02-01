<template>
    <bScroll class="bscroll" v-bind="bScrollOptions" :data="showingArr">
      <div class="wrapper">
        <dataProcess v-bind="dataProcessOptions">
          <keyeItem  v-for="item in showingArr" :key="item" :keye-obj="item"></keyeItem>
        </dataProcess>
      </div>
    </bScroll>
</template>

<script>
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
      todayKeye: false,
      showingArr: [],
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
    getTodayKeye() {
      // 如果点今天的课业进来，就加载今天全部的课业。
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("student_id")
          ? sessionStorage.getItem("student_id")
          : sessionStorage.getItem("childId"),
        offset: 0,
        len: sessionStorage.getItem("todayKeyeShuliang")
      };

      this.axios.post("/School/homework_history", postData).then(data => {
        console.log(data);
        this.$set(this.dataProcessOptions, "loaded", true);

        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }

        // 请求成功
        if (data.data.homework.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }
        
        // 跟新视图
        this.showArr(data.data.homework);
      });
    }
  },
  mounted() {
    // 第一次进入页面时的childId,之后页面被缓存
    this.currentChildId = sessionStorage.getItem("childId");

    this.getTodayKeye();
  },
  activated() {
    // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    if (this.currentChildId === sessionStorage.getItem("childId")) {
      return;
    }
    // 如果不同，就重置属性，加载新数据
    this.currentChildId = sessionStorage.getItem("childId");
    this.showingArr = [];
    this.$set(this.dataProcessOptions, "haveData", true);
    this.$set(this.dataProcessOptions, "loaded", false);
    this.getTodayKeye();
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
