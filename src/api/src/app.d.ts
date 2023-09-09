module NodeJS {
  interface ProcessEnv {
    readonly BIRTHDAY_STORAGE_FILE?: string
  }
}

interface Person {
  id: string
  name: string
  birth: string
}

type StoragePerson = { [id: string]: Person }
