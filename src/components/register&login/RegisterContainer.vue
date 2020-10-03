<template>
  <div class="login" :style="{ height: scrollerWidth }">
    <div class="header">
      欢迎注册
      <span @click="$router.push('/mine')">关闭</span>
    </div>

    <div class="content">
      <div class="logo"></div>

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          left-icon="manager"
          placeholder="请输入您的用户名"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="lock"
          placeholder="请输入您的密码"
        />
        <div class="toRegister">
          <span @click="$router.push('/login')">已有账号？去登录</span>
        </div>
        <div class="submit-btn">
          <van-button round block type="info" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
      <van-popup v-model="show">
        <van-icon
          name="close"
          size="30px"
          color="#000"
          class="close"
          @click="close"
        />
        {{popup_text}}</van-popup
      >
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      show: false,//弹出框显示隐藏
      popup_text: ''
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    },
    close() {
      this.show = false;
    },

    onSubmit(values) {
      if (this.username != "" && this.password != "") {
        console.log("submit", values);
        axios
          .post("http://localhost:3001/register", values)
          .then((response) => {
           if(response.data.flag == 1){
             this.popup_text = '恭喜您注册成功！';
             this.showPopup();
             setTimeout(()=>{
               this.close();
             },1000)

           }else if(response.data.flag == 3){
              this.popup_text = '用户名已存在！';
             this.showPopup();
           }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.popup_text = '请输入账号和密码';
        this.showPopup();
      }
    },
  },

  computed: {
    scrollerWidth() {
      return window.innerHeight + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  z-index: 9999;
  background-color: #fff;
  //头部header
  .header {
    height: 52px;
    line-height: 52px;
    background-color: #eeeeee;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    span {
      position: absolute;
      right: 20px;
      color: #999999;
    }
  }

  //登陆表单
  .logo {
    background: url(http://127.0.0.1:3000/src/img/home_imgs/logo.png) no-repeat;
    background-size: contain;
    width: 80px;
    height: 80px;
    margin: 5px auto 0;
  }
  .van-field {
    margin-top: 30px;
  }

  .toRegister {
    padding: 20px 0 30px 0;
    font-size: 14px;
    color: #555;
    text-align: right;
  }
  .submit-btn .van-button {
    background-image: -webkit-linear-gradient(right, #ff5000 0%, #ff8400 100%);
    border: none;
  }
  .van-form {
    padding: 0 10px;
  }

  //遮罩层修改
  .close {
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>
<style>
.van-overlay {
  background-color: transparent;
}
.van-popup--center {
  width: 160px;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  color: #fff;
  text-align: center;
}
</style>
