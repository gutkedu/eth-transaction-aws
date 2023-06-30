import { ec as EC } from 'elliptic'

interface CreateKeysUseCaseResponse {
  privateKey: string
  publicKey: string
}

export class CreateKeysUseCase {
  async execute(): Promise<CreateKeysUseCaseResponse> {
    const ec = new EC('secp256k1')

    const keys = ec.genKeyPair()

    const privateKey = keys.getPrivate('hex')

    const publicKey = `0x${keys.getPublic('hex')}`

    return {
      privateKey,
      publicKey,
    }
  }
}
