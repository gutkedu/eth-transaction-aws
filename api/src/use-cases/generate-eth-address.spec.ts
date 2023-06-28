import { describe, it, expect, beforeEach } from 'vitest'
import { GenerateEthAddressUseCase } from './generate-eth-address'

let sut: GenerateEthAddressUseCase

describe('GenerateEthAddressUseCase', () => {
  beforeEach(() => {
    sut = new GenerateEthAddressUseCase()
  })

  it('should generate an Ethereum address from a public key', async () => {
    const validPublicKey =
      '0x04990397029684d636c1f3c5a86a185a89909089517d5975965f97efa2d331eafa3dae8fdf83a66c102d5c05f81100a305d14d5060f1bc1b3bce6c4a4caf8616cd'

    const { address } = await sut.execute(validPublicKey)

    // starts with '0x'
    expect(address.startsWith('0x')).toBe(true)

    // has a length of 42 characters (including the '0x' prefix)
    expect(address.length).toBe(42)

    // address for the public key above
    expect(address).toBe('0xbde31016f0d2e773f04d8785f311e4ca1ae58270')
  })
})
