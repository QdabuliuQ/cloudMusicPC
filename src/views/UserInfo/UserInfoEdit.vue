<template>
  <div id="UserInfoEdit">
    <div class="title">编辑个人信息</div>
    <div class="userData">
      <div class="leftInfo">
        <div class="itemInfo">
          <div class="itemTitle">昵称：</div>
          <div class="itemInput">
            <input v-model="tempInfo.nickname" type="text" />
          </div>
        </div>
        <div style="margin-bottom: 10px" class="itemInfo">
          <div class="itemTitle">介绍：</div>
          <div class="itemInput">
            <textarea v-model="tempInfo.signature" maxlength="290"></textarea>
          </div>
        </div>
        <div class="itemInfo">
          <div class="itemTitle">性别：</div>
          <div style="margin-left: 15px" class="">
            <el-radio-group v-model="tempInfo.gender">
              <el-radio label="0">保密</el-radio>
              <el-radio label="1">男性</el-radio>
              <el-radio label="2">女性</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="itemInfo">
          <div class="itemTitle">生日：</div>
          <div style="margin-left: 15px" class="">
            <el-config-provider :locale="local">
              <el-date-picker
                :editable="false"
                :local="local"
                :effect="'dark'"
                v-model="tempInfo.birthday"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                popper-class="calendarPopoverClass"
              />
            </el-config-provider>
          </div>
        </div>
        <div class="itemInfo">
          <div class="itemTitle">地区：</div>
          <div style="margin-left: 15px" class="">
            <el-select
              :effect="'dark'"
              popper-class="selectPopoverClass"
              v-model="tempInfo.province"
              placeholder="选择省/直辖市"
            >
              <el-option
                v-for="(item, index) in area_codes"
                :key="item.code"
                :label="item.name"
                :value="item.name"
                @click.native="optionClick('province', item, index)"
              />
            </el-select>
            <el-select
              style="margin-left: 25px"
              :effect="'dark'"
              popper-class="selectPopoverClass"
              v-model="tempInfo.city"
              placeholder="选择区/县"
            >
              <el-option
                v-for="(item, index) in pIndex == -1
                  ? []
                  : area_codes[pIndex].children"
                :key="item.code"
                :label="item.name"
                :value="item.name"
                @click.native="optionClick('city', item, index)"
              />
            </el-select>
          </div>
        </div>
        <div class="saveContainer">
          <div @click="submitInfo" class="saveBtn">保存</div>
        </div>
      </div>
      <div class="rightImg">
        <avatarUpload
          :coverUrl="tempInfo.avatarUrl"
          @changeEvent="uploadChange"
          :formName="'imgFile'"
          :btnText="'修改头像'"
        ></avatarUpload>
        <!-- <el-avatar
          shape="square"
          :size="150"
          :fit="'cover'"
          :src="tempInfo.avatarUrl"
        />
        <input
          @change="loadChange"
          accept="image/jpg, image/png, image/jpeg"
          ref="uploadInputRef"
          style="display: none"
          type="file"
        />
        <div class="btnBox">
          <div @click="uploadInputRef.click()" class="editBtn">修改头像</div>
        </div> -->
      </div>
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
} from "vue";
import area_codes from "@/static/city";
import { InitData } from "@/types/UserInfo/UserInfoEdit";
import { editInfo } from "@/network/UserInfo/UserEditInfo";
import { getUserDetail } from "@/network/LoginDialog/loginDialog";
import { ElNotification } from "element-plus";
import avatarUpload from "@/components/private/avatarUpload.vue";
import axios from "axios";
import bus from "vue3-eventbus";
import zhcn from "element-plus/lib/locale/lang/zh-cn";
let local = zhcn;

