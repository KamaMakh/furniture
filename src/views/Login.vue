<template>
  <form>
    <div class="login">
      <div class="login__item">
        <input type="email" name="email" :placeholder="$t('email')">
      </div>
      <div class="login__item">
        <input type="password" name="password" :placeholder="$t('password')">
      </div>
      <div class="login__button">
        <button class="btn" type="button">
          {{ $t("registration") }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="scss">
$ffamily: "Tharlon", sans-serif;
.login {
  display: flex;
  flex-direction: column;
  &__item {
    input {
      border: none;
      background: none;
      border-bottom: 2px solid rgba(255, 255, 255, 0.72);
      width: 100%;
      margin-bottom: 70px;
      font-size: 19px;
      line-height: 28px;
      color: #fff;
      font-family: $ffamily;
      &::placeholder {
        color: #fff;
      }
      &:focus {
        outline: none;
      }
    }
    &:last-child {
      input {
        margin-bottom: 0;
      }
    }
  }
  &__button{
    margin-top: 40px;
    .btn {
      font-family: $ffamily;
      font-style: normal;
      font-weight: normal;
      font-size: 21px;
      line-height: 1;
      text-align: center;
      color: #fff;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border: none;
      background: #2AAD54;
      border-radius: 30px;
      padding: 11px 29px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background: #47bf6d;
      }
    }
  }
}
</style>
