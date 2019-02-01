import Vue from 'vue'
import Router from 'vue-router'

// import {mapGetters} from 'vuex';
// import store from '@/store';

const login = (resolve) => {
  import('./pages/login/login.vue').then((module) => {
    resolve(module);
  })
}
const children = (resolve) => {
  import('./pages/children/children.vue').then((module) => {
    resolve(module);
  })
}
const child = (resolve) => {
  import('./pages/child/child.vue').then((module) => {
    resolve(module);
  })
}
const childKeyeHistory = (resolve) => {
  import('./pages/child-keye-history/child-keye-history.vue').then((module) => {
    resolve(module);
  })
}
const childKeyeToday = (resolve) => {
  import('./pages/child-keye-today/child-keye-today.vue').then((module) => {
    resolve(module);
  })
}
const confirmKeye = (resolve) => {
  import('./pages/confirm-keye/confirm-keye.vue').then((module) => {
    resolve(module);
  })
}
const dangriQiandao = (resolve) => {
  import('./pages/dangri-qiandao/dangri-qiandao.vue').then((module) => {
    resolve(module);
  })
}
const childQiandao = (resolve) => {
  import('./pages/child-qiandao/child-qiandao.vue').then((module) => {
    resolve(module);
  })
}
const qiandaoHistory = (resolve) => {
  import('./pages/qiandao-history/qiandao-history.vue').then((module) => {
    resolve(module);
  })
}
const kaoqinjilu = (resolve) => {
  import('./pages/kaoqin-jilu/kaoqin-jilu.vue').then((module) => {
    resolve(module);
  })
}
const jiankong = (resolve) => {
  import('./pages/jiankong/jiankong.vue').then((module) => {
    resolve(module);
  })
}
const video = (resolve) => {
  import('./pages/video/video.vue').then((module) => {
    resolve(module);
  })
}
const aboutus = (resolve) => {
  import('./pages/aboutus/aboutus.vue').then((module) => {
    resolve(module);
  })
}

// 老师
const helpLaoshi = (resolve) => {
  import('./pages/help-laoshi/help-laoshi.vue').then((module) => {
    resolve(module);
  })
}

const helpLaoshi1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi3 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-3.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_3 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.3.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_4 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.4.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_5 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.5.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_6 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.6.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_7 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.7.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi1_8 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-1.8.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi2_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-2.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi2_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-2.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi3_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-3.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi3_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-3.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi4_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-4.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi4_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-4.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi4_3 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-4.3.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi5_0 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-5.0.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_2_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.2.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_2_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.2.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_3_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.3.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_3_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.3.2.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_4_1 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.4.1.vue').then((module) => {
    resolve(module);
  })
}
const helpLaoshi6_4_2 = (resolve) => {
  import('./pages/help-laoshi/help-laoshi-6.4.2.vue').then((module) => {
    resolve(module);
  })
}

// 家长
const helpJiazhang = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhangone = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-one.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhangtwo = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-two.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhangthree = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-three.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_1 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_1.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_2 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_2.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_3 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_3.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_4 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_4.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_5 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_5.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang1_6 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-1_6.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang2 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-2.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang3 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-3.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang4 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-4.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang5 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-5.vue').then((module) => {
    resolve(module);
  })
}
const helpJiazhang6 = (resolve) => {
  import('./pages/help-jiazhang/help-jiazhang-6.vue').then((module) => {
    resolve(module);
  })
}

const gonggao = (resolve) => {
  import('./pages/gonggao/gonggao.vue').then((module) => {
    resolve(module);
  })
}
const kechengbiao = (resolve) => {
  import('./pages/kechengbiao/kechengbiao.vue').then((module) => {
    resolve(module);
  })
}
const gonggao_detail = (resolve) => {
  import('./pages/gonggao-detail/gonggao-detail.vue').then((module) => {
    resolve(module);
  })
}
const download = (resolve) => {
  import('./pages/download/download.vue').then((module) => {
    resolve(module);
  })
}
const banjidongtai = (resolve) => {
  import('./pages/banjidongtai/banjidongtai.vue').then((module) => {
    resolve(module);
  })
}
const baodanchaxun = (resolve) => {
  import('./pages/baodanchaxun/baodanchaxun.vue').then((module) => {
    resolve(module);
  })
}
const toubaogongshi = (resolve) => {
  import('./pages/toubaogongshi/toubaogongshi.vue').then((module) => {
    resolve(module);
  })
}
const lipeitiaoli = (resolve) => {
  import('./pages/lipeitiaoli/lipeitiaoli.vue').then((module) => {
    resolve(module);
  })
}

