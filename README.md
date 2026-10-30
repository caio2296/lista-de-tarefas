# 📋 Minha Lista de Tarefas (To-Do List)

Um projeto simples, didático e moderno de lista de tarefas desenvolvido com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**. Ideal para quem está dando os primeiros passos no desenvolvimento web!

---

## 🚀 Como Executar

Você não precisa instalar nenhum compilador, servidor ou biblioteca externa:

1. Abra a pasta do projeto no explorador de arquivos:
   `C:\Users\caioc\.gemini\antigravity\scratch\lista-de-tarefas`
2. Dê um duplo clique no arquivo **`index.html`**.
3. O projeto abrirá automaticamente no seu navegador padrão (Chrome, Edge, Firefox, etc.).

---

## 📂 Estrutura do Projeto

```text
lista-de-tarefas/
├── index.html     # Estrutura e marcação dos elementos visuais
├── style.css      # Cores, espaçamentos, layout e animações
├── script.js      # Lógica, interatividade e armazenamento
└── README.md      # Guia e explicações do projeto
```

---

## 🧠 Como cada componente funciona

### 1. `index.html` (A Estrutura / Esqueleto)
- Define as "peças" visuais da página:
  - `<main>`: O container central do cartão.
  - `<form>` e `<input>`: Onde o usuário digita a nova atividade e submete.
  - `<div class="filters">`: Botões para alternar visualização (*Todas*, *Pendentes*, *Concluídas*).
  - `<ul id="task-list">`: A lista não-ordenada onde os itens serão colocados pelo JavaScript.

### 2. `style.css` (O Visual / Aparência)
- **Variáveis CSS (`:root`)**: Centralizam cores (`--primary`, `--danger`, `--bg-card`), permitindo alterar o tema em um só lugar.
- **Flexbox (`display: flex`)**: Usado para alinhar inputs, botões e os itens da lista lado a lado de forma responsiva.
- **Estados Visuais**: Classes como `.completed` riscam o texto quando a tarefa é marcada como concluída.

### 3. `script.js` (O Cérebro / Comportamento)
- **Estado (State)**: A lista de tarefas é guardada na memória como uma lista de objetos:
  ```javascript
  { id: 1714000000000, text: "Comprar pão", completed: false }
  ```
- **Manipulação do DOM**: O JavaScript escuta eventos (`submit`, `click`) e reconstrói a lista visualmente chamando `renderTasks()`.
- **`localStorage`**: Toda vez que você adiciona, conclui ou apaga uma tarefa, a lista é salva no armazenamento local do navegador. Quando a página é recarregada, suas tarefas continuam lá!

---

## 🎯 Desafios para Praticar (Próximos Passos)

Quando você se sentir confortável com o código atual, tente implementar estas melhorias por conta própria:

1. **Botão de Limpar Concluídas**: Adicione um botão para remover todas as tarefas já marcadas de uma só vez.
2. **Edição de Tarefas**: Permitir dar duplo clique no texto de uma tarefa para editá-la.
3. **Modo Noturno (Dark Mode)**: Criar um botão para alternar entre tema claro e escuro alterando as variáveis no CSS.
