import { ethers } from 'ethers'

interface GenerateEthAddressUseCaseResponse {
  address: string
}

export class GenerateEthAddressUseCase {
  async execute(publicKey: string): Promise<GenerateEthAddressUseCaseResponse> {
    const publicKeyBytes = ethers.hexlify(publicKey)

    const publicKeyHash = ethers.keccak256(publicKeyBytes)

    const publicKeyHashWithoutPrefix = publicKeyHash.substring(2)

    const last20Bytes = publicKeyHashWithoutPrefix.substring(
      publicKeyHashWithoutPrefix.length - 40,
    )

    const address = `0x${last20Bytes}`

    return {
      address,
    }
  }
}
