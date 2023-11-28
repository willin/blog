import type { I18nDict } from 'remix-i18n';

export const dict: I18nDict = {
  site: {
    title: 'Willin Wang (v0)',
    subtitle: 'Full-time open source, travel, self-media, part-time consultant',
    desc: 'To be Willin is to be willing.\nNo one can change the past, just like no one can predict the feature.\nI prefer to write the history, rather than to record the history.',
    offer: 'What can I do for you?',
    blog: 'Posts',
    social: 'Social Media',
    view_by_category: 'View posts by categories',
    view_by_tag: 'View posts by tags',
    total_wordcount:
      'Total posts: <span class="badge badge-lg">{{posts}}</span>, wordcount: <span class="badge badge-lg badge-secondary">{{wordcount}}</span>, reading time about <span class="badge badge-lg badge-primary">{{readtime}}</span> hours, total <span class="badge badge-lg badge-accent">{{views}}</span> views.'
  },
  common: {
    donate: '⚡ Sponsor Willin',
    donate_tip: 'Thank you, my boss ❤️',
    login_and_follow: 'You need to login and follow github {{username}} first.',
    login: 'Login',
    fans_login: 'Github Fans Remove Ads',
    logout: 'Logout',
    confirm_logout: 'Are you sure to logout?',
    profile: 'Profile',
    follow: 'Go & Follow',
    vip: 'Upgrade/Renew VIP',
    views: 'views',
    category: 'Category',
    tags: 'Tags',
    publish_at: 'Published at ',
    category_by: 'Categoried by ',
    tags_by: 'Tagged by ',
    wordcount: 'Wordcount: {{wordcount}}',
    reading_time: 'Reading time: {{time}}'
  },
  components: {
    income: '⚡ Income',
    expenditure: '❤️ Expenditure',
    balance: '🌾 Balance',
    this_year: 'This year',
    no_data: 'Nothing here',
    date: 'Date',
    amount: 'Amount',
    desc: 'Description'
  }
};
