---
group:
  title: WaterMark 水印
order: 6
---

**基本使用**

```tsx
import React from 'react';
import { WaterMark } from 'xiaowin-ui';

export default () => (
  <WaterMark gap={20}>
    <div style={{ width: '100%', height: '300px' }}></div>
  </WaterMark>
);
```

**API**

水印属性。

| 属性       | 说明           | 类型   | 默认值         |
| ---------- | -------------- | ------ | -------------- |
| gap        | 水印之间间隔   | number | 10             |
| rotate     | 水印旋转角度   | number | -45            |
| sizeWidth  | 单个水印的宽度 | number | `水印文字宽度` |
| sizeHeight | 单个水印的高度 | number | `水印文字宽度` |
| fontSize   | 水印字体大小   | number | 12             |
| fontFamily | 水印字体       | string | `serif`        |
