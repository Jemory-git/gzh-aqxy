<template>
  <div class="wrapper">
    <dataProcess v-bind="dataProcessOptions">
      <div class="kebiao-list">
        <ul class="ul">
          <li
            class="li bg"
            @click="tobaoxianxiangqing(item.id)"
            v-for="(item, index) in xueshengArr"
            :key="item"
          >
            <div class="list-number">
              <img class="avatar-img" src="../../img/nantou.png" alt v-if="errorArr[index]">
              <img
                class="avatar-img"
                :src="item.head_img_url"
                @error="ontouxiangerror(index)"
                v-else
              >
            </div>
            <span class="laoshi-name">{{item.student_name}}</span>
            <span
              class="kecheng-name"
              :class="colorArr[item.policy_status]"
            >{{status[item.policy_status]}}</span>
          </li>
        </ul>
      </div>
    </dataProcess>
  </div>
</template>

<script>
import dataProcess from "../../components/common/data-process/data-process.vue";
export default {
  components: {
    dataProcess
  },
  data() {
    return {
      dataProcessOptions: {
        loaded: false,
        haveData: true
      },
      xueshengArr: [],
      errorArr: [],
      colorArr: {
        0: "lanse",
        99: "hongse",
        2: "lvse"
      },
      status: {
        0: "待审核",
        2: "投保成功",
        99: "未投保"
      }
    };
  },
  methods: {
    tobaoxianxiangqing(id) {
      return;
    },
    getData() {
      let postData = {
        open_id: sessionStorage.getItem('open_id')
      };
      this.axios.post("/Schoolinsurance/children_list", postData).then(data => {
        console.log(data);
        this.$set(this.dataProcessOptions, "loaded", true);

        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg);
          return;
        }

        // 请求成功
        if (data.data.students.length === 0) {
          // 如果没有数据
          this.$set(this.dataProcessOptions, "haveData", false);
          return;
        }

        // 显示学生
        this.xueshengArr = data.data.students;
      });
    },
    ontouxiangerror(i) {
      this.$set(this.errorArr, i, true);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;

  .kebiao-list {
    min-height: 100vh;
    background-color: #F9F9F9;
    padding: 2rem;

    .ul {
      .li {
        position: relative;
        display: flex;
        align-items: center;
        height: 7rem;
        width: 100%;
        background-size: 100% 100%;
        margin-bottom: 2rem;
        box-shadow: 0 1rem 5px 0 rgba(200, 200, 200, 0.3);

        .list-number {
          height: 4rem;
          width: 4rem;
          line-height: 4rem;
          text-align: center;
          border-radius: 50%;
          margin: 0 1rem 0 2rem;
          background-image: url('../../img/nantou.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 1.2rem;
          font-family: DengXian-Bold;
          font-weight: bold;
          color: #fff;

          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .laoshi-name {
          margin-right: 1rem;
          font-size: 1.6rem;
          font-family: DengXian-Regular;
          font-weight: 400;
        }

        .kecheng-name {
          flex-grow: 1;
          padding-right: 1rem;
          text-align: right;
          font-size: 1.5rem;
          font-family: DengXian-Bold;
          font-weight: bold;
        }

        .lanse {
          color: #463EED;
        }

        .hongse {
          color: #FF6A76;
        }

        .lvse {
          color: #00CF8A;
        }
      }

      .bg {
        background-image: url('../../img/renshoubg.png');
      }
    }
  }
}
</style>
