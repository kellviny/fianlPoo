import { ItemAcademico } from "./ItemAcademico";
import { ItemChecklist, OrigemAtividade } from "./types";

/**
 * 3.2.2 Subclasse Concreta: AtividadePratica
 * Representa atividades individuais a serem realizadas pelo aluno (passadas pelo
 * professor ou metas de autoestudo).
 */
export class AtividadePratica extends ItemAcademico {
  protected dataLimite: Date;
  protected concluida: boolean;
  protected dataConclusao?: Date;
  private readonly origem: OrigemAtividade;
  private readonly checklist: ItemChecklist[];
  private linkEntrega?: string;

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    workspaceId: string,
    dataLimite: Date,
    origem: OrigemAtividade = "PROFESSOR",
    checklist: ItemChecklist[] = [],
    linkEntrega?: string,
    concluida: boolean = false,
    dataConclusao?: Date,
    dataCriacao: Date = new Date()
  ) {
    super(id, titulo, descricao, workspaceId, dataCriacao);
    this.dataLimite = dataLimite;
    this.origem = origem;
    this.checklist = checklist.map((item) => ({ ...item }));
    this.linkEntrega = linkEntrega;
    this.concluida = concluida;
    this.dataConclusao = dataConclusao;
  }

  public obterCategoria(): string {
    return "Atividade Prática";
  }

  public estaPendente(): boolean {
    return !this.concluida;
  }

  public obterExibicaoFormatada(): string {
    // TODO (Colaborador): Aprimorar formatação amigável com prazo e status
    const status = this.concluida ? "Concluída" : "Pendente";
    return `[${this.obterCategoria()} - ${this.origem}] ${this.titulo} (${status})`;
  }

  public marcarComoConcluida(): void {
    // TODO (Colaborador): Validar regras adicionais de conclusão se necessário
    this.concluida = true;
    this.dataConclusao = new Date();
  }

  public verificarSeAtrasada(): boolean {
    // TODO (Colaborador): Comparar data atual com dataLimite quando estaPendente() === true
    if (!this.estaPendente()) {
      return false;
    }
    return new Date().getTime() > this.dataLimite.getTime();
  }

  public calcularDiasRestantes(): number {
    // TODO (Colaborador): Refinar cálculo de dias até dataLimite
    const diffMs = this.dataLimite.getTime() - new Date().getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  public getDataLimite(): Date {
    return new Date(this.dataLimite.getTime());
  }

  public isConcluida(): boolean {
    return this.concluida;
  }

  public getDataConclusao(): Date | undefined {
    return this.dataConclusao ? new Date(this.dataConclusao.getTime()) : undefined;
  }

  public getOrigem(): OrigemAtividade {
    return this.origem;
  }

  public getChecklist(): ReadonlyArray<ItemChecklist> {
    return this.checklist.map((item) => ({ ...item }));
  }

  public getLinkEntrega(): string | undefined {
    return this.linkEntrega;
  }
}
