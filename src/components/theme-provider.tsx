"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Forced to light: there is no product UI yet, so neither an OS-level dark
// preference nor a theme toggle should be able to switch this placeholder
// to dark. Revisit when a real theme toggle ships.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="light"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
