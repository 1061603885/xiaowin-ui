/*
 * @Descripttion: Bernard
 * @Author: xiaowin
 * @Date: 2021-11-29 17:04:30
 * @LastEditors: guoqiang
 * @LastEditTime: 2022-02-15 16:17:55
 * @Copyright:  ©云粒智慧科技有限公司 All rights reserved
 */
import React, { useRef, useEffect } from 'react';
import useWaterMarkImg from '../../untils/useWaterMarkImg.js';
import './index.scss';

export default ({
  text = 'WaterMark',
  children,
  ...props
}: {
  text: String;
  children: any;
}) => {
  const divRef = useRef(null);
  const bg = useWaterMarkImg({ text, ...props });
  let div: any;
  const resetWaterMark = () => {
    if (!divRef.current) return;
    if (div) {
      div.remove();
    }
    const { base64, size } = bg;
    div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.backgroundImage = `url(${base64})`;
    div.style.backgroundSize = `${props.sizeWidth || size}px ${
      props.sizeHeight || size
    }px`;
    div.style.backgroundRepeat = 'repeat';
    div.style.zIndex = '9999';
    div.style.inset = '0';
    divRef.current.appendChild(div);
    // console.log(divRef.current, 'divRef.current');
  };

  useEffect(() => {
    console.log(children, 'Children');
    resetWaterMark();
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((dom) => {
          if (dom == div) {
            // 如果删除元素为水印dom,重新生成水印
            console.log(dom, '删除dom');

            resetWaterMark();
          }
        });

        // 如果修改元素为水印父级,重新生成水印
        if (mutation.target == div) {
          console.log(divRef.current, '修改ref');
          resetWaterMark();
        }
      });
    });
    observer.observe(divRef.current, {
      attributes: true, // 布尔值，默认为 false。设置为 true 时，表示观察目标节点的属性变化。
      childList: true, //布尔值，默认为 false。设置为 true 时，表示观察目标节点的子节点列表的变化，包括添加或删除子节点。
      characterData: true, // 布尔值，默认为 false。设置为 true 时，表示观察目标节点文本内容的变化
      subtree: true, // 布尔值，默认为 false。设置为 true 时，表示观察目标节点以及其所有后代节点的变化。
      attributeOldValue: true, // 布尔值，默认为 false。如果设置为 true，则在回调函数的 MutationRecord 对象中包含被修改属性的旧值。
    });
  }, []);
  // let style = {
  //   marginLeft: -gutter / 2,
  //   marginRight: -gutter / 2,
  // };
  return (
    <div className="xiaowin-water_mark" ref={divRef}>
      {React.Children.map(children, (child) => {
        // console.log(child, divRef, 'children');
        return React.cloneElement(child);
      })}
    </div>
  );
};
