import { FastifyInstance } from 'fastify'
import { createKeysController } from '@/http/controllers/create-keys'
import { generateEthAddressController } from '@/http/controllers/generate-eth-address'

export async function routes(app: FastifyInstance) {
  app.get('/keys', createKeysController)
  app.post('/address', generateEthAddressController)
}
