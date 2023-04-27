import React from "react"
import Link from "next/link"

import { ScrollArea } from "@/components/ui/scroll-area"

type SettingsLayoutProps = {
  children: React.ReactNode
}

const SettiingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex w-64 flex-col ">
        <Link href="./settings/security">Security Settings</Link>
        <Link href="./settings/notifications">Notifications Settings</Link>
        <Link href="./settings/user">User Settings</Link>
      </div>
      <ScrollArea>{children}</ScrollArea>
    </div>
  )
}

export default SettiingsLayout
