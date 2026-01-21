const TOKEN_KEY = "token";
const API = (() => {
  const BASE_URL = "https://study.duyiedu.com/";

  // 开两个通用函数 获取请求头
  function getHeards(dataArr) {
    const heards = {};
    if (dataArr) {
      for (const data of dataArr) {
        heards[data[0]] = data[1];
      }
    }

    return heards;
  }
  function get(path) {
    const token = localStorage.getItem(TOKEN_KEY);

    const headers = token
      ? getHeards([["authorization", `Bearer ${token}`]])
      : getHeards();

    return fetch(BASE_URL + path, { headers });
  }
  function post(path, bodyObj) {
    const headers = getHeards([["Content-Type", "application/json"]]);
    const token = localStorage.getItem(TOKEN_KEY);
    token && (headers.authorization = `Bearer ${token}`);
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }
  //注册接口封装
  async function reg(userInfo) {
    const info = await post("user/reg", userInfo);
    return await info.json();
  }
  //封装登录方法
  async function login(loginInfo) {
    const resp = await post("api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      // 登录成功
      // 将响应头中的token保存起来（localStorage）
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }
  //封装获取验证方法
  async function profile() {
    const result = await get("api/user/profile");
    return await result.json();
  }
  //判断账号是否存在
  async function exists(loginId) {
    const info = await get("user/exists?loginId=" + loginId);
    return await info.json();
  }
  //调用聊天接口
  async function sandChar(content) {
    const info = await post("api/chat", { content });
    return await info.json();
  }
  //获取聊天记录
  async function history() {
    const resp = await get("api/chat/history");
    return await resp.json();
  }
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    post,
    reg,
    login,
    profile,
    exists,
    sandChar,
    history,
    loginOut,
  };
})();
