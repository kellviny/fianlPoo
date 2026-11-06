import { AtividadePratica } from "./AtividadePratica";
import { ItemAcademico } from "./ItemAcademico";
import { Lembrete } from "./Lembrete";
import { OrigemAtividade } from "./types";

/**
 * 3.1 Workspace de Disciplina
 * Espaço de trabalho isolado que compõe e gerencia a coleção polimórfica de
 * itens acadêmicos (atividades práticas, trabalhos em grupo e lembretes).
 */
export class Workspace {
  private readonly codigo: string;
  private nome: string;
  private professor: string;
  private salaOuLink?: string;
  private horario?: string;
  private readonly itens: ItemAcademico[] = [];

  constructor(
    codigo: string,
    nome: string,
    professor: string,
    salaOuLink?: string,
    horario?: string
  ) {
    if (!codigo || codigo.trim().length === 0) {
      throw new Error("O código da disciplina é obrigatório.");
    }
    if (!nome || nome.trim().length === 0) {
      throw new Error("O nome da disciplina é obrigatório.");
    }

    this.codigo = codigo.trim().toUpperCase();
    this.nome = nome.trim();
    this.professor = professor.trim();
    this.salaOuLink = salaOuLink?.trim();
    this.horario = horario?.trim();
  }

  public getCodigo(): string {
    return this.codigo;
  }

  public getNome(): string {
    return this.nome;
  }

  public getProfessor(): string {
    return this.professor;
  }

  public getSalaOuLink(): string | undefined {
    return this.salaOuLink;
  }

  public getHorario(): string | undefined {
    return this.horario;
  }

  public adicionarItem(item: ItemAcademico): void {
    // TODO (Colaborador): Validar duplicidade de ID e vínculo com workspaceId
    this.itens.push(item);
  }

  public buscarItemPorId(id: string): ItemAcademico | undefined {
    return this.itens.find((item) => item.getId() === id);
  }

  public removerItem(id: string): boolean {
    const indice = this.itens.findIndex((item) => item.getId() === id);
    if (indice === -1) {
      return false;
    }
    this.itens.splice(indice, 1);
    return true;
  }

  /**
   * Retorna cópia somente-leitura para preservar o encapsulamento da coleção.
   */
  public listarItens(): ReadonlyArray<ItemAcademico> {
    return [...this.itens];
  }

  public listarItensPendentes(): ItemAcademico[] {
    // Polimorfismo: chama estaPendente() sem checagem manual de tipo
    return this.itens.filter((item) => item.estaPendente());
  }

  public listarItensConcluidos(): ItemAcademico[] {
    // TODO (Colaborador): Filtrar atividades concluídas da disciplina
    return this.itens.filter((item) => !item.estaPendente());
  }

  public listarItensEmAtraso(): AtividadePratica[] {
    // TODO (Colaborador): Retornar atividades cujo prazo expirou e continuam pendentes
    return [];
  }

  public listarLembretesFixados(): Lembrete[] {
    // TODO (Colaborador): Filtrar lembretes fixados no topo do workspace
    return [];
  }

  public buscarPorTexto(termo: string): ItemAcademico[] {
    // TODO (Colaborador): Buscar por palavras-chave no título ou na descrição
    const busca = termo.trim().toLowerCase();
    if (!busca) {
      return [...this.itens];
    }
    return this.itens.filter(
      (item) =>
        item.getTitulo().toLowerCase().includes(busca) ||
        item.getDescricao().toLowerCase().includes(busca)
    );
  }

  public ordenarAtividadesPorPrazo(): AtividadePratica[] {
    // TODO (Colaborador): Ordenar atividades pelo prazo mais próximo
    return [];
  }

  public ordenarPorDataCadastro(): ItemAcademico[] {
    // TODO (Colaborador): Ordenar itens por ordem cronológica de criação
    return [...this.itens].sort(
      (a, b) => a.getDataCriacao().getTime() - b.getDataCriacao().getTime()
    );
  }

  public filtrarAtividadesPorOrigem(_origem: OrigemAtividade): AtividadePratica[] {
    // TODO (Colaborador): Filtrar atividades por PROFESSOR ou AUTOESTUDO
    return [];
  }

  public obterTotalAtividades(): number {
    // TODO (Colaborador): Contabilizar total de atividades da disciplina
    return this.itens.length;
  }

  public calcularTaxaConclusao(): number {
    // TODO (Colaborador): Calcular percentual (0 a 100) de atividades concluídas
    return 0;
  }
}
