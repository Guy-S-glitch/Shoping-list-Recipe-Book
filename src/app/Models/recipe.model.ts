import { ingredients } from './ingredients.model';

export class recipeModel {
  constructor(
    private Name: string,
    private Description: string,
    private PicturePath: string,
    private Ingredients: ingredients[]
  ) {}
  public GetName = () => {
    return this.Name;
  };
  public GetDescription = () => {
    return this.Description;
  };
  public GetPicturePath = () => {
    return this.PicturePath;
  };
  public GetIngrediets = () => {
    return this.Ingredients;
  };
}
