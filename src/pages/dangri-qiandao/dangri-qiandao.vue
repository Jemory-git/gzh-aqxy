<template>
    <div class="wrapper">
        <div class="children-ul">
            <div class="child-li">
                    <div class="avatar-div">
                        <img class="avatar-img" src="../../img/hlw.png" alt="" v-if="error">
                        <img class="avatar-img" :src="currentChild.now_student_info.head_img_url" alt="" @error="error = true" v-if="!error">
                    </div>
                <div class="child-info">
                    <div class="up-div">
                        <span class="name">{{currentChild.now_student_info.name}}</span>
                    </div>
                    <div class="down-div">
                        <span class="id">学号：{{currentChild.now_student_info.student_code}}</span>
                        <!-- <span class="qiandao same-padding">全勤</span> -->
                    </div>
                </div>
                <!-- <img class="arrow" src="./arrow.png" alt="" > -->
            </div>
            <div v-for="(item, index) in currentDayQiandaoArr" :key="index">
                <div class="time-wendu-qiandao">
                    <span class="time">{{item.year}}-{{item.month}}-{{item.day}} {{item.time}}</span>
                    <div class="wendu">
                        <!-- <img class="wenduji" src="" alt=""> -->
                        <!-- <span class="wendu">36℃</span> -->
                    </div>
                    <span class="qiandao">{{item.round_name}}</span>
                </div>
                <div class="qiandao-img">
                    <img class="img" :src="item.student_img_url" alt="" v-if="item.student_img_url">
                </div>
            </div>
            <div class="myqdxx" v-if="myqdxx">
                没有{{currentQiandaoDate}}的签到信息
            </div>
        </div>
    </div>
</template>

<script>
import { formatTime } from "../../js/util.js";
export default {
  components: {},
  data() {
    return {
      currentChild: {now_student_info:{}},
      currentDayQiandaoArr: [],
      currentQiandaoDate: {},
      error: false,
      myqdxx: false
    };
  },
  methods: {
    getInfo(child) {
      this.currentChild = child ? JSON.parse(child) : {};
    },
    getChild() {
      let postData = {
        student_id: sessionStorage.getItem("student_id")
      };
      this.axios.post("/School/get_student_info", postData).then(data => {
        console.log("child", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.currentChild = data.data.students;
      });
    },
    getCurrentDayQiandaoArr() {
      // 如果currentQiandaoObj 能取到，就是从历史页面点进来的，否则就是推送进来的
      let currentQiandaoObj = sessionStorage.getItem("currentQiandaoObj")
        ? JSON.parse(sessionStorage.getItem("currentQiandaoObj"))
        : false;

      // 定义请求数据
      let postData = {
        student_id: sessionStorage.getItem("student_id")
          ? sessionStorage.getItem("student_id")
          : sessionStorage.getItem("childId"),
        open_id: sessionStorage.getItem("open_id"),
        date: currentQiandaoObj
          ? `${currentQiandaoObj.year}-${currentQiandaoObj.month}-${
              currentQiandaoObj.day
            }`
          : sessionStorage.getItem("punchcard_date")
      };

      // 保存点击的日期
      this.currentQiandaoDate = postData.date;

      this.axios.post("/School/get_detail_punchcard", postData).then(data => {
        console.log("qiandao", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
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
    }
  },
  mounted() {
    let child = sessionStorage.getItem("child");
    if (child) {
      this.getInfo(child);
    } else {
      this.getChild();
    }
    this.getCurrentDayQiandaoArr();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background-color: #fff;

    .children-ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 0 20px 10px #FBF7F3;

        .child-li {
            display: flex;
            align-items: center;
            padding-bottom: 1rem;
            border-bottom: 1px solid #f4f4f4;

            .avatar-div {
                width: 4rem;
                height: 4rem;
                margin-right: 1rem;
                border-radius: 50%;
                // border: solid 1px #ccc;
                background-color: #eee;

                .avatar-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .child-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 70%;

                .up-div {
                    width: 100%;
                    padding 0 0 0.25rem 0;

                    .name {
                        font-size: 1.49rem;
                        letter-spacing: 1px;
                        font-weight: bold;
                        color: #5f5d5d;
                    }
                }

                .down-div {
                    width: 100%;
                    padding: 0.25rem 0 0 0;

                    .same-padding {
                        padding: 0.1rem 0.5rem;
                        border-radius: 5px;
                        font-weight: 500;
                    }

                    .qiandao {
                        font-size: 0.8rem;
                        color: #EAA46C;
                        background-color: #FED6B5;
                    }

                    .id {
                        font-size: 1.39rem;
                        font-weight: 500;
                        color: #999;
                    }
                }
            }

            .arrow {
                height: 1rem;
            }
        }

        .myqdxx {
            padding: 2rem 0;
            text-align: center;
            font-size: 1rem;
            letter-spacing: 1px;
            color: #939393;
        }

        .time-wendu-qiandao {
            display: flex;
            justify-content: space-around;
            margin: 1rem 0;
            font-size: 1.5rem;

            .time {
                width: 60%;
                font-weight: 500;
                color: #999;
            }

            .wendu {
                .wenduji {
                    height: 1rem;
                }

                .wendu {
                    font-weight: 200;
                    color: #A0A0A0;
                }
            }

            .qiandao {
                font-weight: 500;
                color: #74AE9B;
            }
        }

        .qiandao-img {
            width: 100%;

            .img {
                width: 100%;
            }
        }
    }
}
</style>
