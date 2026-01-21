//创建一个通用类来处理每个不同input的处理状况
/**
 * 用户登录和注册的表单项验证的通用代码
 * 对某一个表单项进行验证的构造函数
 * 获取选择表单的dom
 */

class FieldValidator {
  constructor(inputdom, validatorFunc) {
    this.input = $("txt" + inputdom); //指定的类
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.addEventListener("blur", () => {
      this.validator();
    });
  }
  //注册一个函数帮我处理用户信息
  async validator() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  //把账号上传到服务器 成功
  static async postClient(obj) {
    const result = await API.reg(obj);
    return result;
  }
  // 求一个静态方法 把所有的 input存起来 然后 如果全都是正确的 则提交正确
  static async validator(...data) {
    data = data.map((item) => item.validator());
    const result = await Promise.all(data);
    return result.every(Boolean);
  }
}
