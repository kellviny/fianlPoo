import { ItemAcademico } from "./ItemAcademico";

/**
 * 3.2.4 Subclasse Concreta: Lembrete
 * Representa anotações rápidas, avisos de sala de aula ou recados que não têm
 * entrega formal de trabalho.
 */
export class Lembrete extends ItemAcademico {
  private dataAviso?: Date;
  private fixado: boolean;
  private etiqueta: string;
  private arquivado: boolean;

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    workspaceId: string,
    etiqueta: string,
    fixado: boolean = false,
    dataAviso?: Date,
    arquivado: boolean = false,
    dataCriacao: Date = new Date()
  ) {
    super(id, titulo, descricao, workspaceId, dataCriacao);
    this.validarTextoObrigatorio(etiqueta, "Etiqueta");
    this.etiqueta = etiqueta.trim();
    this.fixado = fixado;
    this.dataAviso = dataAviso;
    this.arquivado = arquivado;
  }

  public obterCategoria(): string {
    return "Lembrete";
  }

  public estaPendente(): boolean {
    // Regra 3.2.4: Por padrão lembretes retornam false para pendência de entrega,
    // a menos que possuam dataAviso futura e o aluno os marque como não arquivados.
    if (this.dataAviso && !this.arquivado) {
      return this.dataAviso.getTime() > new Date().getTime();
    }
    return false;
  }

  public obterExibicaoFormatada(): string {
    // TODO (Colaborador): Formatar exibição amigável com etiqueta e status de fixado
    const iconeFixado = this.fixado ? "[FIXADO] " : "";
    return `${iconeFixado}[${this.obterCategoria()} • ${this.etiqueta}] ${this.titulo}`;
  }

  public alternarFixacao(): void {
    this.fixado = !this.fixado;
  }

  public arquivar(): void {
    this.arquivado = true;
  }

  public isFixado(): boolean {
    return this.fixado;
  }

  public getEtiqueta(): string {
    return this.etiqueta;
  }

  public getDataAviso(): Date | undefined {
    return this.dataAviso ? new Date(this.dataAviso.getTime()) : undefined;
  }
}
