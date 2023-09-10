namespace NodeJS {
  interface ProcessEnv {
    BIRTHDAY_ENDPOINT?: string
    BIRTHDAY_SMTP_HOST?: string
    BIRTHDAY_SMTP_PORT?: string
    BIRTHDAY_SMTP_SECURE?: string
    BIRTHDAY_SMTP_USERNAME?: string
    BIRTHDAY_SMTP_PASSWORD?: string
    BIRTHDAY_NOTIFY_EMAIL?: string
  }
}

interface Person {
  id: string
  name: string
  birthday: string
}
