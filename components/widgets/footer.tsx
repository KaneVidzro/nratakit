import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/widgets/container'

function Footer() {
  return (
    <footer className={cn('bg-gray-900 text-gray-300', 'py-8')}>
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row py-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MySite. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
