<template>
  <div class="login" :style="{ height: scrollerHight }">
    <div class="header">
      您需要登录才能继续访问
      <span @click="$router.push('/home')">关闭</span>
    </div>

    <div class="content">
      <div class="logo"></div>

      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          left-icon="manager"
          placeholder="请输入登录用户名"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="lock"
          placeholder="请输入登录密码"
        />
        <div class="toRegister">
          <span @click="$router.push('/register')">免费注册</span>
        </div>
        <div class="submit-btn">
          <van-button round block type="info" native-type="submit">
            登录
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
        {{ this.popup_text }}</van-popup
      >
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      show: false,
      popup_text: "",
    };
  },

  methods: {
    //提示框显示
    showPopup() {
      this.show = true;
    },
    //提示框关闭
    close() {
      this.show = false;
    },
//登录按钮
    onSubmit(values) {
      if (this.username != "" && this.password != "") {

        this.axios
          .post("/login", values)
          .then((response) => {
            if (response.data.msg == 'success') {
              console.log(response.data.username);
              this.popup_text = "登录成功！";
              this.showPopup();
              setTimeout(() => {
                this.close();
                this.$router.push("/mine");
              }, 1000);
              this.$store.commit('saveLogin');
              this.$store.commit('currentUser',{id:response.data.id,username:response.data.username})
            } else if(response.data.msg == 'fail') {

              this.popup_text = "用户名或密码错误！";
              this.showPopup();
              setTimeout(() => {
                this.close();
              }, 1000);
            }

          })
          .catch((error) => {
            console.log(error);
          });
      
      } else {
        this.popup_text = "请输入用户名和密码！";
        this.showPopup();
        setTimeout(() => {
          this.close();
        }, 1000);
      }
    },
  },

  computed: {
    scrollerHight() {
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
    background: url('/src/assets/img/home_imgs/logo.png') no-repeat;
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
  text-align: center;
  width: 160px;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  color: #fff;
}
</style>
