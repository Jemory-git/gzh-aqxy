<template>
    <div class="wrapper">
        <dataProcess v-bind="dataProcessOptions">
        <div class="list-div">
            <!-- <ul class="year-ul">
                <li class="year-li">
                    <div class="year-title title" :class="{borderBotom: monthClose}" @click="monthClose = !monthClose">
                        <span class="year">2018</span>
                        <img class="arrow" src="./arrow.png" alt="" :class="{rotate90: !monthClose}">
                    </div> -->
                    <ul class="month-ul" :class="{close: monthClose}" >
                        <li class="month-li" v-for="(value,key, i) in monthObj" :key="value">
                            <div class="month-title title" :class="{borderBotom: dayClose[i]}" @click="changeDayClose(i)">
                                <span class="month">{{key.replace('a','')}}月</span>
                                <img class="arrow" src="./arrow.png" alt="" :class="{rotate90: !dayClose[i]}">
                            </div>
                            <ul class="day-ul" id="shabi-ul" :class="{close:dayClose[i]}" :style="'height:'+ value.length * 3.6 * htmlFontSize + 'px'">
                                <li class="day-li title" v-for="(item, index) in value" :key="item" @click="toDangriQiandao(item)" :class="{yanseclass: index === 0}">
                                    <span class="day">{{item.month}}-{{item.day}}</span>
                                    <span class="time">{{item.time}}</span>
                                    <span class="status">{{item.round_name}}</span>
                                    <span class="status">{{ulHeight}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                <!-- </li>
            </ul> -->
        </div>
        </dataProcess>
    </div>
</template>

<script>
// 本页已经弃用

import dataProcess from "../../components/common/data-process/data-process.vue";
export default {
  components: {
    dataProcess
  },
  data() {
    return {
      monthClose: false,
      dayClose: [false, false, false, false],
      monthObj: {},
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      htmlFontSize: document.documentElement
        .getAttribute("style")
        .split(":")[1]
        .split("px")[0],
      ulHeight: ""
    };
  },
  methods: {
    changeDayClose(i) {
      this.dayClose.splice(i, 1, !this.dayClose[i]);
    },
    toDangriQiandao(item) {
      sessionStorage.setItem("currentQiandaoObj", JSON.stringify(item));
      this.$router.push("/dangri-qiandao");
    },
    getQiandaoHistory() {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id: sessionStorage.getItem("childId")
          ? sessionStorage.getItem("childId")
          : sessionStorage.getItem("student_id")
      };
      //   this.axios.post("/School/puncard_history", postData).then(data => {
      //     console.log(data);
      //     if (data.errcode != 0) {
      //       // 请求失败
      //       this.promptBox.prompt(data.errmsg);
      //       return;
      //     }
      //     // 请求成功
      //     // 排序
      //     data.data.students.sort((a, b) => {
      //       return b.datetime - a.datetime;
      //     });
      //     // 根据月份创建数组
      //     let monthObj = {};
      //     data.data.students.forEach(c => {
      //       let dateObj = formatTime(new Date(parseInt(c.datetime + "000")))
      //         .dateObj;
      //       monthObj[dateObj.month] = [];
      //       c = Object.assign(c, dateObj);
      //     });
      //     // 将对应月份的条目放入对应数组中
      //     data.data.students.forEach(c => {
      //       monthObj[c.month].push(c);
      //     });
      //     console.log(monthObj);
      //     // 更新视图
      //     this.monthObj = monthObj;
      //   });
      this.axios.post("/School/puncard_history_month", postData).then(data => {
        console.log("打卡历史", data);
        this.$set(this.dataProcessOptions, "loaded", true);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        if (data.data.dates.length === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }
        // 转对象
        let dateObj = data.data.dates.map((c, i) => {
          let arr = c.split("-");
          return {
            year: arr[0],
            month: arr[1],
            day: arr[2]
          };
        });
        // 根据月份排序
        dateObj.sort((a, b) => {
          return b.month - a.month;
        });

        // 根据月份创建数组,命名需要加上一个前置a，才能保证对象的顺序不被重排
        let monthObj = {};
        dateObj.forEach(c => {
          monthObj["a" + c.month] = [];
        });

        // 将对应月份的条目放入对应数组中
        dateObj.forEach(c => {
          monthObj["a" + c.month].push(c);
        });
        // 根据天来排序
        dateObj.forEach(c => {
          monthObj["a" + c.month].sort((a, b) => {
            return b.day - a.day;
          });
        });

        // 更新视图
        this.monthObj = monthObj;
      });
    }
  },
  mounted() {
    this.getQiandaoHistory();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 1.5rem;
    background-color: #fff;

    .list-div {
        box-sizing: border-box;
        width: 100%;
        min-height: calc(100vh - 3rem);
        // padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 0 20px 10px #FBF7F3;

        .month-ul {
            width: 100%;
            transition: all 0.3s ease-out;
            overflow: hidden;

            .month-li {
                border-bottom: 1px solid #f4f4f4;

                .month-title {
                    z-index: 10;

                    .month {
                        font-size: 1.8rem;
                        color: #333;
                    }
                }

                .day-ul {
                    transition: all 0.3s ease-out;
                    overflow: hidden;

                    .day-li {
                        height: 3rem;
                        padding: 0 1.5rem;
                        line-height: 3rem;
                        font-size: 1.5rem;

                        .day {
                            color: #999;
                        }

                        .time {
                            flex-grow: 1;
                            padding-left: 0.5rem;
                            color: #999;
                        }

                        .status {
                            color: #6aa894;
                        }
                    }

                    .yanseclass {
                        background-color: #FFF2E2;
                    }
                }
            }

            .month-li:last-child {
                border-bottom: none;
            }
        }
    }

    .year-title, .month-title {
        height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #fff;
        padding: 1rem 2rem 0 1rem;
    }

    .arrow {
        transition: all 0.3s ease-out;
        height: 1.5rem;
        width: 0.8rem;
    }

    .title {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .close {
        height: 0px !important;
    }

    .rotate90 {
        transform: rotateZ(90deg);
    }

    .borderBotom {
        // border-bottom: 1px solid #F9F9F9;
    }
}
</style>
