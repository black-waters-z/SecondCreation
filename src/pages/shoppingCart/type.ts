export interface goodChoiceAdd {
  id: number;
  name: string;
  choices: {
    id: number;
    name: string;
    price: number;
    buyNum: number;
  }[];
}
