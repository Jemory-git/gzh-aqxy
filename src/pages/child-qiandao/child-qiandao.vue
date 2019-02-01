<template>
    <div class="wrapper">
        <div class="children-ul">
            <div class="child-li">
                    <div class="avatar-div">
                        <img class="avatar-img" src="../../img/hlw.png" alt="" v-if="error">
                        <img class="avatar-img" :src="currentChild.head_img_url" alt="" @error="error = true" v-if="!error">
                    </div>
                <div class="child-info">
                    <div class="up-div">
                        <span class="name">{{currentChild.name}}</span>
                    </div>
                    <div class="down-div">
                        <span class="id">学号：{{currentChild.student_code || danciQiandaoObj.student_code}}</span>
                        <!-- <span class="qiandao same-padding">全勤</span> -->
                    </div>
                </div>
                <!-- <img class="arrow" src="./arrow.png" alt="" > -->
            </div>
            <div class="time-wendu-qiandao">
                <span class="time">{{danciQiandaoObj.year}}-{{danciQiandaoObj.month}}-{{danciQiandaoObj.day}} {{danciQiandaoObj.time}}</span>
                <div class="wendu">
                    <!-- <img class="wenduji" src="" alt=""> -->
                    <!-- <span class="wendu">36℃</span> -->
                </div>
                <span class="qiandao">{{danciQiandaoObj.round_name}}</span>
            </div>
            <div class="qiandao-img">
                <img class="img" :src="danciQiandaoObj.student_img_url" alt="" v-if="danciQiandaoObj.student_img_url">
            </div>
        </div>
    </div>
</template>

<script>
// ?state=1&tel=18159800156&open_id=oS__X1cVpSelfHNduHGzE7DyHHYc&student_id=64&homework_id=&round_id=2&punchcard_date=2018-09-03
import { formatTime } from "../../js/util.js";
export default {
  components: {},
  data() {
    return {
      currentChild: {},
      danciQiandaoObj: {},
      error: false
    };
  },
  methods: {
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
    getDanciQiandaoObj() {
      let postData = {
        student_id: sessionStorage.getItem("student_id"),
        open_id: sessionStorage.getItem("open_id"),
        punchcard_date: sessionStorage.getItem("punchcard_date"),
        round_id: sessionStorage.getItem("round_id")
      };
      console.log(postData);

      this.axios
        .post("/School/get_detail_punchcard_info", postData)
        .then(data => {
          console.log("单次", data);
          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }
          // 请求成功
          // 转换时间
          let dateObj = formatTime(
            new Date(
              parseInt(data.data.punchcard_info.punchcard_datetime + "000")
            )
          ).dateObj;
          data.data.punchcard_info = Object.assign(
            data.data.punchcard_info,
            dateObj
          );
          // 更新视图
          this.danciQiandaoObj = data.data.punchcard_info;
        });
    }
  },
  mounted() {
    this.getChild();
    this.getDanciQiandaoObj();
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

            .avatar-div {
                width: 4rem;
                height: 4rem;
                margin-right: 1rem;
                border-radius: 50%;
                border: solid 1px #ccc;
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
                justify-content: center;
                width: 70%;

                .up-div {
                    width: 100%;
                    padding: 0 0 0.25rem 0;

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
