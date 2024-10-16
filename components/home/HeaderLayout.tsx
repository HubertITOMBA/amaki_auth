import Link from 'next/link'
import React from 'react'


const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Evenements', href: '#' },
    { name: 'Divers', href: '#' },
    { name: 'Galérie', href: '#' },
  ]
  

const HeaderLayout = () => {
  return (

    <header className='bg-background/80 backdrop-blur-lg sticky top-0 z-[999]'>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

            <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6">
                    {item.name}
                </Link>
                ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link href="/auth/login" className="text-sm font-semibold leading-6">
                    connexion <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>

        </nav>
        
       </header>
       
  )
}

export default HeaderLayout