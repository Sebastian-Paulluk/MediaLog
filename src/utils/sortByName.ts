import { CategoryTypes, FolderTypes, ItemTypes } from "../types/types";


export const sortByName = (
    a: ItemTypes | CategoryTypes | FolderTypes,
    b: ItemTypes | CategoryTypes | FolderTypes
  ) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1; 
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1; 
    }
    return 0; 
}