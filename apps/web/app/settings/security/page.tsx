import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SecurityPage = () => {
  return (
    <div>
      <h1>Account Settings</h1>
      <div>
        <h2>Email address</h2>
        <div className="flex flex-row">
          <p>Your email address is email@example.com</p>
          <button>Change</button>
        </div>
        <div>
          <h2>Password</h2>
          <form className="">
            <div className="mb-4 flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <p>Cannot remember your current password?</p>
              <a href="#">Reset your password</a>
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SecurityPage
