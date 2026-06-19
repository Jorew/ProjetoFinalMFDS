const fs = require('fs');
const path = require('path');
const app = require('../src/app');

describe('adicionarTarefa', () => {
  const tarefasPath = path.join(__dirname, '..', 'dados', 'tarefas.json');

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('deve adicionar uma nova tarefa e salvar no arquivo', () => {
    const mockTarefas = [];
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(mockTarefas));
    const writeMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    const titulo = 'Teste de tarefa';
    const nova = app.adicionarTarefa(titulo);

    expect(nova).toHaveProperty('titulo', titulo);
    expect(nova).toHaveProperty('concluida', false);
    expect(writeMock).toHaveBeenCalled();

    const written = JSON.parse(writeMock.mock.calls[0][1]);
    expect(Array.isArray(written)).toBe(true);
    expect(written.length).toBe(1);
    expect(written[0].titulo).toBe(titulo);
  });
});
