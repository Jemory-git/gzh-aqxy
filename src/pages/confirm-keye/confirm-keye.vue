<template>
  <div class="wrapper">
    <div class="inner-wrapper" :class="{'minheight4': keyeConfirmed}">
      <!-- <div class="first-div">
        <div class="name-head-id">
          <div class="avatar-div">
            <img class="avatar-img" src="../../img/hlw.png" alt v-if="error">
            <img
              class="avatar-img"
              :src="currentChild.head_img_url === undefined ? currentChild.now_student_info.head_img_url : currentChild.head_img_url"
              alt
              @error="error = true"
              v-if="!error"
            >
          </div>
          <span class="name">{{currentChild.name || currentChild.now_student_info.name}}</span>
          <span
            class="id"
          >学号：{{currentChild.student_code || currentChild.now_student_info.student_code}}</span>
        </div>
      </div>-->
      <div class="second-div">
        <span class="title">{{currentKeyeObj.title}}</span>
      </div>
      <div class="faburen">
        <span class="key">发布人：</span>
        <span class="value">{{currentKeyeObj.teacher_name}}</span>
      </div>
      <div class="faburen">
        <span class="key">接收人：</span>
        <span class="value">{{currentChild.name || currentChild.now_student_info.name}}</span>
      </div>
      <div class="faburen">
        <span class="key">发布日期：</span>
        <span class="value">{{currentKeyeObj.datetime || currentKeyeObj.homework_date}}</span>
      </div>
      <div class="third-div">
        <p
          class="content"
          v-html="currentKeyeObj.content ? currentKeyeObj.content.replace(/\n/g, '<br/>') : ''"
        ></p>
        <div class="img-div" v-if="imgUrlArr.length > 0">
          <img
            :src="item"
            class="img"
            :class="[{'height0': item === ''},{'this-img-need-grow': item !== ''},imgClass]"
            :data-index1="1"
            :data-index2="index"
            v-for="(item, index) in imgUrlArr"
            :key="item"
          >
        </div>
      </div>
      <div class="four-div" v-if="wenjianArr.length > 0">
        <p class="first-p">附件</p>
        <ul class="ul">
          <li class="li" v-for="item in wenjianArr" :key="item">
            <img class="img" src="../../img/file.png" alt>
            <div class="file">
              <p class="name">{{item.name}}</p>
              <!-- <p class="daxiao">3.2M</p> -->
            </div>
            <div class="caozuo">
              <a class="xiazai" @click="toDownload(item.url, item.name)">下载</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="buchongshuoming" v-if="buchongshuomingArr.length > 0">
        <p class="first-p">补充说明</p>
        <ul class="ul">
          <li class="li" v-for="item in buchongshuomingArr" :key="item">{{item.content}}</li>
        </ul>
      </div>
      <!-- <div class="wanchengshijian">
        <span class="key">完成时间</span>
        <span class="value">{{currentKeyeObj.completion_time}}</span>
      </div>-->
    </div>
    <div class="jiaoliujilu" v-if="questionList.length > 0 || hasNewQuestion">
      <!-- <div class="jiaoliujilu"> -->
      <p class="wodetiwen" ref="wodetiwen">我的提问</p>
      <div
        class="tiwen-list"
        v-for="(item, index) in questionList"
        :key="item"
        @touchstart.stop="hideAllfuzhishanchu"
      >
        <div class="fuzhishanchu" v-show="showfuzhishanchuBooArr[index]">
          <span class="fuzhi" @click="copyWenti($event,item.content)">复制</span>
          <span class="shanchu" @click="deleteComment(index, item.comment_id)">删除</span>
          <span class="sanjiao"></span>
        </div>
        <p
          class="wenti"
          @touchstart.stop="touchstart($event, item.comment_id, index)"
          @touchmove.stop="touchmove($event, item.comment_id, index)"
          @touchend.stop="touchend($event, item.comment_id, index)"
        >{{item.content}}</p>
        <p class="riqi">{{item.dateTime}}</p>
        <div class="laoshi-huifu-list" v-if="item.replys.length > 0">
          <p class="huifu-item" v-for="reply in item.replys" :key="reply">
            <span class="laoshi-xingming">{{currentKeyeObj.teacher_name}}的回复：</span>
            <span
              class="huifuneirong"
              v-html="reply.content ? reply.content.replace(/\n/g, '<br/>') : ''"
            ></span>
          </p>
        </div>
      </div>
    </div>
    <div class="confirm-btn" @click="confirmKeye" v-if="!keyeConfirmed">
      <!-- <div class="confirm-btn" @click="confirmKeye"> -->
      <div class="queren"></div>
    </div>
    <div class="jiaoliu">
      <div class="borderdiv">
        <input type="text" class="input" placeholder="向老师提问" ref="input">
      </div>
      <span class="fasong" @click="sendQuestion">发送</span>
      <!-- <div class="cover-btn" @click="fixedInputShowBoo = true"></div> -->
    </div>
    <!-- <div class="fixed-input" :class="{'fixed-input-show': fixedInputShowBoo}">
      <textarea name id ref="textarea" class="textarea" placeholder="问题需要50个字以内哦" @keypress.enter="wanchengQuestion($event)"></textarea>
    </div>-->
  </div>
