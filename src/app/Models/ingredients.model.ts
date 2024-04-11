export class ingredients {
  constructor(private Name: string, private Amount: number) {}
  public GetName = () => {
    return this.Name;
  };
  public GetAmount = () => {
    return this.Amount;
  };
}
