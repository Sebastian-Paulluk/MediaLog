import { CategoryTypes, ItemTypes } from "../types/types";


export const sortByName = (a: ItemTypes | CategoryTypes, b: ItemTypes | CategoryTypes)=> {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1; 
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1; 
    }
    return 0; 
}