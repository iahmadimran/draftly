import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header({ children }: HeaderProps) {
  return (
    <div className='header'>
      <Link href={'/'} className='md:flex-1'>
        <Image 
          src={'/assets/icons/logo.svg'} 
          alt='logo with name' 
          width={120}
          height={32}
          className='hidden md:block'
          unoptimized
        />
        <Image 
          src={'/assets/icons/logo-icon.svg'} 
          alt='logo' 
          width={32}
          height={32}
          className='mr-2 md:hidden'
          unoptimized
        />
      </Link>
      {children}
    </div>
  )
}

export default Header
