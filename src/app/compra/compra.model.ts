import { Cliente } from '../cliente/cliente.model';
import { ProdutoCompra } from './produtocompra.model';

export class Compra {
  id = -1;
  version = 0;
  dataCriacao = 0;
  cliente: Cliente = new Cliente();
  itens: ProdutoCompra[] = [];
}
