import { FastifyInstance } from 'fastify'
import { createKeysController } from './create-keys'
import { generateEthAddressController } from './generate-eth-address'

export async function routes(app: FastifyInstance) {
  app.get('/keys', createKeysController)

  app.post('/address', generateEthAddressController)

  app.get('/', async (_request, _reply) => {
    return { message: 'ok' }
  })
}