export default defineComponent({
  name: "UserInfoEdit",
  components: {
    avatarUpload
  },
  setup() {
    const _this: any = getCurrentInstance();
    const data = reactive(new InitData());

    const uploadImage = async () => {
      const res = await axios({
        method: "post",
        url: `http://localhost:3000/avatar/upload?cookie=${localStorage.getItem(
          "cookie"
        )}&imgSize=${data.tempInfo.imageWidth}&timestamp=${Date.now()}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data.tempInfo.imgForm,
      });
      refreshData();
      ElNotification({
        message: "修改信息成功",
        type: "success",
        customClass: "darkNotice",
      });
      data.tempInfo.imgForm = null;
    };

    const uploadChange = (e: any, w: number) => {
      data.tempInfo.imgForm = e
      data.tempInfo.imageWidth = w
    };
    // 刷新数据
    const refreshData = () => {
      getUserDetail({
        uid: parseInt(
          decodeURIComponent(window.atob(localStorage.getItem("id") as string))
        ),
      }).then((res: any) => {
        localStorage.setItem(
          "data",
          window.btoa(
            window.encodeURIComponent(JSON.stringify(res.data.profile))
          )
        );
        setData();
        bus.emit("loginStatus");
      });
    };
    // 地区选择回调
    const optionClick = (type: string, item: any, i: number) => {
      if (type == "city") {
        data.tempInfo.cCode = item.code;
      } else {
        data.tempInfo.pCode = item.code;
        data.tempInfo.cCode = "";
        data.tempInfo.city = "";
        data.pIndex = i;
      }
    };
    // 设置默认数据
    const setData = () => {
      data.userInfo = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("data") as string))
      );
      data.tempInfo.nickname = data.userInfo.nickname;
      data.tempInfo.signature = data.userInfo.signature;
      data.tempInfo.gender = data.userInfo.gender.toString();
      data.tempInfo.birthday = data.userInfo.birthday;
      data.tempInfo.avatarUrl = data.userInfo.avatarUrl;
      getCity();
    };
    // 获取城市
    const getCity = () => {
      for (const [index, item] of area_codes.entries()) {
        if (item.code == data.userInfo.province) {
          data.pIndex = index;
          data.tempInfo.province = item.name;
          data.tempInfo.pCode = item.code;
          for (const city of item.children) {
            if (city.code == data.userInfo.city) {
              data.tempInfo.city = city.name;
              data.tempInfo.cCode = city.code;
              return;
            }
          }
        }
      }
    };
    setData();
    // 提交信息
    const submitInfo = () => {
      editInfo({
        gender: data.tempInfo.gender,
        birthday: new Date(data.tempInfo.birthday).valueOf(),
        nickname: data.tempInfo.nickname,
        province: data.tempInfo.pCode as number,
        city: data.tempInfo.cCode as number,
        signature: data.tempInfo.signature,
      }).then((res: any) => {
        if (res.data.code == 200) {
          if (data.tempInfo.imgForm) {
            uploadImage();
          } else {
            refreshData();
            ElNotification({
              message: "修改信息成功",
              type: "success",
              customClass: "darkNotice",
            });
          }
        } else {
          ElNotification({
            message: "修改信息失败",
            type: "error",
            customClass: "darkNotice",
          });
        }
      });
    };

    onMounted(() => {});
    return {
      ...toRefs(data),
      optionClick,
      submitInfo,
      uploadChange,
      local,
      area_codes,
    };
  },
});
</script>

<style lang='less'>
.selectPopoverClass {
  padding: 0 !important;
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: #404040;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__empty {
    background-color: #404040;
  }
}
.calendarPopoverClass {
  background-color: #383838 !important;
  .el-popper__arrow::before {
    background: #383838 !important;
  }
  .el-picker-panel__body {
    background-color: #383838 !important;
    .el-picker-panel__icon-btn {
      color: #c4c4c4 !important;
    }
    .el-date-table th {
      color: #c4c4c4 !important;
      border-bottom: 1px solid #5f5f5f !important;
    }
    .el-date-table td.today .el-date-table-cell__text {
      color: @themeColor !important;
    }
    .el-date-table td.available:hover {
      color: @themeColor !important;
    }
    .el-date-table td.current:not(.disabled) .el-date-table-cell__text {
      background: @themeColor !important;
    }
    .el-date-picker__header-label:hover {
      color: @themeColor !important;
    }
    .el-year-table td .cell:hover {
      color: @themeColor !important;
    }
    .el-year-table td.today .cell {
      color: @themeColor !important;
    }
    .el-month-table td .cell:hover {
      color: @themeColor !important;
    }
    .el-month-table td.current:not(.disabled) .cell {
      color: @themeColor !important;
    }
  }
}
#UserInfoEdit {
  padding: 40px;
  .title {
    font-weight: bold;
    font-size: 18px;
  }
  .userData {
    display: flex;
    margin-top: 25px;
    .leftInfo {
      width: 500px;
      .itemInfo {
        display: flex;
        font-size: 14px;
        margin-bottom: 15px;
        .itemTitle {
          display: flex;
          font-size: 13px;
          margin-top: 6px;
          font-weight: bold;
        }
        .itemInput {
          border-radius: 6px;
          margin-left: 15px;
          flex: 1;
          padding: 7px 15px;
          background-color: #484848;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            padding: 0;
            background: transparent;
            border: 0;
            outline: none;
            color: #fff;
          }
          textarea {
            width: 100%;
            padding: 0;
            background: transparent;
            border: 0;
            outline: none;
            resize: none;
            height: 80px;
            color: #fff;
          }
        }
        .el-select .el-input__wrapper.is-focus {
          box-shadow: 0 0 0 1px @themeColor inset !important;
        }
        .el-select .el-input.is-focus .el-input__wrapper {
          box-shadow: 0 0 0 1px @themeColor inset !important;
        }
        .el-input__wrapper {
          background: #484848;
          box-shadow: 0 0 0 0 transparent;
          font-size: 13px !important;
        }
        .el-input__inner {
          color: #fff;
        }
        .el-radio__inner {
          background-color: transparent;
          border: 1px solid #717171 !important;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: @themeColor !important;
        }
        /* 选中后小圆点的颜色 */
        .el-radio__input.is-checked .el-radio__inner {
          background: @themeColor !important;
          border-color: @themeColor !important;
        }
      }
      .saveContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .saveBtn {
          text-indent: 15px;
          letter-spacing: 15px;
          font-weight: bold;
          padding: 8px 10px;
          color: #fff;
          background-color: @themeColor;
          border-radius: 30px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background-color: @hoverTColor;
          }
        }
      }
    }
    .rightImg {
      margin-left: 50px;
    }
  }
}
</style>