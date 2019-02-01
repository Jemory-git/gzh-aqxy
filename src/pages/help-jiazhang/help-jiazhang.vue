
<template>
  <div class="wrapper">
    <ul class="ul">
      <li class="li">
        一、
        <a
          class="a"
          href="javascript:void(0)"
          @click="toHelpJiazhangPage('help-jiazhang-one')"
        >微信家长端系统总体介绍</a>
      </li>
      <li class="li">
        二、
        <a
          class="a"
          href="javascript:void(0)"
          @click="toHelpJiazhangPage('help-jiazhang-two')"
        >家长如何绑定微信及登陆</a>
      </li>
      <li class="li">
        三、
        <a
          class="a"
          href="javascript:void(0)"
          @click="toHelpJiazhangPage('help-jiazhang-three')"
        >消息推送界面</a>
      </li>
      <li class="li">
        <a class="a a0" href="javascript:void(0)">四、功能介绍</a>
        <ul class="ul-gongneng">
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(1)">
              1、主界面
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_1}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_1}">
              <li class="sub-li">
                1.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_1')"
                >首页</a>
              </li>
              <li class="sub-li">
                1.2、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_2')"
                >学生信息</a>
              </li>
              <li class="sub-li">
                1.3、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_3')"
                >最新动态</a>
              </li>
              <li class="sub-li">
                1.4、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_4')"
                >今日考勤</a>
              </li>
              <li class="sub-li">
                1.5、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_5')"
                >今日课程</a>
              </li>
              <li class="sub-li">
                1.6、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpJiazhangPage('help-jiazhang-1_6')"
                >教师信息</a>
              </li>
            </ul>
          </li>
          <li class="li-gongneng">
            2、
            <a
              class="a"
              href="javascript:void(0)"
              @click="toHelpJiazhangPage('help-jiazhang-2')"
            >课业</a>
          </li>
          <li class="li-gongneng">
            3、
            <a
              class="a"
              href="javascript:void(0)"
              @click="toHelpJiazhangPage('help-jiazhang-3')"
            >考勤</a>
          </li>
          <li class="li-gongneng">
            4、
            <a
              class="a"
              href="javascript:void(0)"
              @click="toHelpJiazhangPage('help-jiazhang-4')"
            >课程表</a>
          </li>
          <li class="li-gongneng">
            5、
            <a
              class="a"
              href="javascript:void(0)"
              @click="toHelpJiazhangPage('help-jiazhang-5')"
            >监控</a>
          </li>
          <li class="li-gongneng">
            6、
            <a
              class="a"
              href="javascript:void(0)"
              @click="toHelpJiazhangPage('help-jiazhang-6')"
            >班级动态</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideul_1: false
    };
  },
  methods: {
    toHelpJiazhangPage(m) {
      this.$router.push(m);
    },
    toggleUl(i) {
      this[`hideul_${i}`] = !this[`hideul_${i}`];
    },
    getUlHeight(fn) {
      $(".sub-ul").each((i, c) => {
        c.style.height = c.offsetHeight + "px";
      });
      fn();
    },
    closeUl() {
      this.hideul_1 = true;
    }
  },
  mounted() {
    this.$nextTick(this.getUlHeight(this.closeUl()));
  }
};
</script>

<style lang="stylus" scoped>

.wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;

  .ul {
    box-sizing: border-box;
    width: 100%;
    padding: 2rem;

    .li {
      padding: 1rem 0;
      font-size: 2rem;
      color: #333;

      .a {
        font-size: 2rem;
        text-decoration: underline;
        cursor: pointer;
        color: #333;
      }

      .a0 {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
      }

      .ul-gongneng {
        padding-left: 1rem;

        .li-gongneng {
          padding-top: 0.5rem;

          .hide-ul {
            height: 0 !important;
          }

          .a0 {
            padding: 0.5rem 0 0 0;
          }

          .sub-ul {
            box-sizing: border-box;
            width: 100%;
            padding-left: 2rem;
            overflow: hidden;
            transition: all 0.3s ease-out;

            .sub-li {
              padding: 0.5rem 0;
              font-size: 1.5rem;
              color: #333;

              .sub-a {
                font-size: 1.5rem;
                text-decoration: underline;
                cursor: pointer;
                color: #333;
              }
            }
          }

          .arrow-icon {
            .img {
              vertical-align: middle;
              width: 1em;
              height: 1em;
              transition: all 0.3s ease-out;
            }

            .rotate {
              transform: rotateZ(-90deg);
            }
          }
        }
      }
    }
  }
}
</style>
