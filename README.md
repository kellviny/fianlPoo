# AcademiaFlow — Organização de Atividades e Lembretes Acadêmicos

Trabalho Final da disciplina de **Programação Orientada a Objetos (POO)** com **TypeScript** — Curso de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS) — Prof. Iallen Gábio.

---

## 1. Sobre o Projeto

O **AcademiaFlow** é um sistema de gerenciamento de rotina de estudos organizado em **Workspaces por Disciplina**. Ele permite cadastrar, acompanhar, filtrar e ordenar demandas acadêmicas respeitando os pilares de POO (**Encapsulamento, Herança, Polimorfismo, Composição e Agregação**) e a separação estrita em camadas (**Domínio × Visão**).

---

## 2. Arquitetura em Camadas (Fácil de Explicar na Apresentação)

```text
academia-flow/
├── docs/
│   └── diagrama-classes.puml       # Diagrama de Classes UML (PlantUML)
├── src/
│   ├── domain/                     # CAMADA DE DOMÍNIO (100% pura, sem HTML/DOM/LocalStorage)
│   │   ├── types.ts                # Tipos e interfaces auxiliares
│   │   ├── ItemAcademico.ts        # Classe Base Abstrata
│   │   ├── AtividadePratica.ts     # Subclasse: Atividades individuais (Professor/Autoestudo)
│   │   ├── TrabalhoEmGrupo.ts      # Subclasse: Atividades em equipe e etapas
│   │   ├── Lembrete.ts             # Subclasse: Avisos e lembretes fixáveis
│   │   ├── Workspace.ts            # Agregado que compõe e gerencia a coleção polimórfica
│   │   ├── PainelEstudante.ts      # Painel Geral / Dashboard consolidado
│   │   └── index.ts                # Exportações centralizadas do domínio
│   └── view/                       # CAMADA DE VISÃO (Interface gráfica, eventos e LocalStorage)
│       ├── app.ts                  # Controlador de tela que consome a Camada de Domínio
│       └── styles.css              # Estilização da interface
├── dados-iniciais.json             # Cenário realista pré-populado (4 disciplinas de ADS)
├── index.html                      # Página principal da aplicação
├── package.json                    # Scripts (npm install / npm start) e dependências
└── tsconfig.json                   # Configuração TypeScript estrita (sem uso de 'any')
```

### Regras de Ouro da Arquitetura
1. **O Domínio não conhece a Visão**: Nenhum arquivo dentro de `src/domain/` utiliza `document`, `window`, `alert()` ou `localStorage`.
2. **A Visão delega as regras para o Domínio**: A tela apenas captura eventos do usuário, invoca os métodos das classes de domínio e exibe os resultados.

---

## 3. Como Executar o Projeto

Pré-requisito: **Node.js** (versão 18 ou superior).

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento (abre automaticamente no navegador):
   ```bash
   npm start
   ```

3. Para validar a tipagem estrita do TypeScript (`strict: true`, sem `any`):
   ```bash
   npm run typecheck
   ```

---

## 4. Guia Rápido para os Colaboradores da Equipe

Como cada classe está em um arquivo separado dentro de `src/domain/`, cada integrante pode trabalhar no seu arquivo sem gerar conflitos no Git:

1. **Clonar o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd fianlPoo
   npm install
   ```
2. **Criar uma branch para sua tarefa**:
   ```bash
   git checkout -b feat/nome-da-sua-parte
   ```
3. **Fazer commits pequenos e objetivos (uma funcionalidade por commit)**:
   ```bash
   git add <arquivo-modificado>
   git commit -m "feat(domain): implementa calculo de atraso em AtividadePratica"
   git push origin feat/nome-da-sua-parte
   ```
