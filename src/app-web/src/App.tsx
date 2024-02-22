import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BirthdayUpcoming } from './BirthdayUpcoming'
import { Suspense } from 'react'
import classes from './App.module.css'
import { PersonList } from './PersonList'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={classes.container}>
        <Suspense fallback={null}>
          <div className={classes.content}>
            <div className={classes.jumbotron}>
              <BirthdayUpcoming />
            </div>
            <PersonList />
          </div>
        </Suspense>
      </main>
    </QueryClientProvider>
  )
}
