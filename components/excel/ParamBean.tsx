export class ParamBean {
  private id: string;
  private name: string | JSX.Element;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }
  getName(): string | JSX.Element {
    return this.name;
  }
  setName(name: string | JSX.Element): void {
    this.name = name;
  }
  toString(): string {
    return `ParamBean{id='${this.id}', name='${this.name}'}`;
  }
}
