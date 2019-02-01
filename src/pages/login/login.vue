<template>
  <div class="wrapper">
    <div class="img-div">
      <img class="img logo" src="./logo-.png" alt>
      <p class="aqxy">安亲校园</p>
    </div>
    <div class="form-div">
      <div class="input-div">
        <img class="icon" src="./phone1.png" alt>
        <span class="line"></span>
        <input
          class="input phone-input"
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          v-model="phone"
          @focus="onInputFocus(0)"
        >
      </div>
      <div class="input-div">
        <img class="icon" src="./suo1.png" alt>
        <span class="line"></span>
        <input
          class="input yzm-input"
          type="text"
          maxlength="6"
          placeholder="请输入校验码"
          v-model="yzm"
          @focus="onInputFocus(1)"
          ref="yzminput"
        >
        <span class="get-yzm-btn" @click="getYzm">{{yzmBtnText}}</span>
      </div>
      <div
        class="confirm-btn-div"
        :class="{'login-btn-canuse': loginBtnCanUse}"
        @click="toChildren"
      >登录</div>
    </div>
  </div>
</template>

<script>
import { checkUserInput } from "../../js/util.js";
export default {
  data() {
    return {
      phone: "",
      yzm: "",
      yzmBtnText: "获取校验码",
      time: 60,
      yzmBtnCanUse: true,
      loginBtnCanUse: false
    };
  },
  methods: {
    getYzm() {
      if (!this.yzmBtnCanUse) {
        return;
      }
      if (!checkUserInput.isPhoneNumber(this.phone)) {
        this.promptBox.prompt("请填写正确的手机号");
        return;
      }
      this.yzmBtnCanUse = false;
      this.yzm = "";
      let postData = {
        phone: this.phone
      };
      this.axios.post("/School/get_message", postData).then(data => {
        console.log(data);
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          this.yzmBtnCanUse = true;
          return;
        }
        // 请求成功
        this.promptBox.autoHide("已发送");
        // 输入框聚焦
        setTimeout(() => {
          $(this.$refs.yzminput)
            .trigger("click")
            .focus();
        }, 200);

        let interval = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(interval);
            this.time = 60;
            this.yzmBtnText = "获取校验码";
            this.yzmBtnCanUse = true;
            return;
          }
          this.yzmBtnText = "获取校验码" + this.time--;
        }, 1000);
      });
    },
    toChildren() {
      if (!this.loginBtnCanUse) {
        return;
      }
      if (!checkUserInput.isPhoneNumber(this.phone)) {
        this.promptBox.prompt("请填写正确的手机号");
        return;
      }
      if (!checkUserInput.lengthIs_6(this.yzm)) {
        this.promptBox.prompt("验证码错误");
        return;
      }
      let postData = {
        phone: this.phone,
        message_code: this.yzm,
        open_id: sessionStorage.getItem("open_id")
      };
      this.axios.post("/School/do_login", postData).then(data => {
        console.log(data);

        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }
        // 请求成功
        sessionStorage.setItem("tel", this.phone);
        // 记录退出状态
        sessionStorage.setItem("quitstatus", "false");

        this.$router.push("/children");
      });
    },
    // createShadowRoot(n) {
    //   let inputDivs = document.querySelectorAll(".input-div");
    //   let shadow = inputDivs[n].createShadowRoot();
    //   let lineDiv = document.createElement("div");
    //                 let style = document.createElement('style');

    //                 style.textContent = `
    //                   .line{
    //                     width: 100%;
    //                     height: 1px;
    //                     background-color: #000;
    //                   }
    //                 `;
    //   lineDiv.setAttribute("class", "line");
    //                 shadow.appendChild(style);
    //   shadow.appendChild(lineDiv);
    // },
    onInputFocus(n) {
      // this.createShadowRoot(n);
    }
  },
  watch: {
    phone(v) {
      if (v !== "" && this.yzm !== "") {
        this.loginBtnCanUse = true;
      } else {
        this.loginBtnCanUse = false;
      }
      if (v.length > 11) {
        this.phone = v.substring(0, 11);
      }
    },
    yzm(v) {
      if (v !== "" && this.phone !== "") {
        this.loginBtnCanUse = true;
      } else {
        this.loginBtnCanUse = false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 3rem;
  background-color: #fff;
  background-image: url('./bg.png');
  background-repeat: no-repeat;
  background-size: 85%;
  background-position: 50% 102%;

  .img-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .logo {
      width: 12rem;
    }

    .aqxy {
      width: 100%;
      text-align: center;
      font-size: 1.9rem;
      letter-spacing: 2px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #FFB347;
    }
  }

  .form-div {
    box-sizing: border-box;
    padding-top: 4rem;
    height: 31rem;
    width: 90%;
    margin: 0 auto;

    .input-div {
      display: flex;
      align-items: center;
      width: 24rem;
      height: 3rem;
      margin: 0rem auto;
      border-bottom: solid 1px #DDD;

      .icon {
        height: 2rem;
      }

      .line {
        width: 1px;
        margin: 0 1rem;
        height: 1.5rem;
        background-color: #ccc;
      }

      .input {
        height: 100%;
        letter-spacing: 1px;
        font-size: 1.5rem;

        &::-webkit-input-placeholder {
          font-size: 1.4rem;
          letter-spacing: 2px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #ccc;
        }
      }

      .phone-input {
        width: 90%;
      }

      .yzm-input {
        width: 50%;
      }

      .get-yzm-btn {
        width: 35%;
        height: 100%;
        text-align: center;
        line-height: 3rem;
        letter-spacing: 1px;
        font-size: 1.4rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #ccc;
      }
    }

    .input-div + .input-div {
      margin: 3rem auto;
    }

    .confirm-btn-div {
      width: 25rem;
      height: 4rem;
      line-height: 4rem;
      margin: 4rem auto 0;
      text-align: center;
      font-size: 1.4em;
      font-weight: 600;
      color: #fff;
      letter-spacing: 2px;
      background: linear-gradient(90deg, rgba(255, 204, 51, 1) 0%, rgba(255, 179, 71, 1) 100%);
      box-shadow: 0rem 0rem 1rem 0rem rgba(255, 234, 181, 1);
      opacity: 0.5;
      border-radius: 2rem;
    }

    .login-btn-canuse {
      opacity: 1;
    }

    // 移除箭头
    input[type=number] {
      -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
