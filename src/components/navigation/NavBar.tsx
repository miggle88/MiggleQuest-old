'use client'

import NavLink from '@/components/navigation/NavLink'
import NavButton from '@/components/navigation/NavButton'
import { useContext, useState } from 'react'
import { NavBarContext } from '@/contexts/NavBarContext'
import Conditional from '@/components/common/Conditional'

export type NavBarProps = {}

export default function NavBar(props: NavBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const context = useContext(NavBarContext)

  return (<div className={'w-full bg-indigo-700 flex flex-row space-x-16 place-items-center px-4 py-2'}>
    <div className={'text-3xl text-indigo-300'}>
      MiggleQuest
    </div>
    <NavLink href={'leaderboard'}>Leaderboard</NavLink>
    <div className={'w-full'}/>
    <Conditional condition={!isLoggedIn}>
      <NavButton onClick={() => context.loginRequested && context.loginRequested()}>
        Signup or Login
      </NavButton>
    </Conditional>
  </div>)
}

