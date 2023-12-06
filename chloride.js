const sodium = require('sodium-universal');

module.exports = {
  crypto_secretbox_easy,
  crypto_secretbox_open_easy
};

function crypto_secretbox_easy(ptxt, nonce, key) {
  const ctxt = Buffer.alloc(
    ptxt.length + sodium.crypto_aead_chacha20poly1305_ietf_ABYTES
  );
  const expectedNonceLength = sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES;
  if (nonce.length !== expectedNonceLength) {
    throw new Error(
      `secret-handshake box nonce length, expected: ${expectedNonceLength}, got: ${nonce.length}`
    );
  }
  const expectedKeyLength = sodium.crypto_aead_chacha20poly1305_ietf_KEYBYTES;
  if (key.length !== expectedKeyLength) {
    throw new Error(
      `secret-handshake box key length, expected: ${expectedKeyLength}, got: ${key.length}`
    );
  }
  sodium.crypto_aead_chacha20poly1305_ietf_encrypt(
    ctxt,
    ptxt,
    null,
    null,
    nonce,
    key
  );
  return ctxt;
}

function crypto_secretbox_open_easy(ctxt, nonce, key) {
  const ptxt = Buffer.alloc(
    ctxt.length - sodium.crypto_aead_chacha20poly1305_ietf_ABYTES
  );
  const expectedNonceLength = sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES;
  if (nonce.length !== expectedNonceLength) {
    throw new Error(
      `secret-handshake unbox nonce length, expected: ${expectedNonceLength}, got: ${nonce.length}`
    );
  }
  const expectedKeyLength = sodium.crypto_aead_chacha20poly1305_ietf_KEYBYTES;
  if (key.length !== expectedKeyLength) {
    throw new Error(
      `secret-handshake unbox key length, expected: ${expectedKeyLength}, got: ${key.length}`
    );
  }
  const unboxedLength = sodium.crypto_aead_chacha20poly1305_ietf_decrypt(
    ptxt,
    null,
    ctxt,
    null,
    nonce,
    key
  );
  if (unboxedLength) {
    return ptxt;
  }
  return null;
}
