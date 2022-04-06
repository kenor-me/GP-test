import { TEatObj } from '../types';

export const getWhoEatPizza = (arr: Array<TEatObj>): TEatObj[] => arr.filter((el) => el.eatsPizza);
