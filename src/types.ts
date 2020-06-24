/** See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-2 | JWT Terminology} */
export type StringOrURI = string;
/** See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-2 | JWT Terminology} */
export type NumericDate = number;
/** See {@link https://github.com/dylang/shortid} and {@link https://en.wikipedia.org/wiki/Base64}*/
export type Base64String = string;
export type Email = string;
export type SpacedString = string;
export type PipedString = string;
export type SemVerRangeString = string;

/** See {@link https://tools.ietf.org/html/rfc3986} */
export type URI = string;
/**
 * JetRegistation is the payload which identifies the registrant (person for whom the key is issued)
 * and the application to which the key can be applied.
 */
export interface JetRegistration {
  /**
   * Issuer: The issuer of the key.
   * Should be a fully qualified domain name.
   *
   * For example,
   * ```"iss":"neo4j.com".```
   *
   * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1}
   */
  iss: StringOrURI;

  /**
   * Issued At Time: When the key was issued.
   *
   * For example,
   * ```"iat":1574760713```
   *
   * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-2}
   */
  iat: NumericDate;

  /**
   * Audience: The application enabled by the key.
   *
   * Should be a URN of the form "urn:app:domain/app",
   * _or_ a string of the form "domain/app"
   * _or_ a string of the form "@namespace/app".
   *
   * Where:
   * - 'domain' identifies the publisher by fully qualified domain name.
   * - 'namespace' identifies the publisher by npm registry.
   * - 'app' is a publisher scoped unique name.
   *
   * For example, any of these variations:
   * ```
   * "aud":"urn:app:neo4j.com/neo4j-desktop"
   * "aud":"neo4j.com/neo4j-desktop"
   * "aud":"@neo4j/neo4j-desktop"
   * ```
   *
   * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3}
   */
  aud: StringOrURI;

  /**
   * Pubisher: the full name of the application publisher,
   * or a URI for the publisher.
   *
   * For example, either of:
   *
   * ```
   * "pub":"Acme, Inc."
   * "pub":"http://acme.com"
   * ```
   *
   * Note: a custom claim.
   */
  pub?: StringOrURI;

  /**
   * Expiration: Specifies the exact moment when the key will become invalid.
   *
   * For example,
   * ```"exp":1574760713```
   *
   * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.4}
   */
  exp: NumericDate;

  /**
   * Not Before Time: Specifies the exact moment before the key becomes valid.
   *
   * For example,
   * ```"nbf":1574760713```
   *
   * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.5}
   */
  nbf: NumericDate;

  /**
   * JWT ID: A unique ID for the key.
   *
   * Should be a string. Base64 is recommended.
   *
   * For example:
   * ```
   * "jti":23TplPdS
   * "jti":46Juzcyx
   * "jti":dBvJIh-H
   * "jti":2WEKaVNO
   * ```
   *
   * See {@link https://tools.ietf.org/html/rfc7519#section-4.1.7}
   */
  jti: Base64String;

  /**
   * Name: the full name of the registrant for whom the key is issued.
   *
   * For example,
   * ```"name":"Bob the Builder"```
   *
   * See {@link https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims}
   */
  name: string;

  /**
   * Email: the registrant's email address.
   *
   * For example,
   * ```"email":"bob@build.it"```
   *
   * See {@link https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims}
   */
  email: Email;

  /**
   * Organization: the full name of the registrant's organization,
   * or a URI for the organiation.
   *
   * For example, either of:
   *
   * ```
   * "org":"AAA Builders."
   * "org":"http://built.it"
   * ```
   *
   * Note: a custom claim.
   */
  org?: StringOrURI;

  /**
   * Subject: The unique identity of the registrant.
   *
   * Should be a string containing the unique provider identity plus provider scoped user id
   * of the form "provider|provider-id".
   *
   * Providers could be:
   * - "self" for locally generated identifier (a "self identified" identity)
   * - "mkto" for marketo identifier present on neo4j.com
   * - common auth0 providers: google-oauth2, github, twitter
   *
   * Examples:
   * ```
   * "sub":"google-oauth2|123456"
   * "sub":"self|7A8CF3A4-272B-46C9-931D-CBD9BCFA4045"
   * "sub":"mkto|AZ24L2B"
   * "sub":"twitter|HoratioDear"
   * ```
   *
   * See:
   *
   * - {@link https://tools.ietf.org/html/rfc7519#section-4.1.2 | IETF "sub" claim}
   * - {@link https://auth0.com/docs/users/normalized/auth0/identify-users | user_id format}
   */
  sub?: PipedString;

  /**
   * Version: SemVer range of versions enabled by the key.
   *
   * Examples:
   * ```
   * "ver":"1.x"
   * "ver":">=2.5.0"
   * "ver":"5.0.0 - 7.2.3"
   * ```
   *
   * See {@link https://devhints.io/semver | SemvVer cheatsheet}
   *
   * See {@link https://semver.npmjs.com | SemVer Calculator}
   */
  ver: SemVerRangeString;

  /**
   * Scope: application specific grants given to the registrant.
   *
   * For example,
   * ```"scope":"pro experimental sitewide"```
   *
   * See:
   *
   * - {@link https://tools.ietf.org/html/rfc6749#section-3.3}
   * - {@link https://tools.ietf.org/html/rfc8693#section-2.1}
   * - {@link https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims}
   */
  scope?: SpacedString;

  /**
   * Website: where to find information about the application.
   *
   * - {@link https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims}
   */
  website?: URI;

  /**
   * Registry: distribution location of the application.
   *
   * A custom claim.
   */
  registry?: URI | 'github' | 'npm' | 'maven';
}
