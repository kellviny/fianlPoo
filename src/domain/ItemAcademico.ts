/**
 * 3.2.1 Classe Base Abstrata: ItemAcademico
 * Representa qualquer registro armazenado dentro de um Workspace de disciplina.
 *
 * Regra de Arquitetura: 100% isolada de elementos visuais (DOM/HTML/LocalStorage).
 */
export abstract class ItemAcademico {
  protected readonly id: string;
  protected titulo: string;
  protected descricao: string;
  protected readonly dataCriacao: Date;
  protected readonly workspaceId: string;

  constructor(
    id: string,
    titulo: string,
    descricao: string,
    workspaceId: string,
    dataCriacao: Date = new Date()
  ) {
    this.validarTextoObrigatorio(id, "ID do item");
    this.validarTextoObrigatorio(titulo, "Título");
    this.validarTextoObrigatorio(workspaceId, "ID do Workspace");

    this.id = id.trim();
    this.titulo = titulo.trim();
    this.descricao = descricao.trim();
    this.workspaceId = workspaceId.trim();
    this.dataCriacao = dataCriacao;
  }

  /**
   * Valida invariantes de textos obrigatórios (não podem ser vazios ou apenas espaços).
   */
  protected validarTextoObrigatorio(valor: string, nomeCampo: string): void {
    if (!valor || valor.trim().length === 0) {
      throw new Error(`O campo '${nomeCampo}' é obrigatório e não pode ser vazio.`);
    }
  }

  public getId(): string {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getDataCriacao(): Date {
    return new Date(this.dataCriacao.getTime());
  }

  public getWorkspaceId(): string {
    return this.workspaceId;
  }

  public obterResumoBasico(): string {
    return `[${this.obterCategoria()}] ${this.titulo}`;
  }

  /**
   * Retorna a categoria textual do item
   * (ex.: "Atividade Prática", "Trabalho em Grupo" ou "Lembrete").
   */
  public abstract obterCategoria(): string;

  /**
   * Indica se o item representa uma obrigação que ainda requer ação do aluno.
   */
  public abstract estaPendente(): boolean;

  /**
   * Retorna um texto resumido e amigável formatado para apresentação.
   */
  public abstract obterExibicaoFormatada(): string;
}
