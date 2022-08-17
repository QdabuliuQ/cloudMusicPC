<template>
  <div class="eventHead">
    <div @click="router.push('/UserDetail?id='+uid)" v-if="avatarUrl" class="leftImage">
      <el-avatar :size='45' :src="avatarUrl"/>
    </div>
    <div class="rightInfo">
      <div class="name"><span @click="router.push('/UserDetail?id='+uid)" class="nameSpan">{{nickname}}</span> <span>{{text}}</span></div>
      <div class="time">{{$getTime(time)}}</div>
      <div class="msg">
        <span v-if="target && target.length" v-for="item in target" :key="item.id">
          #{{item.name}}#
        </span>
        {{msg}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'eventHead',
  props: ['avatarUrl','nickname','time', 'text', 'msg', 'target', 'uid'],
  setup() {
    const router = useRouter()
    return {
      router
    }
  }
})
</script>

<style lang='less'>
.eventHead {
  display: flex;
  margin-bottom: 15px;
  .leftImage {
    display: flex;
    cursor: pointer;
  }
  .rightInfo {
    margin-left: 15px;
    font-size: 13px;
    .name {
      margin-top: 3px;
      color: @fontColor;
      cursor: pointer;
      .nameSpan {
        color: var(--nameColor);
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .time {
      margin-top: 8px;
      font-size: 12px;
      color: @fontColor;
    }
    .msg {
      margin-top: 8px;
      font-size: 14.5px;
      color: var(--textColor);
      span {
        color: var(--nameColor);
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>