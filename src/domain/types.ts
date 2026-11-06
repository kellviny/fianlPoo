/**
 * Origem de uma atividade prática:
 * - PROFESSOR: solicitada oficialmente em aula pelo docente.
 * - AUTOESTUDO: meta de estudo criada por iniciativa do próprio estudante.
 */
export type OrigemAtividade = "PROFESSOR" | "AUTOESTUDO";

/**
 * Representa um passo/subtarefa dentro do checklist de uma AtividadePratica.
 */
export interface ItemChecklist {
  descricao: string;
  feita: boolean;
}

/**
 * Representa uma etapa dividida entre integrantes de um TrabalhoEmGrupo.
 */
export interface EtapaTrabalho {
  titulo: string;
  responsavel: string;
  entregue: boolean;
}

/**
 * Tipos auxiliares para carga de dados iniciais (dados-iniciais.json) e LocalStorage.
 */
export type TipoItemSerializado = "ATIVIDADE_PRATICA" | "TRABALHO_GRUPO" | "LEMBRETE";

export interface ItemSerializado {
  id: string;
  tipo: TipoItemSerializado;
  titulo: string;
  descricao: string;
  dataCriacao: string;
  workspaceId: string;
  // Campos de AtividadePratica / TrabalhoEmGrupo
  dataLimite?: string;
  concluida?: boolean;
  dataConclusao?: string;
  origem?: OrigemAtividade;
  checklist?: ItemChecklist[];
  linkEntrega?: string;
  // Campos exclusivos de TrabalhoEmGrupo
  colegasDeEquipe?: string[];
  papelDoAluno?: string;
  etapas?: EtapaTrabalho[];
  // Campos exclusivos de Lembrete
  dataAviso?: string;
  fixado?: boolean;
  etiqueta?: string;
}

export interface WorkspaceSerializado {
  codigo: string;
  nome: string;
  professor: string;
  salaOuLink?: string;
  horario?: string;
  itens: ItemSerializado[];
}

export interface DadosIniciais {
  workspaces: WorkspaceSerializado[];
}
