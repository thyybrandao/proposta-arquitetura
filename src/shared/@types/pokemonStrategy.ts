export interface IPokemonStrategy {
  findAll(): Promise<any>;
  findOne(id:number): Promise<any>;
}
