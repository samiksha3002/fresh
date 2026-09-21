"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const searchParams = useSearchParams()

  const redirectUrl = searchParams.get("redirect") || ""

  const initialView =
    searchParams.get("view") === "register"
      ? LOGIN_VIEW.REGISTER
      : LOGIN_VIEW.SIGN_IN

  const [currentView, setCurrentView] =
    useState<LOGIN_VIEW>(initialView)

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login
          setCurrentView={setCurrentView}
          redirectUrl={redirectUrl}
        />
      ) : (
        <Register
          setCurrentView={setCurrentView}
          redirectUrl={redirectUrl}
        />
      )}
    </div>
  )
}

export default LoginTemplate