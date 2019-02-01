<template>
    <div class="wrapper">
        <div class="div1">
            <img class="img" :src="childHead" alt="">
            <span class="name">{{childName}}</span>
            <span class="date-span">{{cDay}}</span>
        </div>
        <div class="date-week-div">
          <p class="week">
            <span class="week-item" v-for="item in week" :key="item">{{item}}</span>
          </p>
          <div class="date-div" @click="showThisDay($event)">
            <div class="date-item" v-for="(item, index) in date" :key="item">
              <span class="span" :class="[{'selected-span': blueSpanControl[index]},{'today': item.today}]">{{item.day}}</span>
              <span class="dot-span dot-y" v-if="item.buqianBoo == 1"></span>
              <span class="dot-span dot-b" v-if="item.buqianBoo == 0"></span>
              <span class="dot-span" v-if="item.buqianBoo == undefined"></span>
              <div class="cover-div" :data-date="`${item.year}-${item.month}-${item.day}`" :data-meiyou="item.buqianBoo === undefined" :data-index="index"></div>
            </div>
          </div>
        </div>
        <div class="meiyoudakaxinxi" v-show="clickedTian.length === 0">没有{{meiyoudakaxinxi + '的'}}打卡信息</div>
        <div class="tian-daka-xiangqing" v-for="(item, index) in clickedTian" :key="item">
          <div class="qiandao-div1">
            <div class="icon">
              <img class="img" src="../../img/tuoyuan.png" alt="">
            </div>
            <div class="wenzi">
              <p class="shang-p">打卡时间：{{item.time}}<span class="qiandao">{{item.round_type == 1 ? '签离' : '签到'}}</span></p>
              <p class="xia-p">{{item.round_name}}({{item.round_time_start}}-{{item.round_time_end}})</p>
            </div>
            <div class="daiqian" v-if="item.is_proxy == 1">
              <img class="img" src="../../img/shu.png" alt="">
              <span class="dq">代签</span>
            </div>
          </div>
          <div class="qiandao-img" v-if="item.student_img_url" v-show="!imgErr[index]">
            <img class="img" :src="item.student_img_url" alt="" @error="qianDaoImgErr(index)">
          </div>
        </div>
    </div>
</template>

