<template>
  <div class="wrapper">
    <div class="img-div">
      <img class="img yun" src="./yun.png" alt>
      <img class="img logo" src="./logo.png" alt>
    </div>
    <div class="form-div">
      <div class="input-div">
        <img class="icon" src="./phone.png" alt>
        <input
          class="input phone-input"
          type="number"
          maxlength="11"
          placeholder="手机号"
          v-model="phone"
        >
      </div>
      <div class="input-div">
        <img class="icon" src="./key.png" alt>
        <input
          class="input yzm-input"
          type="text"
          maxlength="6"
          placeholder="校验码"
          v-model="yzm"
          ref="yzminput"
        >
        <span class="get-yzm-btn" @click="getYzm">{{yzmBtnText}}</span>
      </div>
      <div class="confirm-btn-div" @click="toChildren">登录</div>
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
      yzmBtnCanUse: true
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
        }, 2000);

        let interval = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(interval);
            this.time = 60;
            this.yzmBtnText = "获取校验码";
            this.yzmBtnCanUse = true;
            return;
          }
          this.yzmBtnText = this.time-- + "s后重发";
        }, 1000);
      });
    },
    toChildren() {
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
    }
  },
  watch: {
    phone(v) {
      if (v.length > 11) {
        this.phone = v.substring(0, 11);
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
  padding-top: 4rem;
  background-color: #FFCC34;

  .img-div {
    position: relative;
    width: 27rem;
    height: 12rem;
    margin: 0 auto;
    z-index: 1;

    .img {
      position: absolute;
    }

    .yun {
      width: 100%;
      left: 0;
      top: 0;
    }

    .logo {
      width: 30%;
      left: 50%;
      top: 0;
      transform: translate3d(-50%, 40%, 0);
    }
  }

  .form-div {
    box-sizing: border-box;
    padding-top: 10rem;
    height: 31rem;
    width: 90%;
    margin: 0 auto;
    background-color: #fff;

    .input-div {
      display: flex;
      align-items: center;
      width: 90%;
      height: 3rem;
      margin: 0rem auto;
      padding-left: 1rem;
      border-bottom: solid 1px #DDD;

      .icon {
        height: 1.3rem;
      }

      .input {
        height: 100%;
        padding-left: 0.5rem;
        letter-spacing: 1px;
        font-size: 1.5rem;
      }

      .phone-input {
        width: 90%;
      }

      .yzm-input {
        width: 60%;
      }

      .get-yzm-btn {
        width: 35%;
        height: 100%;
        text-align: center;
        line-height: 2rem;
        font-size: 1.3rem;
        letter-spacing: 1px;
        color: #FFCC34;
      }
    }

    .input-div + .input-div {
      margin: 3rem auto;
    }

    .confirm-btn-div {
      width: 90%;
      height: 4rem;
      line-height: 4rem;
      margin: 4rem auto 0;
      background-color: #FFCC34;
      text-align: center;
      font-size: 1.3em;
      color: #fff;
      letter-spacing: 2px;
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
