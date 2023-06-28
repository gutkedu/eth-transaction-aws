import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { GenerateEthAddressUseCase } from '../../use-cases/generate-eth-address'
import { ethereumPublicKeyRegex } from '../../utils/regex'

export async function generateEthAddressController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const publicKeyInput = z.object({
    publicKey: z.string().regex(ethereumPublicKeyRegex),
  })

  const { publicKey } = publicKeyInput.parse(request.body)

  try {
    const generateEthAddressUseCase = new GenerateEthAddressUseCase()

    const { address } = await generateEthAddressUseCase.execute(publicKey)

    return reply.status(200).send({ address })
  } catch (error) {
    console.error(error)
    return reply.status(400).send()
  }
}
