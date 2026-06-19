const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const tarefasPath = path.join(__dirname, "..", "dados", "tarefas.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Funções de gerenciamento de tarefas
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

// API Endpoints
app.get("/api/tarefas", (req, res) => {
  const tarefas = carregarTarefas();
  res.json(tarefas);
});

app.post("/api/tarefas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" });
  }
  const tarefa = adicionarTarefa(titulo);
  res.status(201).json(tarefa);
});

app.put("/api/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;
  const tarefas = carregarTarefas();
  const tarefa = tarefas.find((t) => t.id === parseInt(id));

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  salvarTarefas(tarefas);
  res.json(tarefa);
});

app.delete("/api/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const tarefas = carregarTarefas();
  const index = tarefas.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  const tarefaRemovida = tarefas.splice(index, 1);
  salvarTarefas(tarefas);
  res.json(tarefaRemovida[0]);
});

// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = {
  carregarTarefas,
  salvarTarefas,
  adicionarTarefa,
  listarTarefas,
};
