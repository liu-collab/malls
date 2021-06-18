<template>
  <div class="shop-item">
    <div class="shop-box">
      <CheckButton :isactive="iteminfo.checked" @click.native="btnclick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="iteminfo.images" alt="">
    </div>
    <div class="item-info">
      <div class="info-title">{{iteminfo.title}}</div>
      <div class="info-desc">{{iteminfo.desc}}</div>
      <div class="bottom">
        <div class="info-price">￥{{iteminfo.price}}</div>
        <div class="info-count">x{{iteminfo.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckedButton'
  export default {
    name: '',
    components: {
      CheckButton
    },
    props: {
      iteminfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      };
    },
    methods: {
      btnclick() {
        this.iteminfo.checked = !this.iteminfo.checked
      }
    },

  }
</script>
<style scoped>
  .shop-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .shop-box {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .item-img {
    padding: 2px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    position: relative;
    width: 70%;
    padding: 8px 15px;

  }

  .info-title,
  .info-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-title {
    font-size: 17px
  }

  .info-desc {
    font-size: 13px;
    padding: 15px 0;
  }

  .bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-price {
    float: left;
    color: orangered;
  }

  .info-count {
    float: right;
    margin-right: 10px;
  }
</style>