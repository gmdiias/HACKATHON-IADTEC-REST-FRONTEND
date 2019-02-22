import { Estado } from '../estado/estado.model';

export class Cliente {
  id = -1;
  version = 0;
  dataCriacao = 0;
  nome = '';
  cpf = '';
  dataNascimento = 0;
  email = '';
  situacao: 'ATIVO' | 'INATIVO' | 'REMOVIDO' = 'ATIVO';
  estado: Estado = new Estado();
}
