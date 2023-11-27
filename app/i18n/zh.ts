import type { I18nDict } from 'remix-i18n';

export const dict: I18nDict = {
  site: {
    title: 'Willin (v0) 老王',
    desc: 'To be Willin is to be willing.\nWillin（老王）带你躺平养老。',
    blog: '博客',
    social: '欢迎在以下社交媒体关注我',
    view_by_category: '按照【分类】筛选文章',
    view_by_tag: '按照【标签】筛选文章',
    total_wordcount:
      '已写下 <span class="badge badge-lg">{{posts}}</span> 篇博客文章，共计 <span class="badge badge-lg badge-secondary">{{wordcount}}</span> 字，完整阅读预计需要 <span class="badge badge-lg badge-primary">{{readtime}}</span> 小时，已有 <span class="badge badge-lg badge-accent">{{views}}</span> 次阅读。'
  },
  common: {
    donate: '⚡ 为老王充电',
    donate_tip: '感谢您的慷慨赞助 ❤️',
    login_and_follow: '您需要登录并且在 Github 上关注 {{username}} 后才能继续阅读本文。',
    login: '登录',
    fans_login: 'Github 粉丝登录免广告',
    logout: '退出',
    follow: '去关注',
    views: '阅读',
    category: '分类',
    tags: '标签',
    publish_at: '最初发表于：',
    category_by: '所属目录：',
    tags_by: '相关标签：',
    wordcount: '文章字数： {{wordcount}}',
    reading_time: '阅读时长： {{time}} 分钟'
  },
  components: {
    income: '充 ⚡ 收入',
    expenditure: '用 ❤️ 支出',
    balance: '余粮 🌾 ',
    this_year: '今年',
    no_data: '请开始您的表演',
    date: '日期',
    amount: '金额',
    desc: '项目说明'
  }
};
