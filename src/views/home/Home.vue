<template>
  <div id="home">
    <Navbar class="home-nav">
      <div slot="center">购物街</div>
    </Navbar>
    <home-swiper :banners="banners" class="home-swiper"></home-swiper>
    <Homerecommed :recommends="recommends"></Homerecommed>
    <feature></feature>
    <tab-contorl class="tab-contorl" :titles="['流行' , '新款' , '精选']"></tab-contorl>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
      <li>51</li>
      <li>52</li>
      <li>53</li>
      <li>54</li>
      <li>55</li>
      <li>56</li>
      <li>57</li>
      <li>58</li>
      <li>59</li>
      <li>60</li>
      <li>61</li>
      <li>62</li>
      <li>63</li>
      <li>64</li>
      <li>65</li>
      <li>66</li>
      <li>67</li>
      <li>68</li>
      <li>69</li>
      <li>70</li>
      <li>71</li>
      <li>72</li>
      <li>73</li>
      <li>74</li>
      <li>75</li>
      <li>76</li>
      <li>77</li>
      <li>78</li>
      <li>79</li>
      <li>80</li>
      <li>81</li>
      <li>82</li>
      <li>83</li>
      <li>84</li>
      <li>85</li>
      <li>86</li>
      <li>87</li>
      <li>88</li>
      <li>89</li>
      <li>90</li>
      <li>91</li>
      <li>92</li>
      <li>93</li>
      <li>94</li>
      <li>95</li>
      <li>96</li>
      <li>97</li>
      <li>98</li>
      <li>99</li>
      <li>100</li>
    </ul>
  </div>
</template>
<script>

  import HomeSwiper from './childcomponent/HomeSwiper'
  import Homerecommed from './childcomponent/Homerecommed'
  import feature from './childcomponent/feature'

  import Navbar from 'components/common/navbar/NavBar'
  import TabContorl from 'components/content/TabContorl'
  import { getHomeMultidata, getHomeGoods } from 'network/home'
  export default {
    name: 'Home',
    props: [''],
    data() {
      return {
        name: "首页",
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        }
      };
    },
    //在DOM元素创建完成之后发送网络请求
    created() {

      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    methods: {
      //函数封装
      getHomeMultidata() {
        //getHomeMultidata promise函数
        //请求到地址后通过then接收数据
        getHomeMultidata().then(res => {
          // this.result = res
          // console.log(this.result)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //调用一次页码加一
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //将多个list依次入栈
          this.goods[type].list.push(...res.data.list)
          //list入栈之后页码在当前基础之上加一
          this.goods[type].page += 1
        })



      }
    },
    components: {
      HomeSwiper,
      Homerecommed,
      feature,
      Navbar,
      TabContorl,
    }
  }
</script>
<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;

  }

  .tab-contorl {
    position: sticky;
    top: 44px;
  }
</style>