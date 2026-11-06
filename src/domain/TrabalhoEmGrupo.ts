import { AtividadePratica } from "./AtividadePratica";
import { EtapaTrabalho, ItemChecklist, OrigemAtividade } from "./types";

/**
 * 3.2.3 Subclasse Concreta: TrabalhoEmGrupo
 * Representa atividades acadêmicas desenvolvidas em equipe (seminários, projetos ou relatórios).
 * Herda atributos e prazos de uma atividade (dataLimite, concluida, dataConclusao).
 */
export class TrabalhoEmGrupo extends AtividadePratica {
  private readonly colegasDeEquipe: string[];
  private readonly papelDoAluno: string;
  private readonly etapas: EtapaTrabalho[];

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    workspaceId: string,
    dataLimite: Date,
    colegasDeEquipe: string[],
    papelDoAluno: string,
    etapas: EtapaTrabalho[] = [],
    origem: OrigemAtividade = "PROFESSOR",
    checklist: ItemChecklist[] = [],
    linkEntrega?: string,
    concluida: boolean = false,
    dataConclusao?: Date,
    dataCriacao: Date = new Date()
  ) {
    super(
      id,
      titulo,
      descricao,
      workspaceId,
      dataLimite,
      origem,
      checklist,
      linkEntrega,
      concluida,
      dataConclusao,
      dataCriacao
    );
    this.validarTextoObrigatorio(papelDoAluno, "Papel do Aluno");
    this.colegasDeEquipe = [...colegasDeEquipe];
    this.papelDoAluno = papelDoAluno.trim();
    this.etapas = etapas.map((etapa) => ({ ...etapa }));
  }

  public override obterCategoria(): string {
    return "Trabalho em Grupo";
  }

  public override estaPendente(): boolean {
    // TODO (Colaborador): Retornar true enquanto o trabalho não estiver 100% finalizado
    return !this.concluida;
  }

  public override obterExibicaoFormatada(): string {
    // TODO (Colaborador): Incluir progresso percentual da equipe e papel do aluno
    return `[${this.obterCategoria()}] ${this.titulo} — Papel: ${this.papelDoAluno} (${this.calcularProgressoPercentual()}%)`;
  }

  public marcarEtapaComoEntregue(indice: number): void {
    // TODO (Colaborador): Validar índice, marcar etapa e verificar conclusão automática de 100%
    if (indice < 0 || indice >= this.etapas.length) {
      throw new Error("Índice de etapa inválido.");
    }
    this.etapas[indice].entregue = true;
  }

  public calcularProgressoPercentual(): number {
    // TODO (Colaborador): Calcular percentual de etapas entregues (ou 100% se concluida)
    if (this.concluida) {
      return 100;
    }
    if (this.etapas.length === 0) {
      return 0;
    }
    const entregues = this.etapas.filter((e) => e.entregue).length;
    return Math.round((entregues / this.etapas.length) * 100);
  }

  public getColegasDeEquipe(): ReadonlyArray<string> {
    return [...this.colegasDeEquipe];
  }

  public getPapelDoAluno(): string {
    return this.papelDoAluno;
  }

  public getEtapas(): ReadonlyArray<EtapaTrabalho> {
    return this.etapas.map((etapa) => ({ ...etapa }));
  }
}
