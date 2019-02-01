<template>
    <div class="wrapper">
        <div class="background-div">
            <div class="first-div">
                <div class="name-head-id">
                    <div class="avatar-div">
                        <img class="avatar-img" src="../../img/hlw.png" alt="" v-if="error">
                        <img class="avatar-img" :src="child.head_img_url" alt="" @error="error = true" v-if="!error">
                    </div>
                    <span class="name">{{child.name}}</span>
                    <span class="id">学号：{{child.student_code}}</span>
                </div>
                <!-- <span class="qiandao-btn">签到</span> -->
            </div>
            <div class="xingbie-shengri item-div">
                <item class="xingbie" :item="{key:'性别', value: xingbie[child.gender]}"></item>
                <item class="shengri" :item="{key:'生日', value: child.birthday}"></item>
            </div>
            <div class="jk-lx-bj item-div">
                <item class="jiankang" :item="{key:'健康', value: jiankang[child.health_status - 1]}"></item>
                <item class="jieduan" :item="{key:'阶段', value: xuexiaojieduan[child.student_type - 1]}"></item>
                <item class="banji" :item="{key:'班级', value: banji}"></item>
            </div>
            <div class="kaohao item-div">
                <item :item="{key:'卡号', value: child.card_no}"></item>
                <item :item="{key:'类别', value: xueshengleibie[child.student_category]}"></item>
            </div>
            <div class="shenfenzheng item-div">
                <item :item="{key:'身份证', value: child.id_no}"></item>
            </div>
            <div class="dizhi item-div">
                <item :item="{key:'地址', value: child.address}"></item>
            </div>
            <div class="dizhi item-div">
                <item class="" :item="{key:'紧急电话', value: child.parent_phone_no}"></item>
                <item :item="{key:'紧急电话', value: child.parent_phone_no2}"></item>
            </div>
        </div>
    </div>
</template>

<script>
import item from "../../components/child/child-info-item.vue";
// 1良好 2一般 3不好
// 1小学 2中学 3高中
// 0男 1女
export default {
  data() {
    return {
      child: {},
      error: false,
      jiankang: ["良好", "一般", "不好"],
      xuexiaojieduan: ["小学", "初中", "高中"],
      xueshengleibie: ['', "住宿", "借读", "普通"],
      xingbie: ["男", "女"],
      banji: ""
    };
  },
  components: {
    item
  },
  methods: {
    jointBanji() {
      this.banji = this.child.class.alias + "-" + this.child.class.name;
    }
  },
  mounted() {
    let child = JSON.parse(sessionStorage.getItem("child"));
    console.log("child", child);
    if (child) {
      this.child = child;
      this.jointBanji();
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    padding: 2rem 1rem;
    background-color: #fff;

    .background-div {
        box-sizing: border-box;
        width: 100%;
        min-height: 100%;
        padding-bottom: 1rem;
        border-radius: 10px;
        box-shadow: 0 0 20px 10px #FBF7F3;

        .first-div {
            box-sizing: border-box;
            position: relative;
            width: 100%;
            height: 15rem;
            border-bottom: dashed 1px #634335;

            .name-head-id {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;

                .avatar-div {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    // border: solid 1px #ccc;
                    background-color: #eee;

                    .avatar-img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .name {
                    margin: 0.5rem 0;
                }

                .name {
                    font-size: 1.5rem;
                    font-weight: bolder;
                    color: #634335;
                }

                .id {
                    font-size: 1.4rem;
                    color: #634335;
                    font-weight: bold;
                }
            }

            .qiandao-btn {
                position: absolute;
                right: 0.5rem;
                top: 0.5rem;
                padding: 0.2rem 0.6rem;
                font-size: 0.5rem;
                border-radius: 20px;
                background-color: #FFCC34;
            }
        }

        .item-div {
            display: flex;
            padding: 3rem 1rem 0;

            .margin-right {
                margin-right: 1rem;
            }

            .xingbie, .jiankang {
                width: 9rem;
            }

            .shengri {
                width: 13rem;
                white-space: nowrap;
            }

            .jieduan {
                width: 8rem;
            }

            .banji {
                width: 10rem;
            }
        }
    }
}
</style>
