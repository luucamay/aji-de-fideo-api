# Learning notes

## Create HTTP Server in Node JS

### What is HTTP?
It is an application level PROTOCOL for application delivery and content transfer.
* It uses TCP as a TRANSFER protocol
* HTTP Server: Receives requests from user and gives a RESPONSE to the REQUEST.

## What are enviroment variables?
They are part of the SO where your NodeJs application is running.
The ```env``` OBJECT stores all the enviroment variables availabe.
You can access their VALUE with ```process.env['VARNAME']```
Here you can see a list of common enviroment variables:

| VARIABLE | VALUE                     |
|----------|---------------------------|
| HOME     | /home/sammy               |
| PATH     | '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin'  |
| PWD      | /home/sammy/first-program |

