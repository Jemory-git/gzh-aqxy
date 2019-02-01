<template>
  <div class="wrapper">
    <dataProcess v-bind="dataProcessOptions">
      <div class="xuexiao" @click="toggle()">
        <div class="xuexiao-list" @click="selectXuexiao($event)" :style="'height:' + listHeight">
          <span
            class="name"
            v-for="item in schoolArr"
            :key="item"
            :data-id="item.school_id"
          >{{item.school_name}}</span>
        </div>
        <span class="icon" :class="{'rotate': show}" v-if="schoolArr.length > 2"></span>
      </div>
      <bScroll
        class="bscroll"
        :style="'padding-top:' + toppadding"
        v-bind="bScrollOptions"
        :data="showingArr"
        @scrollToEnd="shanglajiazai"
      >
        <ul class="xueshengliebiao">
          <li class="meiyoutoubaoxuesheng xingming" v-show="meiyoutoubaoxuesheng">该校暂时没有投保的学生</li>
          <li class="xingming" v-for="item in showingArr" :key="item">{{item.student_name}}</li>
        </ul>
      </bScroll>
    </dataProcess>
    <img class="renshoulogo" src="../../img/renshoulogo.png">
  </div>
</template>

<script>
import dataProcess from "../../components/common/data-process/data-process.vue";
import bScroll from "../../components/common/b-scroll/b-scroll.vue";
export default {
  components: {
    bScroll,
    dataProcess
  },
  data() {
    return {
      show: false,
      meiyoutoubaoxuesheng: false,
      disableShanglajiazai: false,
      schoolArr: [],
      showingArr: [],
      listHeight: "4rem",
      toppadding: "0rem",
      showingSchoolId: "",
      bScrollOptions: {
        pullup: true,
        click: true
      },
      dataProcessOptions: {
        loaded: false,
        haveData: true
      }
    };
  },
  methods: {
    getData() {
      let postData = {
        open_id: sessionStorage.getItem("open_id")
      };
      this.axios
        .post("/Schoolinsurance/linsurance_list", postData)
        .then(data => {
          console.log(data);

          this.$set(this.dataProcessOptions, "loaded", true);

          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }
          // 请求成功
          if (data.data.schools.length === 0) {
            // 如果没有学校数据
            this.$set(this.dataProcessOptions, "haveData", false);
            return;
          }

          // 默认选择第一个学校，增加一项当做当前选中的显示
          data.data.schools.unshift({
            school_id: null,
            school_name: data.data.schools[0].school_name
          });

          // 记录当前显示中的学校ID
          this.showingSchoolId = data.data.schools[1].school_id;

          // 显示学校
          this.schoolArr = data.data.schools;

          if (data.data.student_list.length === 0) {
            // 学校没有投保的学生
            this.meiyoutoubaoxuesheng = true;
            return;
          }

          // 显示学生
          this.showingArr = data.data.student_list;
        });
    },
    toggle() {
      if (this.schoolArr.length < 3) {
        // 学校多于1个才需要切换
        return;
      }
      this.show = !this.show;
      if (this.show) {
        this.listHeight = this.schoolArr.length * 4 + "rem";
        this.toppadding = (this.schoolArr.length - 1) * 4 + "rem";
      } else {
        this.listHeight = "4rem";
        this.toppadding = "0rem";
      }
    },
    selectXuexiao(e) {
      let el = e.target;
      let id = el.dataset.id;

      if (!this.show) {
        // 列表关闭时点击
        return;
      }
      if (id == null || id == this.showingSchoolId) {
        return;
      }

      this.meiyoutoubaoxuesheng = false;
      this.showingSchoolId = id;
      this.schoolArr[0] = {
        school_id: null,
        school_name: el.innerText
      };
      this.showingArr = [];

      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        school_id: id
      };
      this.axios
        .post("/Schoolinsurance/linsurance_list", postData)
        .then(data => {
          console.log(data);
          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }

          // 请求成功
          if (data.data.student_list.length === 0) {
            // 学校没有投保的学生
            this.meiyoutoubaoxuesheng = true;
            return;
          }

          // 显示学生
          this.showingArr = data.data.student_list;

          // 重新打开上拉加载
          this.disableShanglajiazai = false;
        });
    },
    getMoreXuesheng(len) {
      let postData = {
        open_id: sessionStorage.getItem("open_id"),
        school_id: this.showingSchoolId,
        offset: len
      };
      this.axios
        .post("/Schoolinsurance/linsurance_list", postData)
        .then(data => {
          console.log(data);
          if (data.errcode != 0) {
            // 请求失败
            this.promptBox.prompt(data.errmsg);
            return;
          }

          // 请求成功
          if (data.data.student_list.length < 6) {
            // 返回数据不足6条，就禁用上啦加载
            this.disableShanglajiazai = true;
          }

          // 拼接数据 显示学生
          if (data.data.student_list) {
            this.showingArr = this.showingArr.concat(data.data.student_list);
          }
        });
    },
    shanglajiazai() {
      // 上拉加载
      if (this.disableShanglajiazai) {
        return;
      }
      this.getMoreXuesheng(this.showingArr.length);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;

  .xuexiao {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    z-index: 1;

    .xuexiao-list {
      align-self: flex-start;
      width: 100%;
      padding: 0 2rem;
      border-bottom: 1px solid #BBB;
      background-color: #fff;
      overflow: hidden;
      z-index: 1;
      transition: all 0.3s;

      .name {
        box-sizing: border-box;
        display: block;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.6rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 0.5);
      }

      .name:first-child {
        color: rgba(51, 51, 51, 1);
      }

      .name + .name {
        border-top: 1px solid #BBB;
      }
    }

    .icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate3d(-50%, -50%, 0);
      width: 2.5rem;
      height: 2rem;
      background-image: url('../../img/arrow-xia.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: all 0.3s;
      z-index: 2;
    }

    .rotate {
      transform: translate3d(-50%, -50%, 0) rotateZ(-90deg);
      transform-origin: center center;
    }
  }

  .bscroll {
    height: calc(100vh - 4rem);
    transition: all 0.3s;

    .xueshengliebiao {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 2rem 1rem;
      z-index: 0;

      .xingming {
        width: 20%;
        padding-bottom: 1rem;
        text-align: center;
        font-size: 1.4rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      .meiyoutoubaoxuesheng {
        width: 100%;
        letter-spacing: 1px;
      }
    }
  }

  .renshoulogo {
    position: fixed;
    bottom: 50%;
    left: 50%;
    height: 5rem;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
