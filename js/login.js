const login = new FieldValidator("LoginId", (val) => {
  if (!val) return "账号不能为空";
});

const loginPwd = new FieldValidator("LoginPwd", (val) => {
  if (!val) return "密码不能为空";
});
//处理密码状状态的函数
// function setPwdStatus() {
//   if (!login.input.value.trim()) {
//     loginPwd.input.disabled = true;
//     loginPwd.input.style = "cursor: no-drop";
//   }
//   const from = $$$(".user-form");
//   from.addEventListener("mouseover", (e) => {
//     const hasName = login.input.value.trim();
//     loginPwd.input.disabled = !hasName;
//     loginPwd.input.style.cursor = hasName ? "auto" : "not-drop";
//   });

// }
// setPwdStatus();
// //给一个函数帮我处理每个不同的错误形式
// function getinfo(info) {
//   if (!login.input.value.trim() && !loginPwd.input.value.trim()) {
//     login.p.innerText = "账号不能为空";
//     loginPwd.p.innerText = "密码不能为空";
//     return false;
//   }

//   if (info.msg === "loginPwd: should not be empty") {
//     loginPwd.p.innerText = "密码不能为空";

//     return false;
//   } else if (info.msg === "login: should not be empty") {
//     login.p.innerText = "账号不能为空";
//     return;
//   } else if (info.msg === "账号或密码错误") {
//     $$$(".loginerr").innerText = info.msg;
//     return false;
//   } else {
//     return true;
//   }
// }
const from = document.querySelector(".user-form");
from.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validator(login, loginPwd);
  if (!result) {
    //验证没通过
    return;
  }
  const formData = new FormData(from);
  const data = Object.fromEntries(formData);
  //判断账号
  const resp = await API.login(data);
  if (resp.code === 0) {
    location.href = "talk/index.html";
  }
};
