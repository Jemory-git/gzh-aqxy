<template>
  <div class="wrapper">
    <dataProcess class="min-height100vh" v-bind="dataProcessOptions">
      <div class="header-and-function">
        <div class="header">
          <div class="child-div">
            <div class="avatar-div" @click="toChild">
              <img
                class="avatar-img"
                src="../../img/hlw.png"
                alt
                v-if="!currentChild.now_student_info.head_img_url || headerTouxiangError"
              >
              <img
                class="avatar-img"
                :src="currentChild.now_student_info.head_img_url"
                alt
                @error="headerTouxiangError = true"
                v-else
              >
              <img
                class="qiehuan"
                src="../../img/qiehuan.png"
                alt
                @click.stop="toggleMoreBtns('show')"
                v-if="children.length > 1"
              >
              <div
                class="more-btns"
                :class="{'hide-more-btns': hideMoreBtns}"
                @click.stop="toggleMoreBtns('hide')"
              >
                <div class="cover-div" @touchmove.stop.prevent="1+1"></div>
                <div class="show-btns">
                  <div class="btn" v-if="children.length > 1">
                    <div
                      class="haizi-list"
                      v-for="(item, index) in children"
                      :key="item"
                      @click="qiehuanChild(item.id, item.class.id)"
                    >
                      <img
                        class="avatar-img"
                        src="../../img/hlw.png"
                        v-if="!item.head_img_url || touxiangError[index]"
                      >
                      <img
                        class="avatar-img"
                        :src="item.head_img_url"
                        alt
                        @error="onTouxiangError(index)"
                        v-else
                      >
                      <span class="span span-same">{{item.name}}</span>
                    </div>
                  </div>
                  <div class="btn quit-btn" @click="quit">
                    <img class="btnimg" src="../../img/quit.png" alt>
                    <span class="span span-same">退出</span>
                  </div>
                  <div class="sanjiao"></div>
                </div>
              </div>
            </div>
            <div class="child-info">
              <div class="up-div">
                <span class="name" @click="toChild">{{currentChild.now_student_info.name}}</span>
                <span
                  class="class same-padding"
                  @click="toChild"
                >{{currentChild.now_student_info.class.alias}}{{currentChild.now_student_info.class.name}}</span>
              </div>
              <div
                class="right-div"
                @click="toDangriQiandao(currentChild.today_put_count.sign_in, currentChild.today_put_count.sign_out, currentChild.now_student_info.id)"
              >
                <div class="qiandao">
                  <span class="cishu">{{currentChild.today_put_count.sign_in || 0}}</span>
                  <span class="span">签到</span>
                </div>
                <div class="qiandao">
                  <span class="cishu">{{currentChild.today_put_count.sign_out || 0}}</span>
                  <span class="span">签退</span>
                </div>
              </div>
              <!-- <span class="down-div id">学号：{{currentChild.now_student_info.student_code}}</span> -->
            </div>
          </div>
          <img class="img" src="../../img/zhiri.png" alt v-if="currentChild.is_class_by == 1">
        </div>
        <ul class="function-entry">
          <li class="li keye">
            <img
              class="img-btn"
              src="../../img/x-ky.png"
              alt
              @click="toChildkeye($event, currentChild.now_student_info.name, currentChild.now_student_info.id)"
            >
            <p class="p">课业</p>
          </li>
          <li
            class="li"
            @click="toKaoqin($event,  currentChild.now_student_info.name, currentChild.now_student_info.id, currentChild.now_student_info.head_img_url)"
          >
            <img class="img-btn" src="../../img/x-kaoqin.png" alt>
            <p class="p">考勤</p>
          </li>
          <li
            class="li"
            @click="toKechengbiao($event, currentChild.now_student_info.name, currentChild.now_student_info.id, currentChild.now_student_info.class.id)"
          >
            <img class="img-btn" src="../../img/x-kechengbiao.png" alt>
            <p class="p">课程表</p>
          </li>
          <li class="li" @click="toJianKong(currentChild.now_student_info.id)">
            <img class="img-btn" src="../../img/x-jiankong.png" alt>
            <p class="p">监控</p>
          </li>
          <li
            class="li"
            @click="toBanjidongtai($event, currentChild.now_student_info.id, currentChild.now_student_info.class.id)"
          >
            <img class="img-btn" src="../../img/x-xingxing.png" alt>
            <p class="p">班级动态</p>
          </li>
        </ul>
      </div>
      <div class="zuixindongtai">
        <div class="p" @click="toConfirmKeye($event, currentChild.now_student_info.id)">
          <span class="zuoyetongzhi">作业通知</span>
          <p class="xinxi" id="zuoye">{{currentChild.last_homework.title || '暂无作业'}}</p>
          <P class="gengduo">更多</P>
        </div>
        <div
          class="p"
          @click="toGonggao($event, currentChild.now_student_info.name, currentChild.now_student_info.id)"
        >
          <span class="banjigonggao">班级公告</span>
          <p class="xinxi" id="gonggao">{{currentChild.last_notice.title || '暂无公告'}}</p>
          <P class="gengduo">更多</P>
        </div>
      </div>
      <div
        class="todaykecheng"
        @click="toKechengbiao($event, currentChild.now_student_info.name, currentChild.now_student_info.id, currentChild.now_student_info.class.id)"
      >
        <p class="p">今日课程</p>
        <div class="kebiao" v-if="jintianmeiyoukeye">
          <img class="meike-img" src="../../img/meike-bg.png" alt="" width="100%">
        </div>
        <div class="kebiao" v-else>
          <ul class="shangwu ul">
            <li class="first-li">
              <span class="span">上午</span>
            </li>
            <li
              class="shangwukebiao"
              v-for="item in currentChild.kechengbiaoObj[1]"
              :key="item"
            >{{item.course_name}}</li>
          </ul>
          <ul class="ul shangwu xiawu">
            <li class="first-li">
              <span class="span">下午</span>
            </li>
            <li
              class="shangwukebiao"
              v-for="item in currentChild.kechengbiaoObj[2]"
              :key="item"
            >{{item.course_name}}</li>
          </ul>
          <ul class="ul shangwu wanshang">
            <li class="first-li">
              <span class="span">晚上</span>
            </li>
            <li
              class="shangwukebiao"
              v-for="item in currentChild.kechengbiaoObj[3]"
              :key="item"
            >{{item.course_name}}</li>
          </ul>
        </div>
      </div>
      <div class="jiaoshixinxi">
        <div class="p">教师信息</div>
        <div class="list-scroll">
          <ul class="laoshi-list">
            <li
              class="li"
              v-for="(item, index) in currentChild.teacher_dynamic"
              :key="item"
              @click="showLaoshi(index)"
            >
              <img
                class="avatar-img"
                src="../../img/hlw.png"
                alt
                v-if="!item.head_img_url || imgErrArr[index]"
              >
              <img class="avatar-img" :src="item.head_img_url" alt v-else @error="onimgerr(index)">
              <div class="wenzi">
                <span class="name">{{item.teacher_name}}</span>
                <span class="shenfen">{{item.is_head_teacher == 1 ? '班主任': '任课老师'}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cover-jiaoshixinxi" ref="cover">
        <div class="div-head">
          <img
            class="avatar-img"
            src="../../img/hlw.png"
            alt
            v-if="!currentShowTeacher.head_img_url || showingTeacherBoo"
          >
          <img
            class="avatar-img"
            :src="currentShowTeacher.head_img_url"
            alt
            v-else
            @error="onShowimgerr(showingTeacherBoo = true)"
          >
          <img class="shutdown" src="../../img/shutdown.png" alt @click="shutdownLaoshiCover">
        </div>
        <div class="div-miaoshu">
          <p class="title-p">
            <span class="xingming">{{currentShowTeacher.teacher_name}}</span>
            <span class="zhiwu">{{currentShowTeacher.is_head_teacher == 1 ? '班主任': '任课老师'}}</span>
          </p>
          <p class="miaoshu-p">{{currentShowTeacher.intro || '暂无详细介绍'}}</p>
        </div>
      </div>
      <bScroll
        class="bscroll"
        :class="{'show-list': showChildList}"
        v-bind="bScrollOptions"
        :data="refreshBscroll"
      >
        <div class="select-child fly-in">
          <div
            class="child fly-in-all"
            :class="{'fly-in-left': index % 2 === 0, 'fly-in-right': index % 2 !== 0}"
            v-for="(item, index) in children"
            :key="item"
            @click="qiehuanChild(item.id, item.class.id)"
          >
            <p class="xuehao">学号：{{item.student_code}}</p>
            <img
              class="avatar-img"
              src="../../img/hlw.png"
              alt
              v-if="!item.head_img_url || touxiangError[index]"
            >
            <img
              class="avatar-img"
              :src="item.head_img_url"
              alt
              @error="onTouxiangError(index)"
              v-else
            >
            <p class="name">{{item.name}}</p>
            <p class="class">{{item.class.name ? item.class.name : '该学生暂无班级'}}</p>
          </div>
        </div>
      </bScroll>
    </dataProcess>
  </div>
</template>

<script>
import { formatTime } from "../../js/util.js";
import dataProcess from "../../components/common/data-process/data-process.vue";
import bScroll from "../../components/common/b-scroll/b-scroll.vue";
export default {
  components: {
    bScroll,
    dataProcess
  },
  data() {
    return {
      children: [{ class: {} }],
      currentChild: {
        now_student_info: {
          class: {},
          month_puncard_total: {},
          last_notice: {}
        },
        today_put_count: {},
        last_notice: {},
        last_homework: {},
        kechengbiaoObj: { 1: [], 2: [], 3: [] },
        teacher_dynamic: [{}]
      },
      touxiangError: [],
      bScrollOptions: {
        click: true
      },
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      showChildList: false,
      headerTouxiangError: false,
      loginedTel: "",
      imgErrArr: [],
      refreshBscroll: 0,
      currentShowTeacher: {},
      showingTeacherBoo: false,
      jintianmeiyoukeye: false,
      hideMoreBtns: true
    };
  },
  methods: {
    toChild() {
      sessionStorage.setItem(
        "child",
        JSON.stringify(this.currentChild.now_student_info)
      );
      this.$router.push("/child");
    },
    toKaoqin(e, childName, childId, childHead) {
      this.sessionStorageSetItem([
        {key: "child",value: JSON.stringify(this.currentChild)},
        {key: "childId",value: childId},
        {key: "childName",value: childName},
        {key: "childHead",value: childHead}
      ]);
      // this.$router.push("/qiandao-history");
      this.$router.push("/kaoqin-jilu");
    },
    toJianKong(id) {
      sessionStorage.setItem("childId", id);
      this.$router.push({ name: "jiankong" });
    },
    toChildkeye(e, childName, childId, n) {
      n = undefined; // 暂时去掉今日课业的功能
      this.sessionStorageSetItem([
        {key: "child",value: JSON.stringify(this.currentChild)},
        {key: "childId",value: childId},
        {key: "childName",value: childName}
      ]);

      if (n === undefined) {
        // to 历史课业
        this.$router.push({ name: "child-keye-history" });
      } else {
        // to 当日课业
        sessionStorage.setItem("todayKeyeShuliang", n);

        this.$router.push({ name: "child-keye-today" });
      }
    },
    toGonggao(e, childName, childId) {
      if (document.getElementById("gonggao").innerText === "暂无公告") {
        return;
      }
      this.sessionStorageSetItem([
        {key: "child",value: JSON.stringify(this.currentChild)},
        {key: "childId",value: childId},
        {key: "childName",value: childName}
      ]);
      this.$router.push({ name: "gonggao" });
    },
    toKechengbiao(e, childName, childId, classId) {
      this.sessionStorageSetItem([
        { key: "child", value: JSON.stringify(this.currentChild) },
        { key: "childId", value: childId },
        { key: "classId", value: classId },
        { key: "childName", value: childName }
      ]);

      this.$router.push({ name: "kechengbiao" });
    },
    toConfirmKeye(e, childId) {
      if (document.getElementById("zuoye").innerText === "暂无作业") {
        return;
      }
      this.sessionStorageSetItem([
        {key: "child",value: JSON.stringify(this.currentChild)},
        {key: "childId",value: childId},
        {key: "currentKeye",value: JSON.stringify(this.currentChild.last_homework)}
      ]);
      this.$router.push("/confirm-keye");
    },
    toDangriQiandao(a, b, childId) {
      if (a == 0 && b == 0) {
        this.promptBox.autoHide("今天还没有签到信息哦");
        return;
      }
      this.sessionStorageSetItem([
        {key: "child",value: JSON.stringify(this.currentChild)},
        {key: "childId",value: childId},
        {key: "currentQiandaoObj",value: JSON.stringify(formatTime(new Date()).dateObj)}
      ]);
      this.$router.push("/dangri-qiandao");
    },
    toBanjidongtai(e, childId, classId) {
      this.sessionStorageSetItem([
        {key: "childId",value: childId},
        {key: "classId",value: classId}
      ]);
      this.$router.push({ name: "banjidongtai" });
    },
    getChildren() {
      // 在当前路由loginedTel保存当前登录状态的手机号,用于和存储中的比较
      this.loginedTel = sessionStorage.getItem("tel"); // 用于点退出按钮，切换账号的场景
      let local_jiazhang_phone = localStorage.getItem("tel"); // local中的tel只在本页有setItem操作
      let session_jiazhang_phone = sessionStorage.getItem("tel"); // session中的tel会在login页先setItem

      let postData = {
        phone: sessionStorage.getItem("tel"),
        open_id: sessionStorage.getItem("open_id")
      };
      this.axios.post("/School/query_children", postData).then(data => {
        this.$set(this.dataProcessOptions, "loaded", true);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        let students = data.data;
        let len = students.length;
        if (len === 0) {
          // 如果没有相关数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        this.children = students;

        if (len === 1) {
          if (students[0].class === "") {
            // 学生没有班级时，class为字符串
            this.promptBox.prompt(
              "你好，该学生没有加入班级，加入之后才有学生信息！",
              (c, i) => {
                this.openChildList({});
              }
            );
            return;
          }
          this.getChild(students[0].id, students[0].class.id);
          return;
        }
        if (len > 1) {
          students.forEach((c, i) => {
            // 学生没有班级时，class为字符串
            if (c.class === "") {
              c.class = {};
            }
          });
          if (local_jiazhang_phone !== session_jiazhang_phone) {
            this.openChildList({});
          } else {
            this.getChild(false, false, true);
          }
          return;
        }
      });
    },
    getChild(student_id, class_id, local) {
      if (local) {
        // 如果有local标识，就从local中取id
        student_id = localStorage.getItem("student_id");
        class_id = localStorage.getItem("class_id");
      } else {
        // 否则id就是传进来的，保存至local中
        localStorage.setItem("student_id", student_id);
        localStorage.setItem("class_id", class_id);
        // 保存新手机号至local中,local中的tel只在本页有setItem操作
        localStorage.setItem("tel", this.loginedTel);
      }

      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        student_id,
        class_id
      };
      this.axios.post("/School/main_index", postData).then(data => {
        console.log("child", data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功, 改造课程表数组
        let kechengbiaoObj = { 1: [], 2: [], 3: [] };
        if (data.data.today_course_table.length > 0) {
          data.data.today_course_table.forEach((c, i) => {
            kechengbiaoObj[c.slot].push(c);
          });
          data.data.kechengbiaoObj = kechengbiaoObj;
        } else {
          this.jintianmeiyoukeye = true;
        }

        // 排序老师列表，班主任排第一个去
        data.data.teacher_dynamic.sort((a, b) => {
          return a.is_head_teacher - b.is_head_teacher;
        });

        // 学生没有班级时，服务端不返回学生信息,打开列表让他重选,如果点的进来就肯定有班级，否则点不进来
        if (local && data.data.now_student_info.length === 0) {
          this.promptBox.prompt(
            "你好，该学生没有加入班级，加入之后才有学生信息！",
            () => {
              this.openChildList({});
            }
          );
          return;
        }

        // 更新视图
        this.currentChild = data.data;
      });
    },
    openChildList(e) {
      this.showChildList = true;
      this.$nextTick(() => {
        this.refreshBscroll++;
      });
    },
    qiehuanChild(student_id, class_id) {
      if (class_id === undefined) {
        return;
      }
      this.showChildList = false;
      this.getChild(student_id, class_id);
    },
    showLaoshi(i) {
      this.showingTeacherBoo = false;
      this.currentShowTeacher = this.currentChild.teacher_dynamic[i];
      this.$refs.cover.classList.add("displayflex");
    },
    shutdownLaoshiCover() {
      this.$refs.cover.classList.remove("displayflex");
    },
    onimgerr(i) {
      this.$set(this.imgErrArr, i, true);
    },
    onTouxiangError(i) {
      this.$set(this.touxiangError, i, true);
    },
    toggleMoreBtns(m) {
      if (m === "show") {
        this.hideMoreBtns = false;
      } else {
        this.hideMoreBtns = true;
      }
    },
    quit() {
      // 退出登录
      this.promptBox.confirm("确定要退出登录吗？", () => {
        let postData = {
          open_id: sessionStorage.getItem("open_id"),
          phone_no: sessionStorage.getItem("tel")
        };
        this.axios.post("/school/un_banding", postData).then(data => {
          console.log(data);
          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }
          // 请求成功
          // 记录退出状态
          sessionStorage.setItem("quitstatus", "true");

          this.$router.push("/login");
        });
      });
    },
    sessionStorageSetItem(kvArr) {
      kvArr.forEach((c, i) => {
        sessionStorage.setItem(c.key, c.value);
      });
    }
  },
  created() {
    this.getChildren();
  },
  activated() {
    // 由于keep-alive的影响。如果是退出登录重新登录进来的话，比较当前路由的手机号和存储中的手机号是否相同，如果不相同需要重新请求数据
    if (this.loginedTel !== sessionStorage.getItem("tel")) {
      // 存储中电话号码变化后，重新请求数据
      this.getChildren();
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;

  .header-and-function {
    height: 20rem;
    padding: 0 2rem;
    background-image: url('../../img/x-bg.png');
    background-repeat: no-repeat;
    background-size: contain;

    .header {
      position: relative;

      .child-div {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 12rem;
        padding-bottom: 2rem;

        .avatar-div {
          position: relative;
          width: 5rem;
          height: 5rem;
          border: solid 0.2rem #fff;
          border-radius: 50%;

          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .qiehuan {
            position: absolute;
            bottom: -0.5rem;
            right: -0.5rem;
            width: 2rem;
            height: 2rem;
          }

          .more-btns {
            .show-btns {
              position: absolute;
              top: 6rem;
              left: 0;
              width: 8rem;
              border-radius: 0.5rem;
              background-color: #fff;
              z-index: 10;

              .btn {
                padding-left: 1rem;

                .haizi-list {
                  height: 3rem;
                  display: flex;
                  align-items: center;

                  .span {
                    flex-grow: 1;
                    color: #333;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }

                .avatar-img {
                  height: 1.5rem;
                  width: 1.5rem;
                  border-radius: 50%;
                }

                .btnimg {
                  height: 1rem;
                  width: 1rem;
                }

                .span-same {
                  padding-left: 0.5rem;
                  font-size: 1rem;
                  font-family: DengXian-Bold;
                  font-weight: 400;
                  line-height: 1.8rem;
                }
              }

              .quit-btn {
                height: 2.5rem;
                padding-top: 0.5rem;
                border-top: solid 1px #F2F2F2;

                .span {
                  color: #6A7EF7;
                }
              }

              .sanjiao {
                position: absolute;
                width: 0;
                height: 0;
                left: 1rem;
                top: -1rem;
                border-style: solid;
                border-width: 0.5rem;
                border-color: transparent transparent #fff transparent;
              }
            }

            .cover-div {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              background-color: rgba(0, 0, 0, 0.2);
              z-index: 2;
            }
          }

          .hide-more-btns {
            .cover-div, .show-btns {
              display: none;
            }
          }
        }

        .child-info {
          display: flex;
          justify-content: space-between;
          flex-grow: 1;
          padding-left: 1.5rem;

          .up-div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 4rem;
            padding: 0.1rem 0 0 0;

            .name {
              font-size: 1.6rem;
              font-family: DengXian-Regular;
              font-weight: bold;
              color: #333;
            }

            .class {
              padding-top: 0.2rem;
              font-size: 1rem;
              font-family: DengXian-Regular;
              font-weight: 400;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .right-div {
            display: flex;
            flex-grow: 1;
            justify-content: flex-end;
            pointer-events: none;

            .qiandao {
              width: 4rem;
              height: 4rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 1rem;
              background-color: #fff;
              pointer-events: auto;

              .cishu {
                font-size: 1.6rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #333;
              }

              .span {
                font-size: 1rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: #999;
              }
            }

            .qiandao:first-child {
              margin-right: 2rem;
            }
          }
        }
      }

      .img {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10rem;
        // height: 4.5rem;
        z-index: 0;
      }
    }

    .function-entry {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 7rem;
      margin: 0 auto;
      padding: 1rem 1rem 0.5rem 1rem;
      background-color: #fff;
      box-shadow: 0rem 0rem 1rem 0rem rgba(51, 51, 51, 0.09);
      border-radius: 1rem;

      .li {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img-btn {
          width: 3rem;
          height: 3rem;
        }

        .p {
          padding-top: 0.8rem;
          text-align: center;
          font-size: 1.1rem;
          font-family: DengXian-Bold;
          font-weight: 400;
          color: #333;
        }
      }
    }
  }

  .todaykecheng {
    padding: 2rem 2rem 0.5rem;

    .p {
      flex-grow: 1;
      font-size: 1.4rem;
      font-family: PingFang-SC-Regular;
      font-weight: 600;
      color: #333;
    }

    .kebiao {
      padding-top: 1rem;

      .ul {
        display: flex;
        justify-content: space-between;
        height: 4rem;

        .first-li {
          height: 100%;
          width: 7rem;
          line-height: 4rem;
          text-align: center;

          .span {
            font-size: 1.3rem;
            font-family: PingFang-SC-Regular;
            font-weight: bold;
            color: inherit;
          }
        }

        .shangwukebiao {
          height: 4rem;
          width: calc(((100vw - 2rem - 8rem) / 6));
          line-height: 4rem;
          text-align: center;
          letter-spacing: 1px;
          font-size: 1.3rem;
          font-family: PingFang-SC-Regular;
          font-weight: 600;
          color: #666;
        }
      }

      .shangwu {
        background-color: #FCF3EE;

        .first-li {
          color: #F7CF48;
        }
      }

      .xiawu {
        background-color: #FBEFEF;

        .first-li {
          color: #F79E48;
        }
      }

      .wanshang {
        background-color: #F1F0FB;

        .first-li {
          color: #4E4DF8;
        }
      }
    }
  }

  .todaykaoqin {
    height: 5rem;
    border-top: 1rem solid #F1F1F1;
    border-bottom: 1rem solid #F1F1F1;

    .p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 1rem 0 0;

      .kuai {
        height: 1.5rem;
        width: 0.25rem;
        background-color: rgba(196, 134, 254, 1);
      }

      .jinrikecheng {
        padding-left: 1rem;
        font-size: 1.8rem;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: rgba(196, 134, 254, 1);
      }

      .img {
        width: 1.5rem;
        height: 1.5rem;
      }

      .dakacishu {
        flex-grow: 1;
        display: flex;
        align-items: center;
        padding-left: 2rem;

        .qiandao {
          font-size: 1.5rem;
          font-family: PingFang-SC-Regular;
          color: rgba(207, 210, 211, 1);

          .b {
            font-weight: bold;
            color: #FFCC34;
          }
        }

        .qiandao:last-child {
          padding-left: 2rem;
        }
      }
    }
  }

  .zuixindongtai {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    background-color: #fff;
    margin-top: 3rem;

    .p {
      width: 14rem;
      padding: 1rem;
      box-shadow: 0rem 0.5rem 1rem 0rem rgba(51, 51, 51, 0.09);
      border-radius: 1rem;

      .jinrikecheng {
        flex-grow: 1;
        padding-left: 1rem;
        font-size: 1.8rem;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: #333;
      }

      .banjigonggao, .zuoyetongzhi {
        border-radius: 0 2rem 2rem 0;
        font-size: 1.4rem;
        font-family: PingFang-SC-Regular;
        font-weight: bold;
        color: #333;
        background: linear-gradient(-45deg, #F7CF48 0%, #F7DF71 100%);
        background-size: 50% 35%;
        background-repeat: no-repeat;
        background-position: 0 70%;
      }

      .xinxi {
        flex-grow: 1;
        height: 8rem;
        padding-top: 1rem;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        font-family: PingFang-SC-Regular;
        font-size: 1.5rem;
        color: rgba(102, 102, 102, 1);
      }

      .leftdiv {
        padding: 0.3rem;
      }

      .gengduo {
        text-align: right;
        font-size: 0.9rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: #333;
      }
    }
  }

  .jiaoshixinxi {
    padding-bottom: 2rem;

    .p {
      padding: 2rem 0 0 2rem;
      font-size: 1.4rem;
      font-weight: 600;
      font-family: PingFang-SC-Regular;
      color: #333;
    }

    .list-scroll {
      width: 100%;
      padding: 1rem 0 2rem 0;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;

      .laoshi-list {
        display: inline-flex;
        padding: 0 1rem;

        .li {
          width: 11rem;
          height: 6rem;
          display: flex;
          align-items: center;
          padding-left: 1rem;
          box-shadow: 0rem 0.5rem 1rem 0rem rgba(51, 51, 51, 0.1);

          .avatar-img {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
          }

          .wenzi {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding-left: 1rem;

            .name {
              font-size: 1.2rem;
              font-family: PingFang-SC-Regular;
              color: #333;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .shenfen {
              font-size: 0.8rem;
              font-family: PingFang-SC-Light;
              color: #5340DD;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .li+.li {
          margin-left: 1rem;

          .two-img {
            // border-left: solid 1px #f5efef;
          }
        }
      }
    }
  }

  .cover-jiaoshixinxi {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;

    .div-head {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 80%;
      height: calc(100vw * 0.8 * 0.56);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../img/laoshibg.png');

      .avatar-img {
        margin-top: 1.2rem;
        margin-left: 0.1rem;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
      }

      .shutdown {
        position: absolute;
        width: 3rem;
        height: 3rem;
        right: 1rem;
        top: 1rem;
      }
    }

    .div-miaoshu {
      width: 80%;
      height: 25rem;
      border-radius: 0 0 0.5rem 0.5rem;
      background-color: #fff;
      box-shadow: 0 -1px 0 0 #fff;

      .miaoshu-p {
        max-height: 75%;
        padding: 1rem 2rem 0;
        text-indent: 2em;
        overflow-y: scroll;
        font-size: 1.2rem;
        font-family: DengXian-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 1.8rem;
        -webkit-overflow-scrolling: touch;
      }

      .title-p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 170, 55, 1);

        .xingming {
          padding-right: 0.5rem;
          font-size: 1.8rem;
        }

        .zhiwu {
          padding: 0 0.2rem;
          border: solid 1px rgba(255, 170, 55, 1);
          border-radius: 0.5rem;
          font-size: 0.8rem;
        }
      }
    }
  }

  .displayflex {
    display: flex;
  }

  .bscroll {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 2;

    .select-child {
      width: 100%;
      padding: 5rem 0;

      .child {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 20rem;
        width: 16rem;
        margin: 1rem auto;
        padding: 1rem;
        background-image: url('../../img/child-bg.png');
        background-size: 100% 100%;

        .xuehao {
          width: 100%;
          padding-bottom: 3.1rem;
          font-size: 1.2rem;
          font-family: DengXian-Regular;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }

        .avatar-img {
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          margin-left: 0.9rem;
          margin-top: 0.15rem;
        }

        .name {
          padding-top: 1rem;
          font-size: 1.5rem;
          font-family: DengXian-Regular;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }

        .class {
          padding-top: 0.5rem;
          font-size: 1.2rem;
          font-family: DengXian-Regular;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .fly-in {
      .fly-in-all {
        animation-duration: 0.5s;
        animation-delay: 0.6s;
        animation-timing-function: ease;
        animation-fill-mode: both;
      }

      .fly-in-left {
        animation-name: fly-in-left;
      }

      .fly-in-right {
        animation-name: fly-in-right;
      }
    }
  }

  .show-list {
    display: block;
  }

  @keyframes fly-in-left {
    0% {
      transform: translate(180%);
    }

    50% {
      transform: translate(-30%);
    }

    60% {
      transform: translate(-30%);
    }

    70% {
      transform: translate(-30%);
    }

    80% {
      transform: translate(5%);
    }

    100% {
      transform: translate(0);
    }
  }

  @keyframes fly-in-right {
    0% {
      transform: translate(-180%);
    }

    50% {
      transform: translate(30%);
    }

    60% {
      transform: translate(30%);
    }

    70% {
      transform: translate(30%);
    }

    80% {
      transform: translate(-5%);
    }

    100% {
      transform: translate(0);
    }
  }
}
</style>
