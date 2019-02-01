<template>
    <div class="wrapper">
        <div class="inner-wrapper">
            <div class="first-div">
                <div class="avatar-div">
                    <img class="avatar-img" src="../../img/hlw.png" alt="" v-if="error">
                    <img class="avatar-img" :src="currentChild.head_img_url === undefined ? currentChild.now_student_info.head_img_url : currentChild.head_img_url" alt="" @error="error = true" v-if="!error">
                </div>
                <div class="child-info">
                    <div class="up-div">
                        <span class="name">{{ currentChild.name || currentChild.now_student_info.name}}</span>
                    </div>
                    <div class="down-div">
                        <span class="id">学号：{{currentChild.student_code || currentChild.now_student_info.student_code}}</span>
                    </div>
                </div>
            </div>
            <div class="second-div">
                <span class="biaoti">
                    标题
                </span>
                <span class="title">
                    {{currentGonggaoObj.title}}
                </span>
            </div>
            <div class="second-div">
                <span class="biaoti">
                    发布时间
                </span>
                <span class="shijian">
                    {{currentGonggaoObj.datetime}}
                </span>
            </div>
            <div class="third-div">
                <p class="neirong">内容</p>
                <p class="content" v-html="currentGonggaoObj.content ? currentGonggaoObj.content.replace(/\n/g, '<br/>') : ''"></p>
            </div>
        </div>
    </div>    
</template>

<script>
import { formatTime } from "../../js/util.js";
export default {
  data() {
    return {
      currentChild: {now_student_info:{}},
      currentGonggaoObj: {},
      error: false,
      qs: {},
      homework_publish_flow_id: ""
    };
  },
  methods: {
    toChildQiandao() {
      this.$router.push("/child-qiandao");
    },
    getInfo(child) {
      // 点进来的就在存储里拿孩子信息
      this.currentChild = child ? JSON.parse(child) : {};
    },
    getGonggao(gonggaoObj) {
      // 点进来的就在存储里拿信息
      this.currentGonggaoObj = gonggaoObj ? JSON.parse(gonggaoObj) : {};
    },
    getChild() {
      // 推送来的话，请求孩子信息
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
    getCurrentGonggao() {
      // 请求公告信息
      let postData = {
        student_id: sessionStorage.getItem("student_id")
          ? sessionStorage.getItem("student_id")
          : sessionStorage.getItem("childId"),
        open_id: sessionStorage.getItem("open_id"),
        notice_id: sessionStorage.getItem("notice_id")
      };
      this.axios.post("/School/notice_detail", postData).then(data => {
        console.log("CurrentGonggao", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.currentGonggaoObj = data.data.notice_info;

        // 转换时间
        let datetime = formatTime(new Date(parseInt(this.currentGonggaoObj.date_time + '000')));
        
        this.$set(this.currentGonggaoObj, 'datetime', datetime.dateStr + ' ' + datetime.timeStr)
      });
    },
  },
  mounted() {
    let child = sessionStorage.getItem("child");
    let gonggaoObj = sessionStorage.getItem("currentGonggao");
    if (child) {
      this.getInfo(child);
      this.getGonggao(gonggaoObj);
    } else {
      this.getChild();
      this.getCurrentGonggao();
    }
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

    .inner-wrapper {
        box-sizing: border-box;
        width: 100%;
        padding: 1rem;
        box-shadow: 0 0 20px 10px #FBF7F3;

        .first-div {
            display: flex;
            align-items: center;
            width: 100%;

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

                    .id {
                        font-size: 1.39rem;
                        color: #999;
                    }
                }
            }
        }

        .second-div {
            display: flex;
            justify-content: space-between;
            padding: 1rem 0;
            font-size: 1.5rem;

            .biaoti {
                width: 20%;
                margin-right: 1rem;
                font-weight: 500;
                color: #333;
            }

            .title {
                max-width: 80%;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                color: #646464;
                letter-spacing: 2px;
            }

            .shijian{
                color: #646464;
            }
        }

        .third-div {
            padding: 0 0 1rem;
            font-size: 1.5rem;

            .neirong {
                padding: 1rem 0 0.5rem;
                font-weight: 500;
                color: #333;
            }

            .content {
                min-height: 17rem;
                padding: 1rem 0;
                line-height: 2.4rem;
                text-indent: 2em; 
                letter-spacing: 2px;
                color: #646464;
                overflow hidden
            }
        }

        .confirm-btn {
            position: relative;
            height: 5rem;
            width: 90%;
            margin: 7rem auto 2rem;
            background-color: #FFCC34;

            .same-style {
                position: absolute;
                left: 50%;
                top: 50%;
            }

            .queren {
                transform: translate3d(-50%, -50%, 0);
                font-size: 1.8rem;
                color: #333;
            }

            .img {
                height: 9rem;
                width: 13rem;
                transform: translate3d(0%, -100%, 0);
            }
        }
    }
}
</style>

