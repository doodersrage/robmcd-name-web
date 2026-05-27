import React from 'react'

const Footer = () => {
  return (
    <footer className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] mt-auto py-3 bg-footer-inverse text-center">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Robmcd.name. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
