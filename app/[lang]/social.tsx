import clsx from 'classnames';

type SocialItem = { name: string; url: string; icon?: string };

const social: SocialItem[] = [
  // Bilibili
  {
    name: 'Bilibili',
    url: 'https://space.bilibili.com/445780384',
    icon: 'https://img.shields.io/badge/dynamic/json?labelColor=FE7398&label=Bilibili&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D445780384&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc/pXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx+bCQD8/S9tmgVqeDr1lLigDgZvDhXso+K9TyTBQRwRJ8AHjntl0Flh5QRAQK/mKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR/RwkRKPizBN8CgEcuESj4Lwm+BwBjahEk+H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l+72BSs8d7w8U+JDAnZERQMcV+CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T+5aVk6+2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I/wcSbXU5jQBUkRtdf4Rar90v8kSv3+I3ffCCSpk8I/w+lgDkdI/v2rEp2CaiWm1AsDQLlDAD+dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3/BBMHEyBmDXlFfA8IzeHb+Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC/A8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu/ZaEcCUxFvgz2zO+BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U/H50Pq4JNP7Qiw8UFnJwcK+tXy+Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC+OIx5TDqo5nDT+F/SS/9CYzwb+No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd+I0HPXslLKnT0N+wnkrTKi9JZL/L9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td/Tvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC/osSYvjRQz4cJ6n7KO3rYQL7M+L6nVtfDVRAEQRAEQRAEQRAEIZ5/SAXmdfXaoQsAAAAASUVORK5CYII=&color=282c34&longCache=true'
  },
  // Github
  {
    name: 'Github',
    url: 'https://github.com/willin',
    icon: 'https://img.shields.io/badge/dynamic/json?label=Star&query=$.stars&url=https%3a%2f%2fapi.github-star-counter.workers.dev%2fuser%2fwillin&color=181717&logo=github&=true'
  },
  // 爱发电
  {
    name: '爱发电',
    url: 'https://afdian.net/a/willin',
    icon: 'https://img.shields.io/badge/dynamic/json?label=%E7%88%B1%E5%8F%91%E7%94%B5&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DafdianFans%26queryKey%3Dwillin&suffix=%20%E5%8F%91%E7%94%B5%E4%BA%BA%E6%AC%A1%20%2F%20%E6%9C%88&labelColor=946ce6&color=282c34&longCache=true'
  },
  // 知乎
  {
    name: '知乎',
    url: 'https://www.zhihu.com/people/willin',
    icon: 'https://img.shields.io/badge/dynamic/json?label=知乎&query=$.data.totalSubs&url=https%3a%2f%2fapi.spencerwoo.com%2fsubstats%2f%3fsource%3dzhihu%26queryKey%3dwillin&color=0084ff&logo=Zhihu&longCache=true'
  },
  // 微博
  {
    name: '微博',
    url: 'https://weibo.com/willinx',
    icon: 'https://img.shields.io/badge/dynamic/json?label=微博&query=$.data.totalSubs&url=https%3a%2f%2fapi.spencerwoo.com%2fsubstats%2f%3fsource%3dweibo%26queryKey%3d1860509070&color=ffa339&logo=sina-weibo&longCache=true'
  },
  // 网易云音乐
  {
    name: '网易云音乐',
    url: 'https://music.163.com/#/user/home?id=12797402',
    icon: 'https://img.shields.io/badge/dynamic/json?label=网易云音乐&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3DneteaseMusic%26queryKey%3D12797402&color=282c34&labelColor=e72d2c&logo=data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik02MjcuMDg2IDUuMTE1YzI4LjEzMi03LjY3MiA1OC44MjItNy42NzIgODYuOTUzIDAgMzMuMjQ3IDcuNjcyIDYzLjkzNyAyMy4wMTcgODkuNTEyIDQzLjQ3NyAxMC4yMyA3LjY3MyAxNy45MDIgMTUuMzQ0IDIzLjAxNyAyOC4xMzEgNy42NzIgMTcuOTAzIDUuMTE0IDM4LjM2My01LjExNSA1My43MDgtNy42NzIgMTIuNzg3LTIzLjAxNyAyMy4wMTctNDAuOTIgMjUuNTc0LTEyLjc4NyAyLjU1OC0yNS41NzQgMC0zOC4zNjItNy42NzItNS4xMTUtMi41NTgtMTAuMjMtMTAuMjMtMTcuOTAyLTEyLjc4Ny0xNy45MDItMTAuMjMtMzUuODA0LTIwLjQ2LTU2LjI2NC0xNy45MDMtMTUuMzQ1IDAtMjguMTMyIDcuNjczLTM1LjgwNCAxNy45MDMtMTAuMjMgMTAuMjMtMTIuNzg4IDIzLjAxNy0xMC4yMyAzNS44MDQgNy42NzIgMjUuNTc0IDEyLjc4NyA1My43MDYgMjAuNDYgNzkuMjgxIDUxLjE1IDIuNTU4IDk5Ljc0IDE1LjM0NSAxNDMuMjE4IDQwLjkyIDQwLjkyIDI1LjU3NSA3OS4yOCA1OC44MjEgMTA5Ljk3IDk3LjE4MyAyNS41NzUgMzMuMjQ3IDQ2LjAzNSA3MS42MSA1Ni4yNjUgMTEyLjUzIDEyLjc4NiA0My40NzYgMTcuOTAxIDg5LjUxIDEyLjc4NiAxMzIuOTg2LTIuNTU3IDM4LjM2My0xMC4yMyA3NC4xNjYtMjMuMDE2IDEwOS45NzEtMzMuMjQ3IDg0LjM5Ni05Mi4wNyAxNjEuMTItMTcxLjM1IDIwOS43MTMtNTYuMjY1IDM1LjgwMy0xMjIuNzYgNTguODIxLTE4OS4yNTMgNjYuNDkzLTQ2LjAzNCA1LjExNS05Mi4wNjkgNS4xMTUtMTM4LjEwMi0yLjU1Ny05NC42MjctMTUuMzQ1LTE4MS41OC02MS4zOC0yNTAuNjMxLTEzMC40MzEtNjYuNDk1LTY2LjQ5My0xMTIuNTMtMTUzLjQ0OC0xMzIuOTktMjQ1LjUxNi03LjY3MS02OS4wNTItNy42NzEtMTM4LjEwMyA3LjY3My0yMDcuMTU0IDE3LjkwMy04MS44NCA2MS4zOC0xNjEuMTIgMTE3LjY0NC0yMjIuNSA0OC41OTItNTEuMTUgMTA3LjQxNC04OS41MTEgMTcxLjM1LTExNy42NDMgNy42NzItMi41NTggMTIuNzg3LTUuMTE1IDIwLjQ2LTcuNjczIDE1LjM0NC0yLjU1NyAzMC42OSAwIDQzLjQ3NyAxMC4yMyAxNy45MDIgMTIuNzg4IDI1LjU3NCAzMy4yNDggMjMuMDE3IDUzLjcwNy0yLjU1NyAyMC40Ni0xNy45MDIgMzguMzYzLTM1LjgwNSA0Ni4wMzQtNjMuOTM3IDI1LjU3NS0xMjIuNzU4IDY5LjA1Mi0xNjMuNjc4IDEyMi43Ni0zOC4zNjIgNTMuNzA1LTYzLjkzNiAxMTIuNTI3LTcxLjYwOCAxNzMuOTA2LTcuNjcyIDYxLjM4IDAgMTIyLjc1OCAyMC40NiAxODEuNTggMzAuNjkgODQuMzk2IDk0LjYyNiAxNTYuMDA0IDE3My45MDcgMTk2LjkyNCA0OC41OTIgMjUuNTc1IDEwMi4yOTggMzguMzYyIDE1Ni4wMDUgMzguMzYyIDQzLjQ3NyAwIDg5LjUxMS03LjY3MiAxMzAuNDMtMjMuMDE3IDM1LjgwNS0xMi43ODcgNzEuNjEtMzMuMjQ3IDk5Ljc0MS01OC44MjIgMjguMTMzLTIzLjAxNiA1MS4xNS01My43MDYgNjYuNDk1LTg0LjM5NiA3LjY3Mi0xNS4zNDUgMTcuOTAxLTMzLjI0NyAyMC40Ni01MS4xNSAxNS4zNDQtNTEuMTQ5IDE3LjkwMS0xMDcuNDEzIDIuNTU2LTE1OC41NjEtMTIuNzg2LTQzLjQ3OC0zOC4zNjEtODEuODQtNzEuNjA5LTEwOS45NzEtMTUuMzQ0LTEyLjc4Ny0zMC42OS0yNS41NzUtNDguNTkyLTM1LjgwNS0xNS4zNDQtNy42NzItMzAuNjktMTUuMzQ1LTQ4LjU5MS0xNy45MDIgMTIuNzg4IDQ2LjAzNCAyMy4wMTggOTIuMDcgMzUuODA0IDEzNS41NDUgMi41NTggMTAuMjMgNS4xMTUgMjMuMDE4IDUuMTE1IDMzLjI0OCAyLjU1OCA0Ni4wMzMtMTUuMzQ0IDk0LjYyNS00Ni4wMzQgMTMwLjQzLTI4LjEzMiAzMy4yNDYtNjkuMDUyIDU4LjgyMS0xMTIuNTI4IDY2LjQ5NC00Ni4wMzQgMTAuMjMtOTcuMTg0IDAtMTM4LjEwMy0yNS41NzUtMzguMzYyLTI1LjU3NC02Ni40OTQtNjMuOTM2LTgxLjg0LTEwNC44NTYtNy42NzItMjMuMDE3LTEyLjc4Ny00OC41OTEtMTIuNzg3LTc0LjE2Ni0yLjU1Ni01Ni4yNjQgMTIuNzg4LTEwOS45NzEgNDMuNDc4LTE1Ni4wMDUgMzUuODA0LTUzLjcwNyA5NC42MjUtOTIuMDcgMTU4LjU2Mi0xMDkuOTcxLTUuMTE1LTE3LjkwMi0xMC4yMy0zNS44MDUtMTIuNzg3LTUzLjcwNy0xMi43ODctMzguMzYxLTEwLjIzLTgxLjgzOSA3LjY3Mi0xMTUuMDg2IDEwLjIzLTIwLjQ2IDIzLjAxOC0zOC4zNjEgNDAuOTItNTEuMTUgMjMuMDE2LTIwLjQ2IDQzLjQ3Ni0zMy4yNDYgNjYuNDk0LTQwLjkxOE00NzguNzUzIDQxOS40MjRjLTE3LjkwMyAxNy45MDItMjguMTMzIDQwLjkyLTMzLjI0NyA2My45MzYtNS4xMTQgMjAuNDYtNS4xMTQgNDMuNDc3IDAgNjYuNDk1IDUuMTE0IDIzLjAxNiAxNy45MDIgNDYuMDMzIDM4LjM2MiA2MS4zOCAxNS4zNDUgMTAuMjI4IDM1LjgwNCAxNS4zNDMgNTYuMjY0IDEwLjIyOCAzNS44MDQtNS4xMTUgNjMuOTM2LTM4LjM2MiA2My45MzYtNzQuMTY2LTIuNTU3LTcuNjcyLTIuNTU3LTE3LjkwMi01LjExNS0yNS41NzUtMTIuNzg3LTQ4LjU5Mi0yNS41NzMtOTkuNzQxLTM4LjM2MS0xNDguMzMzLTMwLjY5IDcuNjczLTU4LjgyMiAyMy4wMTgtODEuODQgNDYuMDM1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==&longCache=true'
  },
  // CSDN
  {
    name: 'CSDN',
    url: 'https://blog.csdn.net/jslygwx'
  },
  // 小报童专栏
  {
    name: '小报童专栏',
    url: 'https://xiaobot.net/p/willin'
  },
  // 抖音
  {
    name: '抖音: v0',
    url: 'https://wealth.willin.wang/_next/image?url=%2Fimages%2Fdouyin.png&w=640&q=75'
  },
  // 支付宝实盘
  {
    name: '支付宝基金实盘',
    url: 'https://wealth.willin.wang/_next/image?url=%2Fimages%2Falipay-fund.png&w=640&q=75'
  },
  // 微信公众号
  {
    name: '微信公众号：初瘦',
    url: 'https://wealth.willin.wang/_next/image?url=%2Fimages%2Fqr.png&w=640&q=75'
  },
  // SegmentFault
  {
    name: 'SegmentFault',
    url: 'https://segmentfault.com/u/willin'
  },
  // 掘金
  {
    name: '掘金',
    url: 'https://juejin.cn/user/1873223546052391'
  }
];

const classNames = [
  'btn-primary',
  'btn-warning',
  'btn-secondary',
  'btn-info',
  'btn-success',
  'btn-accent',
  'btn-error'
];

export function ImageLink({ item, index }: { item: SocialItem; index: number }) {
  return (
    <a
      className={clsx('btn btn-xs btn-outline', classNames[index % classNames.length])}
      href={item.url}
      target='_blank'>
      <img src={item.icon} alt={item.name} />
    </a>
  );
}

export function TextLink({ item, index }: { item: SocialItem; index: number }) {
  return (
    <a
      className={clsx('btn btn-xs btn-outline', classNames[index % classNames.length])}
      href={item.url}
      target='_blank'>
      {item.name}
    </a>
  );
}

export function SocialLinks() {
  return (
    <>
      {social
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .map((item, index) =>
          item.icon ? (
            <ImageLink key={item.name} item={item} index={index} />
          ) : (
            <TextLink key={item.name} item={item} index={index} />
          )
        )}
    </>
  );
}
