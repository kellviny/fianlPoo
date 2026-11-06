import { AtividadePratica } from "./AtividadePratica";
import { ItemAcademico } from "./ItemAcademico";
import { Lembrete } from "./Lembrete";
import { Workspace } from "./Workspace";

/**
 * 3.4 Painel Geral do Estudante (Dashboard)
 * Gerencia os Workspaces das disciplinas e fornece visão consolidada da rotina
 * acadêmica (próximos prazos da semana, atrasos, mural de lembretes e métricas).
 */
export class PainelEstudante {
  private readonly workspaces: Workspace[] = [];

  public adicionarWorkspace(workspace: Workspace): void {
    const existente = this.buscarWorkspacePorCodigo(workspace.getCodigo());
    if (existente) {
      throw new Error(`Já existe um workspace com o código '${workspace.getCodigo()}'.`);
    }
    this.workspaces.push(workspace);
  }

  public buscarWorkspacePorCodigo(codigo: string): Workspace | undefined {
    const codigoNormalizado = codigo.trim().toUpperCase();
    return this.workspaces.find((ws) => ws.getCodigo() === codigoNormalizado);
  }

  public listarWorkspaces(): ReadonlyArray<Workspace> {
    return [...this.workspaces];
  }

  public obterProximosPrazosDaSemana(): AtividadePratica[] {
    // TODO (Colaborador): Retornar lista ordenada de atividades pendentes de todos
    // os workspaces com vencimento nos próximos 7 dias.
    return [];
  }

  public obterAtividadesEmAtraso(): AtividadePratica[] {
    // TODO (Colaborador): Consolidar atividades em atraso de todos os workspaces.
    return this.workspaces.flatMap((ws) => ws.listarItensEmAtraso());
  }

  public obterMuralLembretesFixados(): Lembrete[] {
    // TODO (Colaborador): Consolidar lembretes fixados de todas as disciplinas.
    return this.workspaces.flatMap((ws) => ws.listarLembretesFixados());
  }

  public buscarGlobalPorTexto(termo: string): ItemAcademico[] {
    // TODO (Colaborador): Buscar em todos os workspaces por palavra-chave.
    return this.workspaces.flatMap((ws) => ws.buscarPorTexto(termo));
  }
}
