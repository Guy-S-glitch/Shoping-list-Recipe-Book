export class recipeModel {
    private Name: string;
    private Description: string;
    private PicturePath: string;
    constructor(name: string, description: string, picturePath: string) {
        this.Name = name;
        this.Description = description;
        this.PicturePath = picturePath;
    }
    public GetName = () => { return this.Name; }
    public GetDescription = () => { return this.Description; }
    public GetPicturePath = () => { return this.PicturePath; }
}