console.log("Aplicação To-Do iniciada");

const tarefas = [];
function adicionarTarefa(titulo) {
  tarefas.push({
      id: Date.now(),
      titulo: titulo,
      concluida: false

  });

}

adicionarTarefa("Estudar Docker");
console.log(tarefas);
