import classNames from 'classnames'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Person } from './PersonList'
import classes from './PersonEdit.module.css'

export interface PersonEdit {
  person?: Person
  onUpdated: () => void
}

type ExistingOrNewPerson = Person | Omit<Person, 'id'>

export function PersonEdit(props: PersonEdit) {
  const [person, setPerson] = useState<ExistingOrNewPerson>(props.person || {
    name: '',
    birthday: ''
  })

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPerson(currentPerson => ({ ...currentPerson, name: event.target.value }))
  }, [setPerson])

  const handleBirthdayChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPerson(currentPerson => ({ ...currentPerson, birthday: event.target.value }))
  }, [setPerson])

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch(`${import.meta.env.VITE_API_URL}/person`, {
      method: 'PUT',
      body: JSON.stringify(person),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      props.onUpdated()

      if (!('id' in person)) {
        setPerson({ name: '', birthday: '' })
      }
    }
  }, [person])

  const handleDeleteClick = useCallback(async () => {
    if (window.confirm(`Are you sure you want to delete the birthday for ${person.name}?`) && 'id' in person) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/person/${person.id}`, {
        method: 'DELETE'
      })

      if (response.ok) props.onUpdated()
    }
  }, [])

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        className={classNames(classes.input, classes.name)}
        type='text'
        value={person.name}
        onChange={handleNameChange}
      />

      <input
        className={classNames(classes.input, classes.date)}
        type='date'
        value={person.birthday}
        onChange={handleBirthdayChange}
      />

      <div className={classes.actions}>
        {'id' in person && (
          <button
            className={classNames(classes.button, classes.danger)}
            type='button'
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        )}

        <button className={classes.button} type='submit'>Save</button>
      </div>
    </form>
  )
}
