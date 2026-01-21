//建立一个方法 保存集合
function saveinfo() {
  const login = new FieldValidator("LoginId", async (val) => {
    if (!val) return "账号不能为空";
    const resp = await API.exists(val);
    if (resp.data) {
      return "账号已存在哦";
    }
  });
  //昵称 密码都不需要调用接口去验证
  const nickName = new FieldValidator("Nickname", (val) => {
    if (!val) return "昵称不能为空";
  });
  const LoginPwd = new FieldValidator("LoginPwd", (val) => {
    if (!val) return "密码不能为空";
  });
  const LoginPwdConfirm = new FieldValidator("LoginPwdConfirm", (val) => {
    if (!val) return "请再输入一次密码";
    else if (val !== LoginPwd.input.value) {
      return "密码不一致请再输入密码";
    }
  });
  const arr = [login, nickName, LoginPwd, LoginPwdConfirm];

  return arr;
}

const from = $$$(".user-form");
from.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await FieldValidator.validator(...saveinfo());
  if (!result) return alert("账号有误");
  let fromData = new FormData(from);
  fromData = Object.fromEntries(fromData.entries());
  console.log(fromData);
  const content = await FieldValidator.postClient(fromData);
  if (content.code === 0) {
    alert("注册成功");
    location.href = "login.html";
  }
});
