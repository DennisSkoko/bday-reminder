import { useSuspenseQuery } from '@tanstack/react-query'
import { PersonEdit } from './PersonEdit'
import classes from './PersonList.module.css'

export interface Person {
  id: string
  name: string
  birthday: string
}

export function PersonList({ }) {
  const { data: people, refetch } = useSuspenseQuery<Person[]>({
    queryKey: ['person'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/person`)

      if (!response.ok) throw new Error('Failed to fetch data')

      return response.json()
    }
  })

  return (
    <ul className={classes.list}>
      {people.map(person => (
        <li key={person.id}>
          <PersonEdit person={person} onUpdated={refetch} />
        </li>
      ))}

      <PersonEdit onUpdated={refetch} />
    </ul>
  )
}
