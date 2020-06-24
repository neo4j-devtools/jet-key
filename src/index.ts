import { JetRegistration, StringOrURI, NumericDate, Email, PipedString, SemVerRangeString, URI } from './types';

import shortid from 'shortid';
import { Moment } from 'moment';

const semverValidRange = require('semver/ranges/valid');
const jsra = require('jsrsasign');

/**
 * Convert a standard javascript Date into a NumericDate.
 *
 * @param d
 */
export const dateToNumericDate = (d: Date) => Math.floor(d.getTime() / 1000);

/**
 * Convert datetime in milliseconds into a NumericDate.
 *
 * @param millis
 */
export const millisecondsToNumericDate = (millis: number) => Math.floor(millis / 1000);

/**
 * Convert a momentjs date into a NumericDate.
 *
 * @param m
 */
export const momentToNumericDate = (m: Moment) => m.unix();

/**
 * Predicate check for valid domain name.
 *
 * @param s
 */
export const isDomainName = (s: string) =>
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(s);

/**
 * Predicate check for valid email address.
 *
 * @param s
 */
export const isEmail = (s: string) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\b/.test(
    s
  );

/**
 * Predicate check for a pipe separated string as used by the `user_id` field.
 *
 * @param s
 */
export const isPipedString = (s: string) => /\b[\w-]+\|[\w-]+\b/.test(s);

/**
 * Predicate check for well-formed application URN, as used in `aud` field.
 *
 * @param param0
 */
export const isApplicationUrn = (s: string) => /^urn:app:[a-z0-9.-]+\/.+$/.test(s);

export const isSemverRange = (s: string) => semverValidRange(s);

export const isUri = (s: string) => /(\w+:){1,2}(\/\/)?([-a-zA-Z0-9:@;?&=/%+.*!'(),$_{}~[\]`#|]+)/.test(s);

export const isStringOrUri = (s: string) => (/:/.test(s) ? isUri(s) : true);

export const isWellFormedRegistration = (reg: JetRegistration) => {
  return (
    isApplicationUrn(reg.aud) &&
    reg.sub &&
    isPipedString(reg.sub) &&
    isDomainName(reg.iss) &&
    isEmail(reg.email) &&
    isSemverRange(reg.ver)
  );
};

/**
 * Generates a complete, well-formed JET registration payload.
 *
 * @param payload required and optional fields of the payload
 */
export const registration = ({
  iss,
  pub,
  aud,
  exp,
  name,
  email,
  sub,
  org,
  ver,
  nbf,
  scope,
  website,
  registry,
}: {
  iss: StringOrURI;
  pub?: StringOrURI;
  aud: StringOrURI;
  exp: NumericDate;
  name: string;
  email: Email;
  sub: PipedString;
  org: StringOrURI;
  ver: SemVerRangeString;
  nbf?: NumericDate;
  scope?: string[];
  website?: URI;
  registry?: StringOrURI;
}): JetRegistration => {
  const tNow = dateToNumericDate(new Date());
  const iat = tNow;
  const jti = shortid.generate();
  const impliedNbf = nbf || iat;
  const joinedScope = scope ? scope.join(' ') : null;

  return {
    iss,
    pub,
    aud,
    ver,
    name,
    email,
    org,
    sub,
    iat,
    jti,
    exp,
    website,
    registry,
    nbf: impliedNbf,
    ...(joinedScope && { scope: joinedScope }),
  };
};

export const sign = (secret: string, registration: JetRegistration) => {
  const algo = 'HS256';
  var oHeader = { alg: algo, typ: 'JWT' };
  var sHeader = JSON.stringify(oHeader);
  var sPayload = JSON.stringify(registration);
  console.log(secret, registration);
  return jsra.jws.JWS.sign(algo, sHeader, sPayload, { utf8: secret });
};
