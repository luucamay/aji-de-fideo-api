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



