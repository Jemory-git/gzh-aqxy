<template>
    <div class="wrapper">
        <div class="four-div">
            <p class="first-p">文件下载</p>
            <ul class="ul">
                <li class="li">
                    <img class="img" src="../../img/file.png" alt="">
                    <div class="file">
                        <p class="name">{{name}}</p>
                    </div>
                    <div class="caozuo">
                        <!-- <a href="javascript:void(0)" @click="download">下载</a> -->
                        <a class="xiazai" :href="url">下载</a>
                        <!-- <a class="xiazai" href="https://codeload.github.com/douban/douban-client/legacy.zip/master">下载</a> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="cover-img" v-if="isweixin">
            <img class="img" src="../../img/000.png" alt="">
        </div>
    </div>    
</template>

<script>
import { getQs } from "../../js/util.js";
export default {
  data() {
    return {
      url: "",
      name: "",
      isweixin: false
    };
  },
  mounted() {
    let qs = getQs();
    this.url = qs.url;
    this.name = qs.name;
    this.$nextTick(() => {
      this.isweixin = this.isWeiXin();
    });
    console.log(qs);
  },
  methods: {
    // download() {
    //   var $eleForm = $("<form method='get'></form>");
    //   $eleForm.attr(
    //     "action",
    //     "https://codeload.github.com/douban/douban-client/legacy.zip/master"
    //   );
    //   $(document.body).append($eleForm);
    //   //提交表单，实现下载
    //   $eleForm.submit();
    // }
    isWeiXin() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.cover-img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;

    .img {
        width: 100%;
    }
}

.four-div {
    padding: 2rem;

    .first-p {
        padding: 2rem 0;
        text-align: center;
        font-size: 1.5rem;
        font-family: DengXian-Regular;
        font-weight: 400;
        color: #999;
    }

    .ul {
        .li {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            background-color: #F6F5F8;

            .img {
                width: 3rem;
                height: 4rem;
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
                    font-family: DengXian-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }

                .xiazai {
                    background-color: #80AFDE;
                }

                .dakai {
                    background-color: #F9C74F;
                }
            }
        }
    }
}
</style>
