import dadosIniciaisJson from "../../dados-iniciais.json";
import {
  AtividadePratica,
  DadosIniciais,
  ItemAcademico,
  ItemSerializado,
  Lembrete,
  PainelEstudante,
  TrabalhoEmGrupo,
  Workspace,
} from "../domain";

/**
 * Camada de Visão — Ponto de entrada da aplicação.
 * Responsável por carregar os dados iniciais (ou LocalStorage), instanciar os
 * objetos puros da Camada de Domínio e atualizar o DOM.
 */
const painel = new PainelEstudante();

function instanciarItemDoJson(raw: ItemSerializado): ItemAcademico {
  const dataCriacao = new Date(raw.dataCriacao);

  if (raw.tipo === "TRABALHO_GRUPO") {
    return new TrabalhoEmGrupo(
      raw.id,
      raw.titulo,
      raw.descricao,
      raw.workspaceId,
      new Date(raw.dataLimite ?? Date.now()),
      raw.colegasDeEquipe ?? [],
      raw.papelDoAluno ?? "Integrante",
      raw.etapas ?? [],
      raw.origem ?? "PROFESSOR",
      raw.checklist ?? [],
      raw.linkEntrega,
      raw.concluida ?? false,
      raw.dataConclusao ? new Date(raw.dataConclusao) : undefined,
      dataCriacao
    );
  }

  if (raw.tipo === "ATIVIDADE_PRATICA") {
    return new AtividadePratica(
      raw.id,
      raw.titulo,
      raw.descricao,
      raw.workspaceId,
      new Date(raw.dataLimite ?? Date.now()),
      raw.origem ?? "PROFESSOR",
      raw.checklist ?? [],
      raw.linkEntrega,
      raw.concluida ?? false,
      raw.dataConclusao ? new Date(raw.dataConclusao) : undefined,
      dataCriacao
    );
  }

  return new Lembrete(
    raw.id,
    raw.titulo,
    raw.descricao,
    raw.workspaceId,
    raw.etiqueta ?? "Geral",
    raw.fixado ?? false,
    raw.dataAviso ? new Date(raw.dataAviso) : undefined,
    false,
    dataCriacao
  );
}

function carregarDadosIniciais(): void {
  const dados = dadosIniciaisJson as DadosIniciais;

  for (const wsRaw of dados.workspaces) {
    const workspace = new Workspace(
      wsRaw.codigo,
      wsRaw.nome,
      wsRaw.professor,
      wsRaw.salaOuLink,
      wsRaw.horario
    );

    for (const itemRaw of wsRaw.itens) {
      workspace.adicionarItem(instanciarItemDoJson(itemRaw));
    }

    painel.adicionarWorkspace(workspace);
  }
}

function renderizarWorkspaces(): void {
  const listaEl = document.getElementById("lista-workspaces");
  const itensContainerEl = document.getElementById("itens-container");
  if (!listaEl || !itensContainerEl) return;

  listaEl.innerHTML = "";
  const workspaces = painel.listarWorkspaces();

  for (const ws of workspaces) {
    const li = document.createElement("li");
    li.className = "workspace-item";
    li.innerHTML = `<strong>${ws.getCodigo()}</strong> — ${ws.getNome()}<br/><small>${ws.getProfessor()}</small>`;
    li.addEventListener("click", () => renderizarItensDoWorkspace(ws));
    listaEl.appendChild(li);
  }

  if (workspaces.length > 0) {
    renderizarItensDoWorkspace(workspaces[0]);
  }
}

function renderizarItensDoWorkspace(workspace: Workspace): void {
  const itensContainerEl = document.getElementById("itens-container");
  if (!itensContainerEl) return;

  itensContainerEl.innerHTML = `<h3>${workspace.getCodigo()} — ${workspace.getNome()}</h3>`;

  // Polimorfismo em ação: cada subclasse responde a obterExibicaoFormatada() sem if/instanceof
  for (const item of workspace.listarItens()) {
    const div = document.createElement("div");
    div.className = "item-card";
    div.textContent = item.obterExibicaoFormatada();
    itensContainerEl.appendChild(div);
  }
}

// Inicialização da aplicação
carregarDadosIniciais();
renderizarWorkspaces();
