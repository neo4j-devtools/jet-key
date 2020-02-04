import {JetRegistration, StringOrURI, NumericDate, Email, PipedString, SemVerRangeString } from './types';

import shortid from "shortid";
import { Moment } from 'moment';

const semverValidRange = require('semver/ranges/valid');

/**
 * Convert a standard javascript Date into a NumericDate.
 * 
 * @param d 
 */
export const dateToNumericDate = (d:Date) => Math.floor(d.getTime() / 1000);

/**
 * Convert datetime in milliseconds into a NumericDate.
 * 
 * @param millis
 */
export const millisecondsToNumericDate = (millis:number) => Math.floor(millis / 1000);

/**
 * Convert a momentjs date into a NumericDate.
 * 
 * @param m 
 */
export const momentToNumericDate = (m:Moment) => m.unix();

/**
 * Predicate check for valid domain name.
 * 
 * @param s 
 */
export const isDomainName = (s:string) => /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(s);

/**
 * Predicate check for valid email address.
 * 
 * @param s 
 */
export const isEmail = (s:string) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(s);

/**
 * Predicate check for a pipe separated string as used by the `user_id` field.
 * 
 * @param s
 */
export const isPipedString = (s:string) => /\b[\w-]+\|[\w-]+\b/.test(s);

/**
 * Predicate check for well-formed application URN, as used in `aud` field.
 * 
 * @param param0 
 */
export const isApplicationUrn = (s:string) => /^urn:app:[a-z0-9\.-]+\/.+$/.test(s);

export const isSemverRange = (s:string) => semverValidRange(s);

export const isWellFormedRegistration = (reg:JetRegistration) => {
  return isApplicationUrn(reg.aud) && isPipedString(reg.user_id) && isDomainName(reg.iss) && isEmail(reg.email) && isSemverRange(reg.ver);
}

export const registration = ({ iss, aud, exp, name, email, user_id, ver, nbf }: { iss: StringOrURI; aud: StringOrURI; exp: NumericDate, name:string, email:Email, user_id:PipedString, ver:SemVerRangeString, nbf?:NumericDate }):JetRegistration => {
  
  const tNow = dateToNumericDate(new Date());
  const iat = tNow;
  const jti = shortid.generate()
  const impliedNbf = nbf || iat;

  return { iss, iat, aud, jti, exp, nbf:impliedNbf, name, email, user_id, ver }
}

