<template>
  <div class="wrapper">
    <div class="scroll">
      <div class="lipeicailiao">
        <div class="cailiao">
          <h3>理赔基础材料</h3>
          <p>1、索赔申请书（含详细事故经过）</p>
          <p>2、索赔清单（损失清单），含事故照片</p>
          <p>3、收款方银行卡账号及开户行信息</p>
        </div>
        <div class="cailiao">
          <h3>人伤索赔材料</h3>
          <p>1、伤者身份证正反面复印件</p>
          <p>2、病历（门、急诊病历，入、出院病历）</p>
          <p>3、医疗费用票据</p>
          <p>4、涉及死亡案件，需提供死亡证明</p>
        </div>
      </div>
      <div class="xuexiaodeyiwu">
        <h3>学校的义务和权益维护</h3>
        <p>1、学校应保证教学设施设备符合安全标准，竭力消除安全隐患。善学校管理制度，加强对学生的安全教育</p>
        <p>2、学生发生伤害事故后应立即采取救治措施并通知学生家长，对判断属于校（园）方责任保险责任的事故应及时按照理赔流程向保险公司报案</p>
        <p>3、必要时应及时就事故现场拍照取证，向周围的学生老师调查 问询，做好笔录。如发生死亡事故拨打110</p>
      </div>
      <div class="wenxintishi">
        <h3>温馨提示</h3>
        <div class="item">
          <p>一、报案要及时，积极与保险公司理赔人员沟通</p>
          <p>1、学校应尽早报案、查勘现场、采集相关保险单证。</p>
          <p>2、学校应在保险公司同意的情况下，与学生家长达成调解协议，避免校方的赔偿金额得不到赔偿。</p>
        </div>
        <div class="item">
          <p>二、发生诉讼，学校要及时告知保险公司，法院调解协议需征得保险公司的同意方可达成调解方案。</p>
        </div>
        <div class="item">
          <p>三、医药费不可得到双重赔付的问题。相关法律规定，保险不能使被保险人取得应获赔付之外的利益，因此医疗费不能既在意外伤害保险又在校（园）方责任险获得赔付。</p>
        </div>
      </div>
    </div>
    <div class="fixed-div">
      <div class="btn">
        <a href="tel:95519">一键理赔</a>
      </div>
      <div class="tips">点击按钮拨入客服电话，为您办理理赔业务</div>
    </div>
    <img class="renshoulogo" src="../../img/renshoulogo.png">
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .scroll {
    box-sizing: border-box;
    min-height: 100%;
    padding: 1rem 1rem 7rem;
    background-color: #f9f9f9;
    color: #333;
    font-size: 1.5rem;
    line-height: 2rem;

    h3 {
      font-weight: bold;
      font-size: 1.5rem;
    }

    p {
      padding: 0 0.5rem;
      font-size: 1.2rem;
    }
  }

  .renshoulogo {
    position: fixed;
    bottom: 50%;
    left: 50%;
    height: 5rem;
    transform: translate3d(-50%, -50%, 0);
  }

  .fixed-div {
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 0px;
    padding: 1.5rem 2rem 0;
    height: 7rem;
    width: 100vw;
    background-color: #fff;
    letter-spacing: 1px;

    .btn {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      border: 1px solid #00CF8A;
      border-radius: 0.5rem;
      font-size: 1.5rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #00CF8A;
    }

    .tips {
      padding-top: 0.3rem;
      font-size: 1.1rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
