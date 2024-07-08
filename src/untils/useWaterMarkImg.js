CanvasRenderingContext2D.prototype.fillTextWithSpacing = function (
  text,
  x,
  y,
  spacing = 0,
) {
  // 如果间距为0，则不用对每个字符单独渲染以节省性能
  if (spacing === 0) {
    this.fillText(text, x, y);
    return;
  }

  let totalWidth = 0; // 已渲染字符所占用的宽度
  // 对每个字符单独渲染
  for (let i = 0; i < text.length; i++) {
    this.fillText(text[i], totalWidth, y);
    //累计已占用宽度
    totalWidth += this.measureText(text[i]).width + spacing;
  }
};

const useWaterMarkImg = (props = {}) => {
  //创建画布
  const canvas = document.createElement('canvas');
  //获取物理像素和css像素率比
  const devicePixelRatio = window.devicePixelRatio || 1;
  //获取字体、字体大小
  const fontSize = Number(props.fontSize || 12) * devicePixelRatio;
  const fontFamily = props.fontFamily || 'serif';
  const font = `${fontSize}px ${fontFamily}`;
  const text = props.text || 'WaterMark';
  //创建画板
  const ctx = canvas.getContext('2d');
  //获取文本长度
  const { width } = ctx.measureText(text);
  const canvasGap = (props.gap || 10) * devicePixelRatio;
  const canvasSize = Math.max(100, width) + canvasGap;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((Math.PI / 180) * (props.rotate || -45));
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  //   ctx.fillText(text, 0, 0);
  ctx.fillTextWithSpacing(text, 0, 0, props.textSpace || 1);
  return {
    base64: canvas.toDataURL(),
    size: canvasSize / devicePixelRatio,
  };
};

export default useWaterMarkImg;
