const fs = require("fs");
const path = require("path");

const tarefasPath = path.join(__dirname, "..", "dados", "tarefas.json");

function carregarTarefas() {
  try {
    const data = fs.readFileSync(tarefasPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function salvarTarefas(tarefas) {
  fs.writeFileSync(tarefasPath, JSON.stringify(tarefas, null, 2), "utf8");
}

function adicionarTarefa(titulo) {
  const tarefas = carregarTarefas();
  const novaTarefa = {
    id: Date.now(),
    titulo,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);
  return novaTarefa;
}

function listarTarefas() {
  const tarefas = carregarTarefas();
  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada ainda.");
    return;
  }

  console.log("Tarefas:");
  tarefas.forEach((tarefa) => {
    console.log(`- [${tarefa.concluida ? "x" : " "}] ${tarefa.id}: ${tarefa.titulo}`);
  });
}

const args = process.argv.slice(2);
const comando = args[0];

if (comando === "adicionar") {
  const titulo = args.slice(1).join(" ");
  if (!titulo) {
    console.log("Use: node src/app.js adicionar \"Título da tarefa\"");
    process.exit(1);
  }
  const tarefa = adicionarTarefa(titulo);
  console.log("Tarefa adicionada:", tarefa);
} else {
  listarTarefas();
  console.log("\nPara adicionar uma tarefa, execute: node src/app.js adicionar \"Título da tarefa\"");
}

module.exports = {
  carregarTarefas,
  salvarTarefas,
  adicionarTarefa,
  listarTarefas,
};
