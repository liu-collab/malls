<template>
  <div>
    <div v-if="Object.keys(goods).length !==0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
        <span class="price">{{goods.price}}</span>
        <span class="old-price">{{goods.oldPrice}}</span>
        <span class="discountDesc">{{goods.discountDesc}}</span>
      </div>
      <div class="info-sesc">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
    </div>
    <div class="info-services">
      <span class="info-service-item" v-for="(item,index) in goods.services" :key="index">
        <img :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  .base-info {
    padding: 15px 5px 0px 5px;
    border-bottom: 1px solid #ccc;
  }

  .info-price {
    padding: 20px;
  }

  .price {
    font-size: 25px;
    color: var(--color-tint);
  }

  .discountDesc {
    position: relative;
    top: -10px;
    display: inline-block;
    font-size: 16px;
    height: 22px;
    border-radius: 10px;
    background-color: var(--color-high-text);
    color: #fff;
    text-align: center;
    margin-left: 5px;
  }

  .old-price {
    padding-left: 5px;
    color: gray;
    text-decoration: line-through;
  }

  .info-sesc {
    display: flex;
    padding: 10px 5px;
    justify-content: space-between;
    bottom: 5px;
    font-size: 14px;
  }

  .info-sesc {
    flex: 1;
  }

  .info-services {
    display: flex;
  }

  .info-service-item {
    flex: 1;
    padding: 15px 5px 15px;
    justify-content: space-between;
    border-bottom: 2px solid #ccc;
  }

  .info-service-item img {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  .info-service-item span {
    font-size: 14px;
  }
</style>