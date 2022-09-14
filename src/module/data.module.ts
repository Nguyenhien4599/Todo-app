export interface IData {
  id: number;
  date: string;
  description: string;
  title: string;
  piority: string;
}

export enum EFormAddAndUpdateMode {
  add = "add",
  update = "update",
}

export enum EValueoptionsPiority {
  low = "low",
  normal = "normal",
  high = "high",
}
