<template>
    <div class="child-keye" @click="toGonggaoDetail($event)">
        <div class="child-name">
            <span class="name">
                {{gonggaoObj.title}}
            </span>
            <img class="arrow" src="../../../img/arrow.png" alt="">
        </div>
        <!-- <p class="keye-title">
            {{gonggaoObj.title}}
        </p> -->
        <p class="keye-content">
            {{gonggaoObj.content}}
        </p>
        <div class="keye-info">
            <span class="techer-name">{{gonggaoObj.teacher_name}}</span>
            <span class="time">{{gonggaoObj.datetime}}</span>
        </div>
    </div>    
</template>

<script>
import { formatTime } from "../../../js/util.js";
export default {
  props: {
    gonggaoObj: Object
  },
  data() {
    return {
      keyeName: sessionStorage.getItem("childName") + "的班级公告",
      date: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      console.log("gonggaoObj", this.gonggaoObj);
      this.date = formatTime(
        new Date(parseInt(this.gonggaoObj.date_time + "000"))
      );
      this.$set(
        this.gonggaoObj,
        "datetime",
        this.date.dateStr + " " + this.date.timeStr
      );
    });
  },
  methods: {
    toGonggaoDetail() {
      sessionStorage.setItem("currentGonggao", JSON.stringify(this.gonggaoObj));
      this.$router.push("/gonggao_detail");
    }
  }
};
</script>

<style lang="stylus" scoped>
.child-keye {
    box-sizing: border-box;
    width: 100%;
    margin: 0 0 1rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 20px 10px #FBF7F3;

    .child-name {
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem 1rem;

        .name {
            font-size: 1.5rem;
            color: #646464;
        }

        .arrow {
            height: 1.3rem;
            width: 0.7rem;
        }
    }

    .keye-title {
        padding-left: 0.5rem;
        font-size: 1.5rem;
        font-weight: 500;
        color: #646464;
    }

    .keye-content {
        box-sizing: border-box;
        height: 6.5rem;
        line-height: 1.88rem;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        padding: 1rem 0.5rem;
        margin: 0.3rem 0 1rem;
        font-size: 1.3rem;
        font-weight: 400;
        letter-spacing: 1px;
        color: #999;
        background-color: #f9f9f9;
    }

    .keye-info {
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
    }

    .techer-name, .time {
        padding: 0.2rem 0;
        font-size: 1.2rem;
        color: #adadad;
    }
}
</style>
