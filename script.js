/**
 * ============================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (Vanilla JavaScript)
 * ============================================================================
 * 
 * Em aplicações web, o JavaScript é responsável por:
 * 1. Ouvir ações do usuário (cliques, digitação, envio de formulário).
 * 2. Manipular os dados (adicionar, alterar ou remover itens na memória).
 * 3. Atualizar a tela (adicionar ou remover elementos do HTML/DOM).
 * 4. Salvar os dados no navegador (localStorage) para não perder nada ao recarregar.
 */

// ============================================================================
// 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
// Guardamos referências aos elementos visuais para podermos interagir com eles.
// ============================================================================
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const taskCounter = document.getElementById('task-counter');
const filterButtons = document.querySelectorAll('.filter-btn');

// ============================================================================
// 2. ESTADO DA APLICAÇÃO (Dados na memória)
// As tarefas são representadas por uma lista (Array) de objetos.
// Cada objeto tem o formato: { id: number, text: string, completed: boolean }
// ============================================================================
let currentFilter = 'all'; // Pode ser: 'all', 'pending' ou 'completed'

// Carregamos as tarefas salvas no localStorage (se existirem) ou iniciamos com array vazio
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [
  // Exemplo de tarefa inicial para quem acabou de abrir o app
  { id: 1, text: 'Aprender como o HTML, CSS e JS funcionam juntos', completed: true },
  { id: 2, text: 'Criar minha primeira tarefa personalizada', completed: false }
];

// ============================================================================
// 3. PERSISTÊNCIA (localStorage)
// O localStorage permite salvar dados em texto no navegador do usuário.
// ============================================================================
function saveTasksToStorage() {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

// ============================================================================
// 4. FUNÇÕES DE MANIPULAÇÃO DE TAREFAS
// ============================================================================

/**
 * Adiciona uma nova tarefa ao array
 */
function addTask(text) {
  const newTask = {
    id: Date.now(),      // Gera um identificador único usando o timestamp atual
    text: text.trim(),   // Remove espaços extras nas pontas
    completed: false     // Toda nova tarefa começa como pendente
  };

  tasks.push(newTask);   // Adiciona ao final da lista
  saveTasksToStorage();  // Salva no navegador
  renderTasks();         // Atualiza a tela
}

/**
 * Alterna o status de concluída (true/false) de uma tarefa pelo seu ID
 */
function toggleTask(id) {
  // Procura a tarefa pelo ID e inverte o valor de "completed"
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToStorage();
  renderTasks();
}

/**
 * Remove uma tarefa da lista pelo seu ID
 */
function deleteTask(id) {
  // Cria um novo array contendo todas as tarefas, EXCETO a que tem o ID informado
  tasks = tasks.filter(task => task.id !== id);

  saveTasksToStorage();
  renderTasks();
}

// ============================================================================
// 5. ATUALIZAÇÃO VISUAL (RENDERIZAÇÃO NO DOM)
// Esta função lê os dados da memória (tasks) e desenha os elementos na tela.
// ============================================================================
function renderTasks() {
  // 1. Limpa a lista atual na tela para redesenhar com os dados atualizados
  taskList.innerHTML = '';

  // 2. Filtra as tarefas de acordo com o botão selecionado
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all' retorna todas
  });

  // 3. Controla a exibição da mensagem de "nenhuma tarefa"
  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // 4. Cria e insere cada elemento <li> na lista
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    // Montando o HTML interno de cada item
    li.innerHTML = `
      <label class="task-content">
        <input 
          type="checkbox" 
          ${task.completed ? 'checked' : ''}
          data-id="${task.id}"
        >
        <span class="task-text">${escapeHtml(task.text)}</span>
      </label>
      <div class="task-actions">
        <!-- Tag visual que indica se a tarefa está concluída ou pendente -->
        <span class="task-badge ${task.completed ? 'completed' : 'pending'}">
          ${task.completed ? '✓ Concluída' : 'Pendente'}
        </span>
        <button class="delete-btn" title="Excluir tarefa" data-id="${task.id}">
          ✕
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  // 5. Atualiza o contador de tarefas
  updateCounter();
}

/**
 * Atualiza o texto do contador no rodapé
 */
function updateCounter() {
  const pendingCount = tasks.filter(t => !t.completed).length;
  const totalCount = tasks.length;

  if (totalCount === 0) {
    taskCounter.textContent = '0 tarefas';
  } else {
    taskCounter.textContent = `${pendingCount} pendente${pendingCount !== 1 ? 's' : ''} de ${totalCount}`;
  }
}

/**
 * Função utilitária para evitar injeção acidental de código HTML nos textos
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================================================
// 6. OUVINTES DE EVENTOS (EVENT LISTENERS)
// Conecta os cliques e interações do usuário às nossas funções de lógica.
// ============================================================================

// Ouvir o envio do formulário (clicar no botão "Adicionar" ou apertar Enter)
todoForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento padrão da página

  const text = taskInput.value;
  if (text.trim() !== '') {
    addTask(text);
    taskInput.value = ''; // Limpa o campo de texto
    taskInput.focus();    // Mantém o foco no campo para digitar a próxima
  }
});

// Delegação de eventos na lista de tarefas (mais eficiente do que colocar ouvintes em cada botão)
taskList.addEventListener('click', (event) => {
  const target = event.target;

  // Se clicou no checkbox para marcar/desmarcar
  if (target.matches('input[type="checkbox"]')) {
    const taskId = Number(target.getAttribute('data-id'));
    toggleTask(taskId);
  }

  // Se clicou no botão de excluir (ou no ícone dentro dele)
  const deleteBtn = target.closest('.delete-btn');
  if (deleteBtn) {
    const taskId = Number(deleteBtn.getAttribute('data-id'));
    deleteTask(taskId);
  }
});

// Ouvir cliques nos botões de filtro (Todas / Pendentes / Concluídas)
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove a classe 'active' de todos e coloca no clicado
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Atualiza o filtro atual e redesenha a lista
    currentFilter = button.getAttribute('data-filter');
    renderTasks();
  });
});

// ============================================================================
// 7. INICIALIZAÇÃO
// Executa a primeira renderização assim que o script é carregado
// ============================================================================
renderTasks();
