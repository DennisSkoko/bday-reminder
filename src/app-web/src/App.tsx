import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BirthdayUpcoming } from './BirthdayUpcoming'
import { Suspense } from 'react'
import classes from './App.module.css'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={classes.container}>
        <Suspense fallback={null}>
          <BirthdayUpcoming />
        </Suspense>
      </main>
    </QueryClientProvider>
  )
}
