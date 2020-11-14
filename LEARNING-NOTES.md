# Learning Notes about Authentication

To get started there is two parts when it comes to authentication:
* verify a token (authenticate)
* generate a token

## What is the Token Secret?
It is a super long and super random string used to encrypt and decrypt data.

Please store it inside the .env file:
```TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...```

### Generate a secret?
Use the Node’s **crypto** library:
```> require('crypto').randomBytes(64).toString('hex')```

### Bearer Authentication
Also called **token authentication** is an HTTP authentication scheme that involves security tokens called bearer tokens.
It is an opaque string, it does not have a meaning to clients.
They can be:
  * short string of hexadecimal characters
  * structured tokens such as JSON Web Tokens.
Understood as "give access to the bearer of this token".
Originally created as part of [OAuth 2.0](https://swagger.io/docs/specification/authentication/oauth2/) in [RFC6750](https://tools.ietf.org/html/rfc6750)
These tokens are the predominant type of access token used with OAuth 2.0