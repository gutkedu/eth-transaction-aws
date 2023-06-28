import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateKeysUseCase } from '../../use-cases/create-keys'

export async function createKeysController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createKeysUseCase = new CreateKeysUseCase()

  const { privateKey, publicKey } = await createKeysUseCase.execute()

  reply.status(200).send({ privateKey, publicKey })
}
