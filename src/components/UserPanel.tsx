'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Conditional from '@/components/common/Conditional'
import { EventsContext } from '@/contexts/EventsContext'
import { UserContext } from '@/contexts/UserContext'
import { useMutation } from '@tanstack/react-query'
import { logoutFromAccount } from '@/api-client'
import { EventName } from '@/constants'

export type UserPanelProps = {}
export default function UserPanel(props: UserPanelProps) {
  const { push } = useRouter()
  const { emitter } = useContext(EventsContext)!
  const { currentUser, setCurrentUser } = useContext(UserContext)!

  const logout = useMutation({
    mutationFn: logoutFromAccount,
    onSuccess: () => {
      console.log('logged out')
      setCurrentUser(null)
      push('/')
    },
  })

  return (
    <div>
      <Conditional condition={!currentUser}>
        <div className={'flex flex-col'}>
          <div className={'min-w-[200px] text-center'}>You are not logged in</div>

          <button
            className={'min-w-[100px] text-center border-2 border-indigo-300 rounded px-4 py-2 hover:bg-indigo-900 active:bg-indigo-700'}
            onClick={() => {
              emitter.emit(EventName.LoginRequested)
            }}

          >Login
          </button>
        </div>


      </Conditional>
      <Conditional condition={!!currentUser}>
        <div className={'flex flex-row space-x-2 place-items-center place-content-center'}>
          <div
            className={'min-w-[140px] min-h-[60px] text-center border-2 border-indigo-300 rounded p-1'}>Logged
            in
            as
            <span className={'font-bold'}> {currentUser?.username}</span></div>
          <div
            className={'min-w-[140px] min-h-[60px] text-md text-center border-2 border-indigo-300 rounded p-1'}>
            <div className={'font-bold'}>{currentUser?.displayName}</div>
          </div>
          <button
            className={'min-w-[100px] text-center border-2 border-indigo-300 rounded px-4 py-2 hover:bg-indigo-900 active:bg-indigo-700'}
            onClick={async () => {
              await logout.mutateAsync()
            }}
          >Logout
          </button>
        </div>
      </Conditional>
    </div>
  )
}

