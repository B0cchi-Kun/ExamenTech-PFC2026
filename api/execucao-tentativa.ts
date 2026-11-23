import iniciarTentativa from '../server/iniciar-tentativa.ts'
import conteudoTentativa from '../server/conteudo-tentativa.ts'
import salvarRespostaTentativa from '../server/salvar-resposta-tentativa.ts'
import encerrarTentativa from '../server/encerrar-tentativa.ts'

export const tentativaHandlers = new Map([
  ['/api/iniciar-tentativa', iniciarTentativa],
  ['/api/conteudo-tentativa', conteudoTentativa],
  ['/api/salvar-resposta-tentativa', salvarRespostaTentativa],
  ['/api/encerrar-tentativa', encerrarTentativa],
])

export default {
  fetch(request: Request) {
    const handler = tentativaHandlers.get(new URL(request.url).pathname)
    if (handler) return handler.fetch(request)

    return Response.json({ message: 'Rota não encontrada.' }, {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    })
  },
}
