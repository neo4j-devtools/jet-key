# JET-Key

A library for enabling users to access software features. 

## Similar to a JWT, but with a different purpose 

A "JSON Enablement Token" is the shape of a JWT and signed like a JWT, but with specific fields that are
useful for use as a software key. A JWT is used to grant an authenticated user access to a protected resource. A JET is used
to verify that a particular registrant has been granted access to software features. A JWT usually lives for hours
or days and is exchanged during a trusted network flow. A JET lasts for a year or more and is probably delivered to the registrant via email. 

## Why? 

The historic battles of software publishers versus pirates are mostly over, yet sometimes the internet is not a thing and people still need to manage who gets access to what. 

This is about "enabling" people to get access to stuff. Not about enforcement or compliance. 
