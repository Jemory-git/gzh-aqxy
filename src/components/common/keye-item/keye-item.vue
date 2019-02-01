<template>
  <div class="child-keye" @click="toConfirmKeye($event)">
    <div class="child-name">
      <span class="keye-title" :class="{'huise': readedBoo}">{{keyeObj.title}}</span>
      <span class="red-dot" v-if="!replyBoo"></span>
    </div>
    <div class="content-baba">
      <img
        class="img"
        :src="keyeObj.attachments[0].url"
        v-if="keyeObj.attachments && keyeObj.attachments[0] && keyeObj.attachments[0].url && !imgErr"
        @error="imgErr = true"
      >
      <p class="keye-content" :class="{'huise': readedBoo}">{{keyeObj.content}}</p>
    </div>
    <div class="keye-info">
      <span class="techer-name" :class="{'huise': readedBoo}">发布人：{{keyeObj.teacher_name}}</span>
      <span class="time" :class="{'huise': readedBoo}">{{keyeObj.datetime}}</span>
    </div>
  </div>
</template>

<script>
import { formatTime } from "../../../js/util.js";
export default {
  props: {
    keyeObj: Object
  },
  data() {
    return {
      keyeName: sessionStorage.getItem("childName") + "的作业",
      date: "",
      imgErr: false,
      readedBoo: false,
      replyBoo: false
    };
  },
  methods: {
    toConfirmKeye() {
      sessionStorage.setItem("currentKeye", JSON.stringify(this.keyeObj));
      this.$router.push("/confirm-keye");
    },
    isReaded() {
      // 由于页面缓存，当从课业返回时，需要在存储中确定已读
      this.readedBoo =
        this.keyeObj.is_reader === 1 ||
        sessionStorage.getItem("readed_keye_id") == this.keyeObj.id;
    },
    isReply() {
      this.replyBoo =
        this.keyeObj.is_reply === 0 ||
        sessionStorage.getItem("readed_keye_id") == this.keyeObj.id;
    }
  },
  mounted() {
    console.log("keyeObj", this.keyeObj);
    // this.date = formatTime(new Date(parseInt(this.keyeObj.datetime + "000")));
    this.$nextTick(() => {
      this.isReaded();
      this.isReply();
    });
  },
  activated() {
    // 如果返回到该页面，也需要判断是否读过了
    this.$nextTick(() => {
      this.isReaded();
      this.isReply();
    });
  }
};
</script>

<style lang="stylus" scoped>
.child-keye {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1rem;
  padding: 2rem 2rem 1rem;
  background-color: #fff;

  .huise {
    color: #999 !important;
  }

  .child-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 1rem;

    .keye-title {
      width: 95%;
      font-size: 1.4rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      letter-spacing: 1px;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .red-dot {
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: #FF0000;
    }
  }

  .content-baba {
    display: flex;
    margin: 0 0 2rem;

    .img {
      min-width: 8rem;
      max-width: 8rem;
      height: 8rem;
      margin-right: 1rem;
    }

    .keye-content {
      box-sizing: border-box;
      max-height: 8rem;
      line-height: 2rem;
      flex-grow: 1;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      // text-indent: 2em;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      letter-spacing: 1px;
      font-size: 1.3rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }

  .keye-info {
    display: flex;
    justify-content: space-between;
  }

  .techer-name, .time {
    padding: 0.2rem 0;
    font-size: 1.2rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .teacher_name {
    color: rgba(51, 51, 51, 1);
  }

  .time {
    color: #666;
  }
}
</style>
