<template>
  <div class="bottom-nav">
    <div class="btn-content">
      <check-button class="btn-check" @click.native="btncheck" :isactive="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="totalprice">
      合计：{{totalprice}}
    </div>
    <div class="toadd" @click='btncalc'>
      去计算({{checkedLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkButton/CheckedButton'
  import { mapGetters } from 'vuex'
  export default {
    name: '',
    components: {
      CheckButton,
    },
    props: {},
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters(['carList']),
      totalprice() {
        return '￥' + this.carList.filter(item => {
          //遍历选中
          return item.checked
        }).reduce((prevalue, item) => {
          //计算选中价格和数量
          return prevalue + item.price * item.count
          //保留两位小数
        }, 0).toFixed(2)
      },
      checkedLength() {
        //遍历选中的长度
        return this.carList.filter(item => { return item.checked }).length
      },
      isSelectAll() {
        //购物车没有东西全选按钮返回false
        if (this.carList.length === 0) {
          return false
        }
        //查找没有没有选中的并返回Flase
        return !this.carList.find(item => !item.checked)
      }
    },
    methods: {
      btncheck() {
        if (this.isSelectAll) {
          return this.carList.forEach(item => { item.checked = false })
        } else {
          return this.carList.forEach(item => { item.checked = true })
        }
      },
      btncalc() {
        if (!this.isSelectAll) {
          this.$toast.show("请选择你要购买的商品", 2000)
        }
      }

    },
  }
</script>
<style scoped>
  .bottom-nav {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;

  }

  .btn-content {
    display: flex;
    width: 70px;
    height: 40px;
  }

  .btn-check {
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 5px;

  }

  .btn-content span {
    display: flex;
    align-items: center;
    margin-right: 5px;

  }

  .totalprice {
    flex: 1;
    /* margin-right: 100px; */
    margin-left: 10px;
  }

  .toadd {
    text-align: center;
    width: 100px;
    background-color: red;
  }
</style>