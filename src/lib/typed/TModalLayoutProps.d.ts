import { ReactNode } from "react"

export type TModalLayoutProps = {
    children: ReactNode
    dialogs?: Array<() => JSX.Element>
    forms?: Array<() => JSX.Element>
    notifies?: Array<() => JSX.Element>
    options?: {
        notifyCloseTimeout: number
    }
}