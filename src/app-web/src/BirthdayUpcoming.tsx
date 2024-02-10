import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'
import classes from './BirthdayUpcoming.module.css'

export interface BirthdayUpcoming {
  id: string
  name: string
  birthday: string
}

function getAge(date: string) {
  const [year] = date.split('-')

  return new Date().getFullYear() - parseInt(year, 10)
}

export function BirthdayUpcoming({ }) {
  const { data } = useSuspenseQuery<BirthdayUpcoming[]>({
    queryKey: ['birthday/upcoming'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/birthday/upcoming`)

      if (!response.ok) throw new Error('Failed to fetch data')

      return response.json()
    }
  })

  const upcomingBirthdays = data.map(birthday => ({ ...birthday, age: getAge(birthday.birthday) }))

  return (
    <ul className={classes.list}>
      {upcomingBirthdays.map(birthday => (
        <li key={birthday.id} className={classes.card}>
          <h2>{birthday.name}</h2>
          <p>fyller {birthday.age} år den {format(birthday.birthday, 'do MMMM', { locale: sv })}</p>
        </li>
      ))}
    </ul>
  )
}
