/**
 * Configuração vinda do ambiente.
 *
 * ⚠️ Importante: variáveis `VITE_*` são **injetadas no bundle em tempo de build**,
 * então o valor vai para o JavaScript entregue ao navegador e pode ser lido por
 * quem inspecionar o código. Isso basta para manter a mesa fora do acesso casual
 * (que é o pedido da etapa), mas não é segurança de verdade — para isso a senha
 * teria de ser verificada em um servidor.
 */

const configured = (import.meta.env.VITE_GAME_PASSWORD ?? '').trim()

/** Senha esperada no login. String vazia quando a variável não foi definida. */
export const GAME_PASSWORD = configured

/**
 * Falso quando o ambiente não define a senha.
 *
 * Nesse caso o login **falha fechado** (ninguém entra), em vez de liberar o
 * acesso — um deploy sem a variável configurada não deve virar uma mesa pública.
 */
export const IS_GAME_PASSWORD_CONFIGURED = configured.length > 0
