import { ITEM } from "shared/types/modal";

export const randomItem = (items: Array<ITEM>): ITEM => {
  const _items = [...items].filter((item) => item.ratio > 0);

  if (_items.length === 0) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  const totalPercent = _items.reduce((item, { ratio }) => item + ratio, 0);

  const randomValue = Math.random() * totalPercent;
  let accumulator = 0;

  for (let i = 0; i < _items.length; i++) {
    accumulator += _items[i].ratio;
    if (accumulator >= randomValue) {
      return _items[i];
    }
  }

  return _items.reduce(
    (max, obj) => (obj.ratio > max.ratio ? obj : max),
    _items[0]
  );
};
