// import "css-loader!../css/index.css";
import "../css/index.css";
import "../css/component.less";

import zznhImage from "../img/zznh.png";

function component() {
  const element = document.createElement("div");

  element.innerHTML = ["Hello", "Webpack"].join(" ");
  element.className = "content";

  // 创建一个img元素,设置src属性
  const imgEl = new Image();
  console.log(zznhImage)
  console.log(require("../img/zznh.png"))
  imgEl.src = require("../img/zznh.png");
  // imgEl.src = zznhImage;
  element.appendChild(imgEl);

  // 创建一个div, 设置背景图片
  const bgDivEl = document.createElement('div');
  bgDivEl.style.width = 200 + 'px';
  bgDivEl.style.height = 200 + 'px';
  bgDivEl.className = 'bg-image';
  bgDivEl.style.backgroundColor = "red";
  // bgDivEl.style.backgroundImage = require('../img/nhlt.jpg')
  element.appendChild(bgDivEl);

  let ic = document.createElement('i')
  // ic.innerHTML = "&#xe602;"
  ic.className = "iconfont icon-shanchu"
  element.appendChild(ic)

  return element;
}

document.body.appendChild(component());
