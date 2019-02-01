<template>
      <div class="wrapper">
        <dataProcess v-bind="dataProcessOptions">
            <div class="week-list">
                <ul class="ul" @click="selectWeek($event)">
                    <li class="li" :class="{today: item.today}" v-for="(item, index) in date_and_week" :key="item" :data-i="index">
                        <span class="week" :data-i="index">{{item.week}}</span>
                        <span class="date" :data-i="index">{{item.date}}</span>
                    </li>
                </ul>
            </div>
            <div class="kebiao-list">
              <div v-if="showingArr.length === 0" class="meiyoukecheng">
                太棒了！今天没有课程耶！
              </div>
              <ul class="ul" v-else>
                  <li class="li" :class="'bg' + item.slot"  v-for="item in showingArr" :key="item">
                      <span class="list-number" :class="colorArr[item.slot]">{{upperNumber[item.fest_num]}}</span>
                      <span class="laoshi-name">老师：{{item.teacher_name}}</span>
                      <span class="kecheng-name">{{item.course_name}}</span>
                      <div class="shijian">{{shijianArr[item.slot]}}</div>
                      <!-- <span class="kecheng-name">{{item.week_day}}</span> -->
                  </li>
              </ul>
            </div>
        </dataProcess>
      </div>
</template>

<script>
import { formatTime } from "../../js/util.js";
import dataProcess from "../../components/common/data-process/data-process.vue";
export default {
  components: {
    dataProcess
  },
  data() {
    return {
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      showingArr: [],
      currentChildId: "",
      beforeDay: {
        changeBoo: true,
        value: false
      },
      colorArr: ["", "shangwu-color", "xiawu-color", "wanshang-color"],
      shijianArr: ["", "上午", "下午", "晚上"],
      date_and_week: [
        { week: "周一", date: "", ms: "", today: false },
        { week: "周二", date: "", ms: "", today: false },
        { week: "周三", date: "", ms: "", today: false },
        { week: "周四", date: "", ms: "", today: false },
        { week: "周五", date: "", ms: "", today: false },
        { week: "周六", date: "", ms: "", today: false },
        { week: "周日", date: "", ms: "", today: false }
      ],
      upperNumber: [
        "",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十"
      ],
      cSelectedWeek: "",
      weekObj: {}
    };
  },
  methods: {
    showArr(arr) {
      console.log(this.weekObj);
      if (!arr || arr.length === 0) {
        return;
      }
      this.showingArr = arr;
    },
    getKechengbiao() {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        class_id: sessionStorage.getItem("classId")
      };

      this.axios.post("/School/course_table", postData).then(data => {
        console.log(data);
        this.$set(this.dataProcessOptions, "loaded", true);

        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }

        // 请求成功
        if (data.data.course.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        // 按天分类
        let weekObj = {};
        data.data.course.forEach((c, i) => {
          // 给存在的星期赋值空数组
          weekObj[c.week_day] = [];
        });
        // let allWeek = Object.keys(weekObj);
        data.data.course.forEach((c, i) => {
          // 分类存到对应的周数组里1 2 3 4 5 6 7
          weekObj[c.week_day].push(c);
        });
        this.weekObj = weekObj;

        // 跟新视图
        this.showArr(weekObj[this.cSelectedWeek + 1]);
      });
    },
    setWeekAndDate(cWeek) {
      let cms = Date.now();
      // 取消黄色背景
      if (this.cSelectedWeek !== "") {
        this.$set(this.date_and_week[this.cSelectedWeek], "today", false);
      }

      cWeek = cWeek === 0 ? 7 : cWeek;
      let oneDay = 24 * 60 * 60 * 1000;
      let starti = cWeek - 1;

      // 记录当前选中周
      this.cSelectedWeek = starti;
      // 计算本周其他日期
      for (let i = starti; i < 7; i++) {
        this.date_and_week[i].ms = cms + oneDay * (i - starti);
      }
      for (let i = starti; i > -1; i--) {
        this.date_and_week[i].ms = cms + oneDay * (i - starti);
      }
      this.date_and_week.forEach((c, i) => {
        let date = formatTime(new Date(c.ms));
        this.$set(c, "date", `${date.dateObj.month}-${date.dateObj.day}`);
      });

      // 切换课表
      this.selectWeek({ target: { tagName: "", dataset: { i: starti } } });
    },
    selectWeek(e) {
      let el = e.target;
      if (el.tagName === "UL") {
        return;
      }
      let ci = parseInt(el.dataset.i);
      let weeki = ci === 6 ? 0 : ci + 1;
      // 取消背景色
      this.$set(this.date_and_week[this.cSelectedWeek], "today", false);
      this.cSelectedWeek = ci;
      // 添加背景色
      this.$set(this.date_and_week[ci], "today", true);
      // 切换课表
      this.showArr(this.weekObj[weeki]);
    },
    initKechengbiao() {
      let cWeek = new Date().getDay();

      // 如果当前week和记录值相同就继续判断是不是同一个孩子
      if (cWeek !== this.beforeDay.value) {
        // 如果当前week和记录值不同就更新日期，更换记录值
        this.beforeDay.value = cWeek;
        this.setWeekAndDate(cWeek);
      }

      // 当再次进入页面时，判断存储中的childId和当前页面是否相同
      if (this.currentChildId === sessionStorage.getItem("childId")) {
        return;
      }

      // 每次进来就重新设置时间
      this.setWeekAndDate(cWeek);

      // 如果不同，就重置属性，加载新数据
      this.currentChildId = sessionStorage.getItem("childId");
      this.showingArr = [];
      this.$set(this.dataProcessOptions, "haveData", true);
      this.$set(this.dataProcessOptions, "loaded", false);
      this.getKechengbiao();
    }
  },
  activated() {
    this.initKechengbiao();
    // let cWeek = new Date().getDay();

    // // 如果当前week和记录值相同就继续判断是不是同一个孩子
    // if (cWeek !== this.beforeDay.value) {
    //   // 如果当前week和记录值不同就更新日期，更换记录值
    //   this.beforeDay.value = cWeek;
    //   this.setWeekAndDate(cWeek);
    // }

    // // 当再次进入页面时，判断存储中的childId和当前页面是否相同
    // if (this.currentChildId === sessionStorage.getItem("childId")) {
    //   return;
    // }

    // // 每次进来就重新设置时间
    // this.setWeekAndDate(cWeek);

    // // 如果不同，就重置属性，加载新数据
    // this.currentChildId = sessionStorage.getItem("childId");
    // this.showingArr = [];
    // this.$set(this.dataProcessOptions, "haveData", true);
    // this.$set(this.dataProcessOptions, "loaded", false);
    // this.getKechengbiao();
  },
  created(){
    // this.initKechengbiao();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;

  .week-list {
    height: 8rem;
    padding: 0 3rem;
    background-color #fff

    .ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        padding: 0.5rem;
        border-radius: 1rem;
        text-align: center;

        .week {
          font-size: 1.5rem;
          font-family: DengXian-Regular;
          font-weight: 400;
        }

        .date {
          font-size: 1.3rem;
          font-family: DengXian-Regular;
          font-weight: 400;
          color: #999;
        }
      }

      .today {
        background-color: #FFCC34;

        .week, .date {
          color: #fff;
        }
      }
    }
  }

  .kebiao-list {
    min-height: calc(100vh - 8rem);
    background-color: #F6F5F8;
    padding: 1rem;

    .meiyoukecheng {
      padding-top: 5rem;
      text-align: center;
      font-size: 1.2rem;
      font-family: DengXian-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .ul {
      .li {
        position: relative;
        display: flex;
        align-items: center;
        height: 9.5rem;
        width: 100%;
        background-size: 100% 100%;
        margin-bottom: 1rem;

        .list-number {
          height: 4rem;
          width: 4rem;
          line-height: 4rem;
          text-align: center;
          border-radius: 50%;
          margin: 0 1rem 0 2rem;
          font-size: 1.2rem;
          font-family: DengXian-Bold;
          font-weight: bold;
          color: #fff;
        }

        .laoshi-name {
          margin-right: 1rem;
          font-size: 1.5rem;
          font-family: DengXian-Regular;
          font-weight: 400;
        }

        .kecheng-name {
          font-size: 1.5rem;
          font-family: DengXian-Bold;
          font-weight: bold;
        }

        .shangwu-color {
          background-color: #FFCC34;
        }

        .xiawu-color {
          background-color: #FF8F34;
        }

        .wanshang-color {
          background-color: #3472FF;
        }

        .shijian {
          position: absolute;
          right: 2.5rem;
          bottom: 1rem;
          width: 1rem;
          font-size: 1.2rem;
          font-family: DengXian-Bold;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }

      .bg1 {
        background-image: url('../../img/bg-1.png');
      }

      .bg2 {
        background-image: url('../../img/bg-2.png');
      }

      .bg3 {
        background-image: url('../../img/bg-3.png');
      }
    }
  }
}
</style>
