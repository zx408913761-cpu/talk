//此页面是否有存在登录账号
// TOKEN_KEY
(async () => {
  async function configToken() {
    const result = await API.profile();
    const data = result.data;
    if (!data) {
      alert(result.msg);
      location.href = "login.html";
      return;
    }

    //设置样式
    setUserInfo(data.loginId, data.nickname);
  }
  //拿到各种的dom
  const doms = {
    aside: {
      name: $$$(".aside-name"),
      account: $$$(".aside-account"),
    },
    container: $$$(".chat-container"),
    msgContainer: $$$(".msg-container"),
    txtmsg: $("txtMsg"),
  };
  //设置样式
  function setUserInfo(loginId, nickname) {
    doms.aside.name.innerText = nickname;
    doms.aside.account.innerText = loginId;
  }
  //关闭页面
  function close() {
    const closeBtn = $$$(".close");
    closeBtn.addEventListener("click", function (e) {
      API.loginOut();
      location.href = "login.html";
    });
  }
  //获取当前账号里所有聊天信息 有的话 然后全部渲染
  async function getChatHistory() {
    const history = await API.history();
    if (history.code === 0) {
      //拿到所有的聊天记录
      const data = history.data;
      for (const item of data) {
        addChat(item);
      }
      setScrollBottom();
    }
  }
  //先弄个日期函数利用时间戳搞出时间
  function getTimeFormat(stamp) {
    const time = new Date(stamp);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  //添加聊天

  function addChat(chatInfo) {
    const div = creaElm("div"); //创建聊天框
    const img = creaElm("img"); //创建imgdom
    const chat = creaElm("div");
    const chatDate = creaElm("div");
    div.classList.add("chat-item");
    chatInfo.from && div.classList.add("me");
    img.classList.add("chat-avatar");
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    chat.classList.add("chat-content");
    chatDate.classList.add("chat-date");
    chat.innerText = chatInfo.content;
    chatDate.innerText = getTimeFormat(chatInfo.createdAt);
    div.appendChild(img);
    div.appendChild(chat);
    div.appendChild(chatDate);
    doms.container.appendChild(div);
  }
  function setScrollBottom() {
    doms.container.scrollTop = doms.container.scrollHeight;
  }
  // 发送短信
  function sandCHat() {
    //点击事件发送
    doms.msgContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      const content = doms.txtmsg.value;
      doms.txtmsg.value = "";
      addChat({
        from: doms.aside.account,
        to: null,
        content,
        createdAt: Date.now(),
      });
      //{ from: 'haha',
      //  to: null,
      // content: 'my name is  qiaqia，kla，kla，qia qia qia',
      //  createdAt: 1652347192389}
      API.sandChar(content).then((resp) => {
        console.log(resp);
        addChat({
          from: null,
          to: doms.aside.account,
          content: resp.data.content,
          createdAt: resp.data.createdAt,
        });
      });
    });
  }
  getChatHistory();
  configToken();
  close();
  sandCHat();
})();
