<template>
    <div class="wrapper">
        <video v-if="urlGeted" class="video" :src="cUrl" @error="onVideoErr" controls playsInline autoplay></video>
    </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      shexiangtouDataset: {},
      cUrl: "123",
      urlGeted: false,
      videoPageClosed: false
    };
  },
  methods: {
    getUrl() {
      let postData = Object.assign(
        {
          open_id: sessionStorage.getItem("open_id")
        },
        this.shexiangtouDataset
      );
      this.axios.post("/School/get_video_url", postData).then(data => {
        if (data.errcode != 0) {
          // 请求失败
          this.promptBox.prompt(data.errmsg, () => {
            this.$router.go(-1);
          });
          return;
        }
        // 请求成功
        this.urlGeted = true;
        this.cUrl = data.data.video_url;
      });
    },
    onVideoErr() {
      if (this.cUrl === "") {
        this.promptBox.prompt("监控地址获取失败");
        return;
      }
      if(this.videoPageClosed === false){
        this.promptBox.prompt("监控视频加载失败");
      }
    }
  },
  mounted() {
    this.params = this.$route.params;

    this.shexiangtouDataset = sessionStorage.getItem("shexiangtouDataset")
      ? JSON.parse(sessionStorage.getItem("shexiangtouDataset"))
      : {};
    this.getUrl();
  },
  destroyed(){
    this.videoPageClosed = true;
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;

  .tips {
    box-sizing: border-box;
    height: 100vh;
    padding: 5rem 0;
    text-align: center;
    font-size: 1rem;
    background-color: #FBF7F3;
    color: #666;
  }

  .video {
    height: 100%;
    width: 100%;
    background-color: #000;
  }
}
</style>
