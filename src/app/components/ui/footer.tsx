import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto py-3 bg-footer-inverse text-center">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Robmcd.name. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
