import { registration, dateToNumericDate, isDomainName, isApplicationUrn, isEmail, isPipedString, isSemverRange } from '../src';
import moment from 'moment';

const faker = require('faker');

const fakeName = () => faker.name.findName();
const emailFor = (name:string):string => `${name.replace('. ','_').replace(/\s/g,'.').toLowerCase()}@${faker.internet.domainName()}`
const twitterAccount = ():string => `twitter|${faker.internet.userName()}`;

const fakeRegistration = () => {
  const iss = 'neo4j.com';
  const aud = 'urn:app:neo4j.com/neo4j-desktop';
  const exp = dateToNumericDate(moment().add(1, 'year').toDate());
  const name = fakeName();
  const email = emailFor(name);
  const user_id = twitterAccount();
  const ver = ">=1.2.0"

  return { iss, aud, exp, email, name, user_id, ver }
}

describe('JSON Entitlement Tokens', () => {
  it('are well defined', () => {
    const aJet = registration(fakeRegistration());
    expect(aJet.iss).toBeDefined();
    expect(aJet.aud).toBeDefined();
    expect(aJet.exp).toBeDefined();
    expect(aJet.nbf).toBeDefined();
    expect(aJet.iat).toBeDefined();
    expect(aJet.name).toBeDefined();
    expect(aJet.email).toBeDefined();
    expect(aJet.user_id).toBeDefined();
    expect(aJet.ver).toBeDefined();
    expect(aJet.jti).toBeDefined();
  });
});

describe('can validate field content', () => {
  it('checks for valid domains', () => {
    expect( isDomainName(faker.internet.domainName()) ).toBeTruthy();
    expect( isDomainName(faker.internet.ip()) ).toBeFalsy();
  });
  it('checks for valid application URNs', () => {
    expect ( isApplicationUrn('urn:app:neo4j.com/neo4j-desktop') ).toBeTruthy();
    expect ( isApplicationUrn('neo4j.com/neo4j-desktop') ).toBeFalsy();
  });
  it('checks for valid email address', () => {
    expect ( isEmail('andreas@neo4j.com') ).toBeTruthy();
    expect ( isEmail('nobody@nowhere') ).toBeFalsy();
  });
  it('checks for valid user_ids', () => {
    expect( isPipedString( "google-oauth2|123456") ).toBeTruthy();
    expect( isPipedString( "self|7A8CF3A4-272B-46C9-931D-CBD9BCFA4045" )).toBeTruthy();
    expect( isPipedString( "mkto|AZ24L2B" )).toBeTruthy();
  });
  it('checks for valid semver range', () => {
    expect( isSemverRange( "1.x") ).toBeTruthy();
    expect( isSemverRange( ">=1.2.0") ).toBeTruthy();
    expect( isSemverRange( "^0.1.0") ).toBeTruthy();
    expect( isSemverRange( "~0.1.0") ).toBeTruthy();
    expect( isSemverRange( "<2.0.0") ).toBeTruthy();
    expect( isSemverRange( "a.1.x") ).toBeFalsy();
  });
  it('checks for well-formed registration (JET payload)', () => {

  })
});
