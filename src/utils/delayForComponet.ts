// 添加一个固定的延迟时间，以便你可以看到加载状态
export default function delayForComponet(promise: Promise<any>, delay: number = 2000) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  }).then(() => promise);
}
