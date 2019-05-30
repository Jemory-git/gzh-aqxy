<template>
  <div class="wrapper">
    <ul class="ul">
      <li class="li">
        一、
        <a
          class="a"
          href="javascript:void(0)"
          @click="toHelpLaoshiPage('help-laoshi-1')"
        >aqxyAPP总体介绍</a>
      </li>
      <li class="li">
        二、
        <a
          class="a"
          href="javascript:void(0)"
          @click="toHelpLaoshiPage('help-laoshi-2')"
        >APP下载安装说明</a>
      </li>
      <li class="li">
        三、
        <a class="a" href="javascript:void(0)" @click="toHelpLaoshiPage('help-laoshi-3')">教师登录</a>
      </li>
      <li class="li">
        <a class="a a0" href="javascript:void(0)">四、功能介绍</a>
        <ul class="ul-gongneng">
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(0)">
              1、我的
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_0}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_0}">
              <li class="sub-li">
                1.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_1')"
                >“我的”界面</a>
              </li>
              <li class="sub-li">
                1.2、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_2')"
                >消息中心</a>
              </li>
              <li class="sub-li">
                1.3、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_3')"
                >个人信息修改</a>
              </li>
              <li class="sub-li">
                1.4、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_4')"
                >添加/修改密码</a>
              </li>
              <li class="sub-li">
                1.5、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_5')"
                >关于我们</a>
              </li>
              <li class="sub-li">
                1.6、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_6')"
                >帮助中心</a>
              </li>
              <li class="sub-li">
                1.7、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_7')"
                >问题反馈</a>
              </li>
              <li class="sub-li">
                1.8、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-1_8')"
                >退出</a>
              </li>
            </ul>
          </li>
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(1)">
              2、课业
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_1}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_1}">
              <li class="sub-li">
                2.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-2_1')"
                >发布课业</a>
              </li>
              <li class="sub-li">
                2.2、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-2_2')"
                >课业记录查询</a>
              </li>
            </ul>
          </li>
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(2)">
              3、考勤
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_2}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_2}">
              <li class="sub-li">
                3.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-3_1')"
                >学生补签</a>
              </li>
              <li class="sub-li">
                3.2、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-3_2')"
                >签到查询</a>
              </li>
            </ul>
          </li>
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(3)">
              4、学生管理
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_3}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_3}">
              <li class="sub-li">
                4.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-4_1')"
                >学生信息查询</a>
              </li>
              <li class="sub-li">
                4.2、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-4_2')"
                >添加家长信息</a>
              </li>
              <li class="sub-li">
                4.3、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-4_3')"
                >解绑家长信息</a>
              </li>
            </ul>
          </li>
          <li class="li-gongneng">
            <a
              class="a a0"
              href="javascript:void(0)"
              @click="toHelpLaoshiPage('help-laoshi-5_0')"
            >5、监控</a>
          </li>
          <li class="li-gongneng">
            <a class="a a0" href="javascript:void(0)" @click="toggleUl(4)">
              6、班务
              <span class="arrow-icon">
                <img class="img" :class="{'rotate': hideul_4}" src="../../img/arrow-xia-32.png" alt>
              </span>
            </a>
            <ul class="sub-ul" :class="{'hide-ul': hideul_4}">
              <li class="sub-li">
                6.1、
                <a
                  class="sub-a"
                  href="javascript:void(0)"
                  @click="toHelpLaoshiPage('help-laoshi-6_1')"
                >课表</a>
              </li>
              <li class="sub-li-gongneng">
                <a class="a a0" href="javascript:void(0)" @click="toggleUl(5)">
                  6.2、公告
                  <span class="arrow-icon">
                    <img
                      class="img"
                      :class="{'rotate': hideul_5}"
                      src="../../img/arrow-xia-32.png"
                      alt
                    >
                  </span>
                </a>
                <ul class="sub-sub-ul" :class="{'hide-ul': hideul_5}">
                  <li class="sub-sub-li">
                    6.2.1、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_2_1')"
                    >发布公告</a>
                  </li>
                  <li class="sub-sub-li">
                    6.2.2、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_2_2')"
                    >查看发布记录</a>
                  </li>
                </ul>
              </li>
              <li class="sub-li-gongneng">
                <a class="a a0" href="javascript:void(0)" @click="toggleUl(6)">
                  6.3、值日
                  <span class="arrow-icon">
                    <img
                      class="img"
                      :class="{'rotate': hideul_6}"
                      src="../../img/arrow-xia-32.png"
                      alt
                    >
                  </span>
                </a>
                <ul class="sub-sub-ul" :class="{'hide-ul': hideul_6}">
                  <li class="sub-sub-li">
                    6.3.1、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_3_1')"
                    >添加值日生</a>
                  </li>
                  <li class="sub-sub-li">
                    6.3.2、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_3_2')"
                    >删除/修改值日生</a>
                  </li>
                </ul>
              </li>
              <li class="sub-li-gongneng">
                <a class="a a0" href="javascript:void(0)" @click="toggleUl(7)">
                  6.4、动态
                  <span class="arrow-icon">
                    <img
                      class="img"
                      :class="{'rotate': hideul_7}"
                      src="../../img/arrow-xia-32.png"
                      alt
                    >
                  </span>
                </a>
                <ul class="sub-sub-ul" :class="{'hide-ul': hideul_7}">
                  <li class="sub-sub-li">
                    6.4.1、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_4_1')"
                    >发布动态</a>
                  </li>
                  <li class="sub-sub-li">
                    6.4.2、
                    <a
                      class="sub-a"
                      href="javascript:void(0)"
                      @click="toHelpLaoshiPage('help-laoshi-6_4_2')"
                    >查看发布记录</a>
                  </li>
                </ul>
              </li>
            </ul>
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
      hideul_0: false,
      hideul_1: false,
      hideul_2: false,
      hideul_3: false,
      hideul_4: false,
      hideul_5: false,
      hideul_6: false,
      hideul_7: false
    };
  },
  methods: {
    toHelpLaoshiPage(m) {
      this.$router.push(m);
    },
    getUlHeight(fn) {
      $(".sub-ul").each((i, c) => {
        c.style.height = c.offsetHeight + "px";
      });
      $(".sub-sub-ul").each((i, c) => {
        c.style.height = c.offsetHeight + "px";
      });
      fn();
    },
    toggleUl(i) {
      this[`hideul_${i}`] = !this[`hideul_${i}`];
    },
    closeUl() {
      this.hideul_0 = true;
      this.hideul_1 = true;
      this.hideul_2 = true;
      this.hideul_3 = true;
      this.hideul_4 = true;
      this.hideul_5 = true;
      this.hideul_6 = true;
      this.hideul_7 = true;
    }
  },
  mounted() {
    this.$nextTick(this.getUlHeight(this.closeUl));
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

          .sub-li-gongneng {
            padding-top: 0.5rem;

            .a0 {
              font-size: 1.5rem;
            }

            .sub-sub-ul {
              box-sizing: border-box;
              width: 100%;
              padding-left: 2rem;
              overflow: hidden;
              transition: all 0.3s ease-out;

              .sub-sub-li {
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
          }
        }
      }
    }
  }

  .hide-ul {
    height: 0 !important;
  }
}
</style>
