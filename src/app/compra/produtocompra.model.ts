import { Produto } from '../produto/produto.model';

export class ProdutoCompra {
  id = -1;
  version = 0;
  dataCriacao = 0;
  produto: Produto = new Produto();
  quantidade = 1;
}
