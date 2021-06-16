import { request } from './request'

export function getdetalil(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getrecommend() {
  return request({
    url: '/recommend',
  })
}
export class goods {
  constructor(itemInfo, columns, services) {
    this.columns = columns
    this.services = services
    this.lowNowPrice = itemInfo.lowNowPrice
    this.lowPrice = itemInfo.lowPrice
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.desc = itemInfo.desc
    this.title = itemInfo.title
    this.discountDesc = itemInfo.discountDesc
    this.discountBgcolor = itemInfo.discountBgcolor
  }
}
export class shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class comments {
  constructor(list) {
    this.content = list.content,
      this.extraInfo = list.extraInfo ? list.extraInfo : '',
      this.style = list.style,
      this.created = list.created
    this.rateId = list.rateId,
      this.uname = list.user.uname,
      this.avatar = list.user.avatar,
      this.images = list.images
  }
}
