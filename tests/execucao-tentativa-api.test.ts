import assert from 'node:assert/strict'
import test from 'node:test'
import handler from '../api/execucao-tentativa.ts'

test('função de execução encaminha as quatro rotas mantendo a autenticação', async () => {
  const requests = [
    { path: '/api/iniciar-tentativa', method: 'POST', message: 'Entre novamente para iniciar a tentativa.' },
    { path: '/api/conteudo-tentativa', method: 'GET', message: 'Entre novamente para consultar a tentativa.' },
    { path: '/api/salvar-resposta-tentativa', method: 'POST', message: 'Entre novamente para salvar a resposta.' },
    { path: '/api/encerrar-tentativa', method: 'POST', message: 'Sua sessão terminou.' },
  ]

  for (const { path, method, message } of requests) {
    const response = await handler.fetch(new Request(`http://localhost${path}`, { method }))
    assert.equal(response.status, 401, path)
    assert.equal(response.headers.get('cache-control'), 'no-store', path)
    assert.deepEqual(await response.json(), { message }, path)
  }
})

test('função de execução rejeita chamadas diretas ao endereço de destino', async () => {
  const response = await handler.fetch(new Request('http://localhost/api/execucao-tentativa'))
  assert.equal(response.status, 404)
})