Vue.use(Router)

let routes = [{
    path: '/',
    redirect: '/login',
    meta: {}
  },
  //登录页
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
      keepAlive: false,
      index: 1
    }
  },
  // 孩子们
  {
    path: '/children',
    name: 'children',
    component: children,
    meta: {
      title: '首页',
      keepAlive: true,
      index: 2
    }
  },
  // 孩子
  {
    path: '/child',
    name: 'child',
    component: child,
    meta: {
      title: '学生信息',
      keepAlive: false,
      index: 3
    }
  },
  // 课业
  {
    path: '/child-keye-today',
    name: 'child-keye-today',
    component: childKeyeToday,
    meta: {
      title: '当日课业',
      keepAlive: true,
      index: 4
    }
  },
  // 课业
  {
    path: '/child-keye-history',
    name: 'child-keye-history',
    component: childKeyeHistory,
    meta: {
      title: '课业历史',
      keepAlive: true,
      index: 5
    }
  },
  // 课业管理
  {
    path: '/confirm-keye',
    name: 'confirm-keye',
    component: confirmKeye,
    meta: {
      title: '课业管理',
      keepAlive: false,
      index: 6
    }
  },
  // 当日签到
  {
    path: '/dangri-qiandao',
    name: 'dangri-qiandao',
    component: dangriQiandao,
    meta: {
      title: '当日考勤',
      keepAlive: false,
      index: 7
    }
  },
  // 单次签到详情
  {
    path: '/child-qiandao',
    name: 'child-qiandao',
    component: childQiandao,
    meta: {
      title: '考勤详情',
      keepAlive: false,
      index: 8
    }
  },
  // 签到历史
  {
    path: '/qiandao-history',
    name: 'qiandao-history',
    component: qiandaoHistory,
    meta: {
      title: '考勤历史',
      keepAlive: false
    }
  },
  // 考勤记录，（新签到历史）
  {
    path: '/kaoqin-jilu',
    name: 'kaoqin-jilu',
    component: kaoqinjilu,
    meta: {
      title: '考勤记录',
      keepAlive: false
    }
  },
  // 监控
  {
    path: '/jiankong',
    name: 'jiankong',
    component: jiankong,
    meta: {
      title: '监控',
      keepAlive: true
    }
  },
  // 播放监控
  {
    path: '/video',
    name: 'video',
    component: video,
    meta: {
      title: '监控',
      keepAlive: false
    }
  },
  // 关于我们
  {
    path: '/aboutus',
    name: 'aboutus',
    component: aboutus,
    meta: {
      title: '关于我们',
      keepAlive: true
    }
  },


  // help-laoshi,不要标题
  {
    path: '/help-laoshi',
    name: 'helpLaoshi',
    component: helpLaoshi,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1
  {
    path: '/help-laoshi-1',
    name: 'helpLaoshi1',
    component: helpLaoshi1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-2
  {
    path: '/help-laoshi-2',
    name: 'helpLaoshi2',
    component: helpLaoshi2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-3
  {
    path: '/help-laoshi-3',
    name: 'helpLaoshi3',
    component: helpLaoshi3,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.1
  {
    path: '/help-laoshi-1_1',
    name: 'helpLaoshi1_1',
    component: helpLaoshi1_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.2
  {
    path: '/help-laoshi-1_2',
    name: 'helpLaoshi1_2',
    component: helpLaoshi1_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.3
  {
    path: '/help-laoshi-1_3',
    name: 'helpLaoshi1_3',
    component: helpLaoshi1_3,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.4
  {
    path: '/help-laoshi-1_4',
    name: 'helpLaoshi1_4',
    component: helpLaoshi1_4,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.5
  {
    path: '/help-laoshi-1_5',
    name: 'helpLaoshi1_5',
    component: helpLaoshi1_5,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.6
  {
    path: '/help-laoshi-1_6',
    name: 'helpLaoshi1_6',
    component: helpLaoshi1_6,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.7
  {
    path: '/help-laoshi-1_7',
    name: 'helpLaoshi1_7',
    component: helpLaoshi1_7,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-1.8
  {
    path: '/help-laoshi-1_8',
    name: 'helpLaoshi1_8',
    component: helpLaoshi1_8,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-2.1
  {
    path: '/help-laoshi-2_1',
    name: 'helpLaoshi2_1',
    component: helpLaoshi2_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-2.2
  {
    path: '/help-laoshi-2_2',
    name: 'helpLaoshi2_2',
    component: helpLaoshi2_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-3.1
  {
    path: '/help-laoshi-3_1',
    name: 'helpLaoshi3_1',
    component: helpLaoshi3_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-3.2
  {
    path: '/help-laoshi-3_2',
    name: 'helpLaoshi3_2',
    component: helpLaoshi3_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-4.1
  {
    path: '/help-laoshi-4_1',
    name: 'helpLaoshi4_1',
    component: helpLaoshi4_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-4.2
  {
    path: '/help-laoshi-4_2',
    name: 'helpLaoshi4_2',
    component: helpLaoshi4_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-4.3
  {
    path: '/help-laoshi-4_3',
    name: 'helpLaoshi4_3',
    component: helpLaoshi4_3,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-5.0
  {
    path: '/help-laoshi-5_0',
    name: 'helpLaoshi5_0',
    component: helpLaoshi5_0,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.1
  {
    path: '/help-laoshi-6_1',
    name: 'helpLaoshi6_1',
    component: helpLaoshi6_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.2.1
  {
    path: '/help-laoshi-6_2_1',
    name: 'helpLaoshi6_2_1',
    component: helpLaoshi6_2_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.2.2
  {
    path: '/help-laoshi-6_2_2',
    name: 'helpLaoshi6_2_2',
    component: helpLaoshi6_2_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.3.1
  {
    path: '/help-laoshi-6_3_1',
    name: 'helpLaoshi6_3_1',
    component: helpLaoshi6_3_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.3.2
  {
    path: '/help-laoshi-6_3_2',
    name: 'helpLaoshi6_3_2',
    component: helpLaoshi6_3_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.4.1
  {
    path: '/help-laoshi-6_4_1',
    name: 'helpLaoshi6_4_1',
    component: helpLaoshi6_4_1,
    meta: {
      title: '',
      keepAlive: true
    }
  },
  // help-laoshi-6.4.2
  {
    path: '/help-laoshi-6_4_2',
    name: 'helpLaoshi6_4_2',
    component: helpLaoshi6_4_2,
    meta: {
      title: '',
      keepAlive: true
    }
  },


  // help-jiazhang
  {
    path: '/help-jiazhang',
    name: 'helpJiazhang',
    component: helpJiazhang,
    meta: {
      title: '使用说明',
      keepAlive: true
    }
  },
  // help-jiazhang-one
  {
    path: '/help-jiazhang-one',
    name: 'helpJiazhangone',
    component: helpJiazhangone,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-two
  {
    path: '/help-jiazhang-two',
    name: 'helpJiazhangtwo',
    component: helpJiazhangtwo,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-three
  {
    path: '/help-jiazhang-three',
    name: 'helpJiazhangthree',
    component: helpJiazhangthree,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1.1
  {
    path: '/help-jiazhang-1_1',
    name: 'helpJiazhang1_1',
    component: helpJiazhang1_1,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1_2
  {
    path: '/help-jiazhang-1_2',
    name: 'helpJiazhang1_2',
    component: helpJiazhang1_2,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1_3
  {
    path: '/help-jiazhang-1_3',
    name: 'helpJiazhang1_3',
    component: helpJiazhang1_3,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1_4
  {
    path: '/help-jiazhang-1_4',
    name: 'helpJiazhang1_4',
    component: helpJiazhang1_4,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1_5
  {
    path: '/help-jiazhang-1_5',
    name: 'helpJiazhang1_5',
    component: helpJiazhang1_5,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-1_6
  {
    path: '/help-jiazhang-1_6',
    name: 'helpJiazhang1_6',
    component: helpJiazhang1_6,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-2
  {
    path: '/help-jiazhang-2',
    name: 'helpJiazhang2',
    component: helpJiazhang2,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-3
  {
    path: '/help-jiazhang-3',
    name: 'helpJiazhang3',
    component: helpJiazhang3,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-4
  {
    path: '/help-jiazhang-4',
    name: 'helpJiazhang4',
    component: helpJiazhang4,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-5
  {
    path: '/help-jiazhang-5',
    name: 'helpJiazhang5',
    component: helpJiazhang5,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },
  // help-jiazhang-6
  {
    path: '/help-jiazhang-6',
    name: 'helpJiazhang6',
    component: helpJiazhang6,
    meta: {
      title: '使用说明',
      keepAlive: false
    }
  },


  // 公告列表
  {
    path: '/gonggao',
    name: 'gonggao',
    component: gonggao,
    meta: {
      title: '班级公告',
      keepAlive: true
    }
  },
  // 公告详情
  {
    path: '/gonggao_detail',
    name: 'gonggao_detail',
    component: gonggao_detail,
    meta: {
      title: '公告详情',
      keepAlive: false
    }
  },
  // 课程表
  {
    path: '/kechengbiao',
    name: 'kechengbiao',
    component: kechengbiao,
    meta: {
      title: '课程表',
      keepAlive: true
    }
  },
  // 班级动态
  {
    path: '/banjidongtai',
    name: 'banjidongtai',
    component: banjidongtai,
    meta: {
      title: '班级动态',
      keepAlive: true
    }
  },
  // 课业附件下载
  {
    path: '/download',
    name: 'download',
    component: download,
    meta: {
      title: '下载',
      keepAlive: false
    }
  },
  // 保单查询
  {
    path: '/baodanchaxun',
    name: 'baodanchaxun',
    component: baodanchaxun,
    meta: {
      title: '保单查询',
      keepAlive: false
    }
  },
  // 投保公示
  {
    path: '/toubaogongshi',
    name: 'toubaogongshi',
    component: toubaogongshi,
    meta: {
      title: '投保公示',
      keepAlive: false
    }
  },
  // 理赔条例
  {
    path: '/lipeitiaoli',
    name: 'lipeitiaoli',
    component: lipeitiaoli,
    meta: {
      title: '理赔条例',
      keepAlive: false
    }
  },
]

// 给routes中成员加上index
let index_value = 0;
routes.forEach((c, i) => {
  c.meta.index = index_value++;
})

let router = new Router({
  mode: 'history',
  // base: 'src',
  routes
})


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // store.dispatch('updateIsloading', true);
  // http://dev0828.h5.haotuoguan.cn/confirm-keye?state=1&tel=18159800156&open_id=oS__X1cVpSelfHNduHGzE7DyHHYc&student_id=64&homework_id=1&round_id=&punchcard_date=
  // ?state=0&open_id=oS__X1cVpSelfHNduHGzE7DyHHYc00
  // 取参数
  // 保存地址中携带的所有参数
  sessionStorage.setItem('query', JSON.stringify(to.query));
  Object.keys(to.query).forEach((c, i) => {
    sessionStorage.setItem(c, to.query[c]);
  })

  if (from.name === 'children' && to.name === 'login') {
    // 如果没有退出登录的情况下进入login，则跳children页
    if (sessionStorage.getItem("quitstatus") === 'false') {
      next(false);
      return;
    }
  }

  if (from.name === 'login' && to.name === 'children') {
    // 如果退出登录后要进children
    if (sessionStorage.getItem("quitstatus") === 'true') {
      // 已经退出登录，就跳登录页
      next(false)
      return;
    }
  }

  if (to.query.state == 0) {
    // 登录页
    next('./login');
    return;
  }

  next();
})

router.afterEach((to, from) => {
  document.title = to.meta.title;
})

export default router;
