# Birthday Reminder

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

An app that sends emails whenever it is someone's birthday.

## Requirements
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)

## Installation
To install the dependencies, just execute `npm install`.

## Configuration
To configure the application you can create a `.env` file
where you can set global environment variables within the application.
Following values can be set (format: KEY=VALUE):

- **LOG_LEVEL** - The minimum log level the logger will output. (Default: *info*)
- **EMAIL_PROVIDER** - Which provider to use when setting up the transporter using [Nodemailer](https://nodemailer.com/smtp/well-known/). (Default *Hotmail*)
- **EMAIL_USER** - The username for authentication. (Default *something@example.com*)
- **EMAIL_PASS** - The password for authentication. (Default *secret*)
- **EMAIL_SENDTO** - Which email address to send mail to at the contact page. (Default *receiver@example.com*)

## Usage
To get information on how to use the script then execute:
```
node bin/bday-reminder --help
```

## Testing
To test the application then execute `npm test`.
