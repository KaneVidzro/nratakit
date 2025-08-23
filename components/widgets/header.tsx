import * as React from 'react'
import { Container } from '@/components/widgets/container'

function Header() {
  return (
    <div>
      <header>
        <Container className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-gray-900">MySite</h1>
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export { Header }
