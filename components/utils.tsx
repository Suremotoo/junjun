export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const mockSleep = async () => {
  await sleep(1000);
  console.log(1);
  await sleep(1000);
  console.log(2);
  await sleep(1000);
  console.log(3);
};

export function convertToPlainObject<T>(instance: T): Record<string, any> {
  const plainObject: Record<string, any> = {};

  // 获取类的所有属性名称
  const propertyNames = Object.getOwnPropertyNames(instance);

  // 遍历属性，将属性名和属性值添加到纯粹的数据对象中
  for (const propertyName of propertyNames) {
    plainObject[propertyName] = instance[propertyName];
  }

  return plainObject;
}

const colors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "default",
];
let colorIndex = 0;

export function getColorForElement(): string {
  colorIndex == 100 ? (colorIndex = 0) : colorIndex;
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
}

export function randomString(len?: number) {
  len = len || 32;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxLen = $chars.length;
  var str = "";
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxLen));
  }
  return str;
}