<script>
import { formatTime } from "../../js/util.js";
export default {
  data() {
    return {
      week: ["一", "二", "三", "四", "五", "六", "日"],
      date: [],
      selectedControl: [true],
      childName: sessionStorage.getItem("childName"),
      childHead: sessionStorage.getItem("childHead"),
      cDay: "",
      meiyoudakaxinxi: "",
      dateObj: "",
      clickedTian: [],
      imgErr: [],
      blueSpanControl: {}
    };
  },
  methods: {
    getQiandaoHistory() {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId")
          ? sessionStorage.getItem("childId")
          : sessionStorage.getItem("student_id")
      };
      this.axios.post("/School/new_history_put", postData).then(data => {
        console.log("打开历史", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        let punchcardData = data.data.punchcardData;
        punchcardData.forEach(c => {
          let dateObj = formatTime(new Date(parseInt(c.date_time + "000")))
            .dateObj;
          c = Object.assign(c, dateObj);
        });

        this.createDateArr(punchcardData);
      });
    },
    createDateArr(dataArr) {
      let cNow = Date.now();
      let cDateObj = formatTime(new Date(cNow)).dateObj;
      let cZhou = cDateObj.zhou;
      this.cDay = `${cDateObj.year}.${cDateObj.month}.${cDateObj.day} 星期${
        cDateObj.zhou
      }`;
      let full30ArrValueArr = [35, 29, 30, 31, 32, 33, 34];
      let full30ArrLen = full30ArrValueArr[cZhou];
      let oneDay = 24 * 60 * 60 * 1000;

      // 填充最近30天到数组
      let full30Arr = [];
      for (let i = 0; i < full30ArrLen; i++) {
        full30Arr[i] = formatTime(new Date(cNow - oneDay * i)).dateObj;
      }
      // 翻转数组
      full30Arr.reverse();

      // 统计每天的打卡，有没有补签的
      let dateObj = {};
      dataArr.forEach((c, i) => {
        let cProxy = c.is_proxy;
        if (cProxy == 1) {
          dateObj[c.date] = 1;
        } else if (dateObj[c.date] != 1) {
          dateObj[c.date] = 0;
        }
      });

      // 将数据中有的天，替换进最近30天中
      full30Arr.forEach((c1, i1) => {
        dataArr.forEach((c2, i2) => {
          if (!c2) {
            return;
          }
          if (c1.day === c2.day && c1.month === c2.month) {
            full30Arr[i1] = c2;
          }
        });
      });

      // 标记今天
      let today = full30Arr[full30ArrLen - 1];
      today.today = true;

      // 标记每一天打卡是否有补签
      full30Arr.forEach((c, i) => {
        if (!c.date) {
          return;
        }
        // 如果这一天有数据，就找补签标识，添加进去
        c.buqianBoo = dateObj[c.date];
      });

      // 将dataArr中同一天的信息，添加到dateObj对应的数组里
      let allDateArr = Object.keys(dateObj);
      allDateArr.forEach((c1, i1) => {
        dateObj[c1] = [];
        dataArr.forEach((c2, i2) => {
          if (c2.date === c1) {
            dateObj[c1].push(c2);
          }
        });
      });
      this.dateObj = dateObj;
      console.log("dateObj", dateObj);

      // 更新视图
      this.date = full30Arr;

      // show今天的打卡信息
      this.showThisDay({
        target: {
          dataset: {
            meiyou: !today.date,
            date: `${today.year}-${today.month}-${today.day}`,
            index: full30ArrLen - 1
          }
        }
      });
    },
    showThisDay(e) {
      let el = e.target;
      // 标记点击的按钮为蓝色圆圈
      this.blueSpanControl = {};
      this.$set(this.blueSpanControl, el.dataset.index, true);

      // 如果这天没有签到信息
      if (el.dataset.meiyou) {
        this.clickedTian = [];
        this.meiyoudakaxinxi = el.dataset.date;
        return;
      }
      // 请求点击的天的打卡信息
      // this.getCurrentDayQiandaoArr(el.dataset.date);

      // 渲染点击的天的打卡信息
      this.imgErr = [];
      this.clickedTian = this.dateObj[el.dataset.date];
    },
    getCurrentDayQiandaoArr(date) {
      // 定义请求数据
      let postData = {
        // student_id: 64,
        student_id: sessionStorage.getItem("student_id")
          ? sessionStorage.getItem("student_id")
          : sessionStorage.getItem("childId"),
        open_id: sessionStorage.getItem("open_id"),
        date
      };

      this.axios.post("/School/get_detail_punchcard", postData).then(data => {
        console.log("qiandao", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        return;
        if (data.data.students.length === 0) {
          this.myqdxx = true;
          return;
        }
        data.data.students.forEach(c => {
          let dateObj = formatTime(new Date(parseInt(c.datetime + "000")))
            .dateObj;
          c = Object.assign(c, dateObj);
        });
        this.currentDayQiandaoArr = data.data.students;
      });
    },
    qianDaoImgErr(index) {
      this.$set(this.imgErr, index, true);
    }
  },
  mounted() {
    this.getQiandaoHistory();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2rem;

  .div1 {
    height: 6rem;
    display: flex;
    align-items: center;
    padding: 0 1rem 0 2rem;

    .img {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
    }

    .name {
      flex-grow: 1;
      padding-left: 1rem;
    }

    .name, .date-span {
      font-size: 1.5rem;
      font-family: DengXian-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .date-week-div {
    width: 100%;
    background-color: #F8F8F8;
    background-image: linear-gradient(to bottom, #F8F8F8, #fff);
    border-bottom: solid 1px #F4F4F4;

    .week {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .week-item {
        height: 4rem;
        width: 14.2857%;
        font-size: 1.2rem;
        text-align: center;
        line-height: 4rem;
        font-family: DengXian-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }

    .date-div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .date-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 4rem;
        width: 14.2857%;
        padding-bottom: 1rem;

        .span {
          height: 2.5rem;
          width: 2.5rem;
          text-align: center;
          line-height: 2.5rem;
          border-radius: 50%;
          font-size: 1.8rem;
          font-family: DengXian-Regular;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
        }

        .today {
          background-color: #B0CCFB;
          color: #333;
        }

        .selected-span {
          background-color: #4B8DFB;
          color: #fff;
        }

        .dot-span {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
        }

        .dot-y {
          background-color: #FFAF04;
        }

        .dot-b {
          background-color: rgba(75, 141, 251, 1);
        }

        .cover-div {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
      }
    }
  }

  .tian-daka-xiangqing {
    padding: 2rem 1rem 2rem 1rem;
    border-bottom: solid 1px #F4F4F4;

    .qiandao-div1 {
      display: flex;
      padding-bottom: 1rem;

      .icon {
        height: 4rem;
        width: 4rem;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .wenzi {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        // padding: 0.1rem 0 0.1rem 1rem;
        padding: 0 1rem;

        .shang-p {
          font-size: 1.5rem;
          font-family: DengXian-Bold;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);

          .qiandao {
            margin-left: 1rem;
            font-size: 1.2rem;
            color: #fff;
            background-color: #FFAF04;
            padding: 0.2rem 1rem 0.1rem 1rem;
            border-radius: 1rem;
          }
        }

        .xia-p {
          font-size: 1.2rem;
          font-family: DengXian-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }

      .daiqian {
        .img {
          vertical-align: top;
          width: 2rem;
          height: 2rem;
        }

        .dq {
          font-size: 1.5rem;
          font-family: DengXian-Bold;
          font-weight: bold;
          color: #4B8DFB;
        }
      }
    }

    .qiandao-img {
      display: flex;
      flex-direction: column;
      align-items: center;

      .img {
        max-width: 100%;
      }
    }
  }

  .meiyoudakaxinxi {
    padding-top: 2rem;
    text-align: center;
    color: #666;
    font-size: 1rem;
  }
}
</style>
