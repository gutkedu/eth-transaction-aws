import { describe, it, expect, beforeEach } from 'vitest'
import { CreateKeysUseCase } from './create-keys'

let sut: CreateKeysUseCase

describe('CreateKeysUseCase', () => {
  beforeEach(() => {
    sut = new CreateKeysUseCase()
  })

  it('should generate a private and public key pair', async () => {
    const { privateKey, publicKey } = await sut.execute()

    expect(privateKey).toBeTruthy()
    expect(privateKey.length).toBeGreaterThan(0)

    expect(publicKey).toBeTruthy()
    expect(publicKey.length).toBeGreaterThan(0)

    // Ensure that the public key starts with '0x'
    expect(publicKey.startsWith('0x')).toBe(true)
  })
})
