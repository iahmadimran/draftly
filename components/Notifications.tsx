'use client';

import { ReactNode } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image'
import { useInboxNotifications, useUnreadInboxNotificationsCount } from '@liveblocks/react/suspense'
import { InboxNotification, InboxNotificationList, LiveblocksUiConfig } from '@liveblocks/react-ui'

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications()
  const { count } = useUnreadInboxNotificationsCount()

  const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt)

  return (
    <Popover>
      <PopoverTrigger className='relative flex items-center justify-between size-10 rounded-lg'>
        <Image
          src={'/assets/icons/bell.svg'}
          alt='notification'
          width={24}
          height={24}
          unoptimized
          className='cursor-pointer'
        />

        {count > 0 && (
          <div className='absolute right-2 top-2 z-20 size-2 bg-blue-500 rounded-full' />
        )}
      </PopoverTrigger>
      <PopoverContent align='end' className='shad-popover'>
        <LiveblocksUiConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>
                {user} mentioned you.
              </>
            )
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className='py-2 text-center text-white'>
                No new notifications
              </p>
            )}

            {unreadNotifications.length > 0 && unreadNotifications.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
                href={`/documents/${notification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread {...props}
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention {...props}
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={<InboxNotification.Icon className="bg-transparent">
                      <Image
                        src={props.inboxNotification.activities[0].data.avatar as string || ''}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </InboxNotification.Icon>}>
                      {props.children}
                    </InboxNotification.Custom>
                  )
                }}
              />
            ))}
          </InboxNotificationList>
        </LiveblocksUiConfig>
      </PopoverContent>
    </Popover>
  )
}

export default Notifications