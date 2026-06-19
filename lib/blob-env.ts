/** Vercel Blob token — supports default name and prefixed store connection names. */
export function getBlobReadWriteToken(): string | undefined {
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN ||
    undefined
  )
}

export function getBlobStoreId(): string | undefined {
  return (
    process.env.BLOB_STORE_ID ||
    process.env.BLOB_READ_WRITE_TOKEN_STORE_ID ||
    undefined
  )
}

export function hasBlobStorage(): boolean {
  return Boolean(getBlobReadWriteToken() || (process.env.VERCEL === "1" && getBlobStoreId()))
}
