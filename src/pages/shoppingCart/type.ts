export interface goodChoiceAdd {
  id: number;
  goodName: string;
  choice: {
    id: number;
    choiceName: string;
    price: number;
    buyNum: number;
    choiceImg: string;
  };
  totalPrice?: number;
}