</template>

<script>
import { formatTime } from "../../js/util.js";
export default {
  data() {
    return {
      currentChild: { now_student_info: {} },
      currentKeyeObj: { attachments: [] },
      error: false,
      keyeConfirmed: true,
      hasNewQuestion: false,
      // fixedInputShowBoo: false,
      qs: {},
      homework_publish_flow_id: "",
      imgUrlArr: [],
      wenjianArr: [],
      buchongshuomingArr: [],
      showfuzhishanchuBooArr: [],
      questionList: [{ replys: [] }],
      timeOut: "",
      imgClass: ""
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
    getKeye(keyeObj) {
      // 点进来的就在存储里拿信息
      this.currentKeyeObj = keyeObj ? JSON.parse(keyeObj) : {};

      // 分开图片和文件
      this.gatherImg();
      this.gatherFile();

      // 收集图片
      this.eventHub.$emit("imgsrcgot");
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
    getCurrentKeye() {
      // 请求课业信息
      let postData = {
        ...this.get3id()
      };
      this.axios.post("/School/get_homework_detail", postData).then(data => {
        console.log("CurrentKeye", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.currentKeyeObj = data.data.homework_info;

        // 分开图片和文件
        this.gatherImg();
        this.gatherFile();

        // 收集图片
        this.eventHub.$emit("imgsrcgot");
      });
    },
    getKeyeStatus() {
      let postData = {
        ...this.get3id()
      };
      this.axios.post("/School/is_confirm", postData).then(data => {
        console.log(data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.keyeConfirmed = data.data.is_confirmed === 1 ? true : false;
        this.homework_publish_flow_id = data.data.homework_publish_flow_id;
      });
    },
    gatherImg() {
      // 取出图片
      this.currentKeyeObj.attachments.forEach((c, i) => {
        if (c.type === 1) {
          this.imgUrlArr.push(c.url);
        }
      });

      let len = this.imgUrlArr.length;
      switch (len) {
        case 1:
          this.imgClass = "img1";
          break;

        case 2:
          this.imgClass = "img2";
          break;

        default:
          this.imgClass = "img3";
          break;
      }

      if (len > 2 && len % 3 !== 0) {
        // 如果照片数量不是三的倍数，额外补充一条空的img
        this.imgUrlArr.push("");
      }
    },
    gatherFile() {
      // 取出文件
      this.currentKeyeObj.attachments.forEach((c, i) => {
        if (c.type === 2) {
          this.wenjianArr.push(c);
        }
      });
    },
    confirmKeye() {
      let postData = {
        homework_publish_flow_id: this.homework_publish_flow_id
      };
      this.axios.post("/School/homework_confirm", postData).then(data => {
        console.log(data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.promptBox.autoHide(data.errmsg);
        this.keyeConfirmed = true;
      });
    },
    toDownload(url, name) {
      //   this.$router.push({ name: "download", params: { url, name } });
      //   window.open(`http://192.168.31.31:8080/download?url=${url}&name=${name}`);
      window.open(
        `http://jms.h5.weixin.haotuoguan.cn/download?url=${url}&name=${name}`
      );
    },
    sendQuestion() {
      let inputValue = this.$refs.input.value;
      if (!inputValue) {
        this.promptBox.autoHide("还没有输入问题哦");
        return;
      }
      if (inputValue.length > 50) {
        this.promptBox.autoHide("字数过长哦，精简一下吧");
        return;
      }
      let postData = {
        ...this.get3id(),
        student_name:
          this.currentChild.name || this.currentChild.now_student_info.name,
        content: inputValue
      };
      this.axios.post("/School/add_comment", postData).then(data => {
        console.log(data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        this.$refs.input.value = "";

        // 显示添加的提问
        this.hasNewQuestion = true;
        let date = formatTime(new Date());
        this.questionList.unshift({
          content: inputValue,
          dateTime: date.dateStr + " " + date.timeStr,
          replys: []
        });

        // 滚动页面位置到新的提问
        this.$nextTick(() => {
          this.scrollPage();
        });
      });
    },
    getComment() {
      let postData = {
        ...this.get3id()
      };
      this.axios.post("/School/get_comment_list", postData).then(data => {
        console.log(data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        let questionList = data.data.comment_list.comments;
        if (!questionList) {
          return;
        }
        questionList.forEach((c, i) => {
          let date = formatTime(new Date(parseInt(c.comment_date + "000")));
          c.dateTime = date.dateStr + " " + date.timeStr;
        });
        this.questionList = questionList;
        this.buchongshuomingArr = data.data.comment_list.supplements;
      });
    },
    get3id() {
      // 返回openid studentid homeworkid
      let currentKeye = sessionStorage.getItem("currentKeye")
        ? JSON.parse(sessionStorage.getItem("currentKeye"))
        : false;
      return {
        student_id: sessionStorage.getItem("student_id")
          ? sessionStorage.getItem("student_id")
          : sessionStorage.getItem("childId"),
        open_id: sessionStorage.getItem("open_id"),
        homework_id: currentKeye
          ? currentKeye.id
          : sessionStorage.getItem("homework_id")
      };
    },
    touchstart(e, id, index) {
      this.beginJishi(id, index);
    },
    touchmove(e) {
      clearTimeout(this.timeOut);
    },
    touchend(e) {
      clearTimeout(this.timeOut);
    },
    beginJishi(id, index) {
      this.timeOut = setTimeout(() => {
        this.showFuzhiShanchuBtn(index);
      }, 1000);
    },
    showFuzhiShanchuBtn(index) {
      this.$set(this.showfuzhishanchuBooArr, index, true);
    },
    hideAllfuzhishanchu() {
      // 隐藏按钮
      setTimeout(() => {
        this.showfuzhishanchuBooArr = [];
      }, 500);
    },
    deleteComment(i, comment_id) {
      this.promptBox.confirm("确定要删除这条问题吗？", () => {
        let postData = {
          open_id: sessionStorage.getItem("open_id"),
          comment_id
        };
        this.axios.post("/School/delete_comment", postData).then(data => {
          console.log(data);
          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }
          // 请求成功
          this.questionList.splice(i, 1);
        });
      });
    },
    scrollPage() {
      let wodetiwen = this.$refs.wodetiwen;
      let positionObj = wodetiwen.getBoundingClientRect();
      if (!positionObj || !positionObj.y || positionObj.y > 0) {
        // 如果我的提问处于页面中，就不需要滚动
        return;
      }
      let cScrollY = window.scrollY;
      let destination = cScrollY + positionObj.y || 0;
      let jishiqi = setInterval(() => {
        window.scrollTo(0, (cScrollY -= 30));
        if (cScrollY < destination) {
          clearInterval(jishiqi);
        }
      }, 30);
    },
    copyWenti(e, m) {
      // input对象的setSelectionRange和document.execCommand实现一键复制的功能
      let targetEl = e.target;
      let inputEl = document.createElement("INPUT");
      inputEl.value = m;
      inputEl.style.height = "0";
      inputEl.style.width = "0.1px";
      targetEl.appendChild(inputEl);
      inputEl.focus();
      inputEl.setSelectionRange(0, inputEl.value.length);
      document.execCommand("copy", true);
    },
    markReaded() {
      //将本篇作业标记已读，存入session
      sessionStorage.setItem("readed_keye_id", this.get3id().homework_id);
    }
    // wanchengQuestion(e){
    //   let inputValue = this.$refs.textarea.value;
    //   if (!inputValue) {
    //     this.fixedInputShowBoo = false;
    //     return;
    //   }
    //   if (inputValue.length > 50) {
    //     this.promptBox.autoHide("字数过长哦，精简一下吧");
    //     return;
    //   }
    //   let postData = {
    //     ...this.get3id(),
    //     student_name:
    //       this.currentChild.name || this.currentChild.now_student_info.name,
    //     content: inputValue
    //   };
    //   this.axios.post("/School/add_comment", postData).then(data => {
    //     console.log(data);
    //     if (data.errcode != 0) {
    //       // 请求失败
    //       this.promptBox.prompt(data.errmsg);
    //       return;
    //     }
    //     // 请求成功
    //     this.$refs.textarea.value = "";
    //     this.fixedInputShowBoo = false;

    //     // 显示添加的提问
    //     this.hasNewQuestion = true;
    //     let date = formatTime(new Date());
    //     this.questionList.unshift({
    //       content: inputValue,
    //       dateTime: date.dateStr + " " + date.timeStr,
    //       replys: []
    //     });

    //     // 滚动页面位置到新的提问
    //     this.$nextTick(() => {
    //       this.scrollPage();
    //     });
    //   });
    // }
  },
  mounted() {
    let child = sessionStorage.getItem("child");
    let keyeObj = sessionStorage.getItem("currentKeye");
    if (child) {
      this.getInfo(child);
      this.getKeye(keyeObj);
    } else {
      this.getChild();
      this.getCurrentKeye();
    }
    this.getKeyeStatus();
    this.getComment();
    this.markReaded();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background-color: #F2F2F2;

  .inner-wrapper {
    box-sizing: border-box;
    width: 100%;
    min-height: calc(100vh - 14rem);
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 0;
    margin-bottom: 1rem;
    background-color: #fff;

    .second-div {
      display: flex;
      align-items: center;
      padding-bottom: 1.5rem;

      .title {
        font-size: 1.5rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        letter-spacing: 1px;
        color: rgba(51, 51, 51, 1);
      }

      .shijian {
        font-size: 1.2rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }

    .faburen {
      padding: 0.5rem 0;
      border-bottom: 1px dashed #CCC;

      .key, .value {
        font-size: 1.5rem;
        font-family: PingFang-SC-Bold;
        font-weight: 400;
      }

      .key {
        color: #999;
      }

      .value {
        color: rgba(102, 102, 102, 1);
      }
    }

    .third-div {
      flex-grow: 1;
      padding: 0 0 2rem;
      font-size: 1.5rem;

      .content {
        // min-height: 17rem;
        padding: 2rem 0 0;
        line-height: 2rem;
        text-indent: 2em;
        letter-spacing: 2px;
        font-size: 1.5rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        overflow: hidden;
      }

      .img-div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        padding-top: 1rem;

        .img {
          margin-bottom: 1rem;
        }

        .img1 {
          width: calc(100vw - 4rem);
          height: calc(100vw - 4rem);
        }

        .img2 {
          width: calc((100vw - 4rem) * 0.49);
          height: calc((100vw - 4rem) * 0.49);
        }

        .img3 {
          width: calc((100vw - 4rem) * 0.33);
          height: calc((100vw - 4rem) * 0.33);
        }

        .height0 {
          margin-bottom: 0;
          opacity: 0;
          height: 1px;
        }
      }
    }

    .four-div {
      padding-bottom: 2rem;

      .first-p {
        padding: 0.5rem 0;
        font-size: 1.5rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }

      .ul {
        .li {
          display: flex;
          justify-content: space-between;
          padding: 1rem;

          .img {
            width: 2.5rem;
            height: 3rem;
          }

          .file {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 0.5rem;

            .name, .daxiao {
              padding: 0.1rem;
              font-size: 1.2rem;
              font-family: DengXian-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }

            .daxiao {
              color: #999;
            }
          }

          .caozuo {
            display: flex;
            align-items: center;

            .xiazai, .dakai {
              width: 4rem;
              height: 2rem;
              line-height: 2rem;
              text-align: center;
              border-radius: 0.5rem;
              font-size: 1.1rem;
              letter-spacing: 1px;
              font-family: DengXian-Regular;
              font-weight: 400;
              color: #463EED;
            }
          }
        }
      }
    }

    .buchongshuoming {
      padding-bottom: 2rem;

      .first-p {
        padding: 0.5rem 0 0.5rem;
        font-size: 1.5rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: #333;
      }

      .ul {
        .li {
          padding: 0.5rem 0;
          font-size: 1.3rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }

  .minheight4{
    min-height: calc(100vh - 4rem);
  }

  .jiaoliujilu {
    margin-top: 1rem;
    padding: 1rem 2rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;

    .wodetiwen {
      padding-bottom: 1rem;
      font-size: 1.4rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }

    .tiwen-list {
      position: relative;
      margin-bottom: 1rem;
      font-weight: 400;

      .fuzhishanchu {
        position: absolute;
        display: flex;
        left: 50%;
        top: -4rem;
        transform: translateX(-50%);
        color: #fff;

        // font-size: 0;
        .fuzhi, .shanchu {
          padding: 1rem 1.5rem;
          background-color: rgba(0, 0, 0, 0.7);
          font-size: 1.5rem;
        }

        .fuzhi {
          border-radius: 0.5rem 0 0 0.5rem;
        }

        .shanchu {
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .sanjiao {
          position: absolute;
          left: 50%;
          bottom: -2rem;
          height: 0rem;
          width: 0rem;
          border-style: solid;
          border-width: 1rem;
          border-color: transparent rgba(0, 0, 0, 0.7) transparent transparent;
          transform: translateX(-50%) rotateZ(-90deg);
          // background-color: rgba(0, 0, 0, 0.5);
        }
      }

      .wenti {
        padding: 1rem 0;
        user-select: none;
        font-size: 1.3rem;
        color: rgba(51, 51, 51, 1);
      }

      .riqi {
        letter-spacing: 1px;
        font-size: 1rem;
        color: #ccc;
      }

      .huifu-item {
        padding: 1rem;
        background-color: #eee;

        .laoshi-xingming {
          font-size: 1.3rem;
          color: rgba(51, 51, 51, 1);
        }

        .huifuneirong {
          font-size: 1.3rem;
          color: #666;
        }
      }
    }

    .tiwen-list+.tiwen-list {
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .tiwen-list:last-child {
      margin-bottom: 0;
    }
  }

  .confirm-btn {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    width: 100%;
    padding: 3rem 2rem;
    margin-bottom: 0.1rem;
    background-color: #fff;

    .queren {
      width: 100%;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      border-radius: 2rem;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../img/keye-anniu.png');
      box-shadow: 0 1rem 1rem 0rem rgba(247, 207, 71, 0.2);
    }
  }

  .jiaoliu {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;

    .borderdiv {
      flex-grow: 1;
      border: solid 1px #ddd;
      border-radius: 5px;

      .input {
        box-sizing: border-box;
        height: 3rem;
        width: 100%;
        padding-left: 1rem;
        background-color: #f8f8f8;
        letter-spacing: 1px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #333;
      }
    }

    .fasong {
      padding: 1rem;
      font-size: 1.4rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(70, 62, 237, 1);
      letter-spacing: 1px;
    }

    .input::-webkit-input-placeholder {
      font-size: 1.2rem;
      letter-spacing: 1px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
    }

    .cover-btn {
      padding: 1rem;
    }
  }

  .fixed-input {
    position: fixed;
    left: 0;
    top: 100%;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    transition: all 0.3s ease-out;

    .textarea {
      box-sizing: border-box;
      height: 50%;
      width: 100%;
      padding: 1rem;
      appearance: none;
      border: none;
      letter-spacing: 1px;
      font-size: 1.5rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .fixed-input-show {
    top: 0;
  }
}
</style>

