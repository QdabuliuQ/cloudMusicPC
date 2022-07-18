<template>
  <div id="avatarUpload">
    <el-avatar shape="square" :size="150" :fit="'cover'" :src="url" />
    <input
      @change="loadChange"
      accept="image/jpg, image/png, image/jpeg"
      ref="uploadInputRef"
      style="display: none"
      type="file"
    />
    <div class="btnBox">
      <div @click="uploadInputRef.click()" class="editBtn">{{ btnText }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  getCurrentInstance,
  watch,
} from "vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  props: ["coverUrl", "btnText", "formName"],
  emits: ["changeEvent"],
  name: "avatarUpload",
  setup(props, context) {
    const uploadInputRef = ref();
    const _this: any = getCurrentInstance();
    const data = reactive({
      imageWidth: 0,
      url: "",
    });

    const getObjectURL = (file: any) => {
      var url = null;
      if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    };

    const loadChange = (e: any) => {
      if (
        _this.proxy.$fileType(uploadInputRef.value.files[0].name) == "image"
      ) {
        var reader = new FileReader();
        reader.onload = function (evt: any) {
          var image = new Image();
          image.onload = function (e) {
            data.imageWidth = image.width;
            let f = new FormData();
            f.append(props.formName, uploadInputRef.value.files[0]);
            context.emit("changeEvent", f, data.imageWidth); // 发送事件
          };
          image.src = evt.target.result;
        };
        reader.readAsDataURL(uploadInputRef.value.files[0]);
        data.url = getObjectURL(uploadInputRef.value.files[0]) as string;
      } else {
        ElNotification({
          message: "文件类型错误",
          type: "error",
          customClass: "darkNotice",
        });
      }
    };

    watch(
      () => props.coverUrl,
      (n) => {
        data.url = n;
      },
      { immediate: true }
    );

    onMounted(() => {});
    return {
      uploadInputRef,
      loadChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#avatarUpload {
  .btnBox {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .editBtn {
    font-size: 13px;
    margin: 0 auto;
    padding: 7px 20px;
    border-radius: 30px;
    border: 1px solid #757575;
    color: @fontColor;
    cursor: pointer;
    &:hover {
      background: @hoverColor;
    }
  }
}
</style>