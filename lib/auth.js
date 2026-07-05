// Hash de senha simples com scrypt (nativo do Node, sem dependência externa).
// Formato salvo no banco: "salt:hash" (ambos em hex).
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export function hashSenha(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verificarSenha(senha, senhaHash) {
  const [salt, hashSalvo] = (senhaHash || "").split(":");
  if (!salt || !hashSalvo) return false;
  const hashTentativa = scryptSync(senha, salt, 64).toString("hex");
  const bufSalvo = Buffer.from(hashSalvo, "hex");
  const bufTentativa = Buffer.from(hashTentativa, "hex");
  if (bufSalvo.length !== bufTentativa.length) return false;
  return timingSafeEqual(bufSalvo, bufTentativa);
}
