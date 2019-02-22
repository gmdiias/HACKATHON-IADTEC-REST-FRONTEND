import { Pais } from '../pais/pais.model';

export class Estado {
  id = -1;
  version = 0;
  dataCriacao = 0;
  nome = '';
  uf = '';
  pais: Pais;
}
