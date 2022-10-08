<script setup lang="ts">
import { lpk } from "./config/lpk";
import Icon from '@/components/lcon'

Tools.LocalStorage.setItem('test_001', 'testValue')
console.log(lpk('Index'));

</script>

<template>
  <!-- <div>
    {{app.getConfig('baseUrl')}}
    <br />
    {{Tools.LocalStorage.getItem('test_001')}}
    <br />
    {{lpk('Index')}}
    <Icon icon='icon-time' />
    <van-button type="primary">主要按钮</van-button>

    <div class="theme">
      <div class="theme-item" v-for="index in 3" :key="index">{{index}}</div>
    </div>
  </div> -->
  <div class="index-v">
    <div class="title">
      <router-view></router-view>
    </div>
  </div>

</template>

<style scoped lang="less">
.index {
  background: #663322;

  .title {
    margin: 30px;
  }
}

// .theme {
//   display: flex;
//   justify-content: space-between
// }

// .theme-item {
//   margin: 10px 20px;
//   width: 30px;
//   padding: 30px 0;
//   text-align: center;
//   background-color: #f00;
//   color: #fff;
// }
</style>
