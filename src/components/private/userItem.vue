<template>
  <div class="userItem">
    <div class="leftInfo">
      <el-avatar :size="80" :src="avatarUrl" />
    </div>
    <div class="rightInfo">
      <div class="name">
        {{ nickname
        }}<img v-if="gender == 1" src="~images/common/boy.png" alt="" />
        <img v-if="gender == 2" src="~images/common/girl.png" alt="" />
      </div>
      <div :title="signature" class="signature">
        {{ sign }}
      </div>
      <div class="detail">
        <span>歌单：{{ playlistCount }}</span>
        <span style="margin-left: 15px">粉丝：{{ followeds }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  name: "userItem",
  props: [
    "avatarUrl",
    "nickname",
    "signature",
    "playlistCount",
    "followeds",
    "gender",
  ],
  setup(props) {
    const data = reactive({
      sign: "",
    });

    watch(
      () => props.signature,
      (n) => {
        if (n) {
        data.sign = n.trim();
        }
      },{
        immediate: true
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.userItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  .leftInfo {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .rightInfo {
    font-size: 14px;
    .name {
      display: flex;
      align-items: center;
      color: var(--textColor);
      img {
        width: 20px;
        margin-left: 5px;
      }
    }
    .signature {
      margin-top: 10px;
      font-size: 12px;
      color: @fontColor;
      width: 150px;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .detail {
      font-size: 12px;
      color: @fontColor;
    }
  }
}
</style>