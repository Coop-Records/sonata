export const regularFont = fetch(
  new URL('/public/assets/HelveticaNeueMedium.ttf', import.meta.url),
).then((res) => res.arrayBuffer());
export const boldFont = fetch(
  new URL('/public/assets/HelveticaNeueBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());
