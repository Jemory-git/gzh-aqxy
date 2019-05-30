<template>
    <div class="wrapper">
        <div class="logo">
            <img class="img" src="./aqxy.png" alt="">
        </div>
        <h3 class="h3">aqxy</h3>
        <p class="p">安亲家园（校园版）由智慧班牌、微信家长端、APP教师端构成，是学校日常工作、班级文化展示、学生考勤和教学信息展示等实现智慧校园的一个应用载体。通过硬软件应用以及服务支持，为学校解决考勤管理、数据采集、信息公开、家校互动等管理难题。为学校、老师、学生、家长的互通搭起一座桥梁，为家校营造全新的智慧生态环境。</p>
        <p class="bottom">厦门快乐家庭网络科技有限公司 版权所有</p>
        <p class="bottom">Copyright ©2015-2018</p>
        <p class="bottom">Xiamen Happy Family Network Technology Co., Ltd.</p>
        <p class="bottom">All Rights Reserved</p>
    </div>    
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 4rem 3rem 3rem;

    .logo {
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        margin: 0 auto;

        .img {
            width: 100%;
            height: 100%;
        }
    }

    .h3 {
        width: 100%;
        height: 1.8rem;
        margin-top: 2rem;
        margin-bottom 4rem
        text-align: center;
        font-size: 1.8rem;
        font-family: DengXian-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1.8rem;
    }

    .p {
        width: 100%;
        height: 18rem;
        margin-bottom 10rem
        text-indent: 2em;
        font-size: 1.5rem;
        letter-spacing 1px
        font-family: DengXian-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 2.25rem;
    }

    .bottom {
        width: 100%;
        margin-top 0.5rem
        text-align center
        font-size: 1rem;
        font-family: DengXian-Regular;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
    }
}
</style>
