
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

/**
 * JetRegistation is the payload which identifies the registrant (person for whom the key is issued)
 * and the application to which the key can be applied. 
 */
export interface JetRegistration {
    /** Issuer: The issuer of the key.
     * Should be a fully qualified domain name. 
     * 
     * For example, 
     * ```"neo4j.com".```
     * 
     * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.1}
     */
    iss: StringOrURI;

    /** Issued At Time: When the key was issued.
     * 
     * For example, 
     * ```1574760713```
     * 
     * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-2}
     */
    iat: NumericDate;

    /** Audience: The application enabled by the key. 
     * Should be a URN of the form "urn:app:domain/app". 
     * 
     * The 'domain' is the publisher expressed as a registered domain. 
     * The 'app' is a publisher scoped unique name. 
     * 
     * For example, 
     * ```"urn:app:neo4j.com/neo4j-desktop"```
     * 
     * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.3}
     */
    aud: StringOrURI;

    /**
     * Expiration: Specifies the exact moment when the key will become invalid. 
     * 
     * For example, 
     * ```1574760713```
     * 
     * See {@link https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32#section-4.1.4}
     */
    exp: NumericDate;

    /**
     * Not Before Time: Specifies the exact moment before the key remains invalid. 
     * 
     * For example, 
     * ```1574760713```
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
     * 23TplPdS
     * 46Juzcyx
     * dBvJIh-H
     * 2WEKaVNO
     * ```
     */
    jti: Base64String;

    /**
     * Name: the full name of the registrant for whom the key is issued.
     * 
     * For example, 
     * ```"Bob the Builder"```
     * 
     * See {@link https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims}
     */
    name: string;


    /**
     * Email: the registrant's email address.
     * 
     * For example, 
     * ```"bob@build.it"```
     * 
     * See {@link https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims}
     */
    email: Email;

    /**
     * User identity: The unique identity of the registrant. 
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
     * "user_id":"google-oauth2|123456"
     * "user_id":"self|7A8CF3A4-272B-46C9-931D-CBD9BCFA4045"
     * "user_id":"mkto|AZ24L2B"
     * ```
     * 
     * See {@link https://auth0.com/docs/users/normalized/auth0/identify-users}
     */
    user_id: PipedString;

    /**
     * Version: SemVer range of versions enabled by the key. 
     * 
     * Examples:
     * ```
     * 1.x
     * >=2.5.0
     * 5.0.0 - 7.2.3
     * ```
     * 
     * See {@link https://devhints.io/semver | SemvVer cheatsheet}
     * See {@link https://semver.npmjs.com | SemVer Calculator}
     */
    ver: SemVerRangeString;

    /**
     * Scope: application specific features or qualifications granted to the registrant.
     * 
     * For example,
     * ```pro experimental sitewide```
     * 
     * See {@link https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims}
     */
    scope?: SpacedString;

}