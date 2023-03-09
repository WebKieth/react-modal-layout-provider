import { MouseEventHandler, ReactNode } from "react"

export type TBasicReactNodeProps = {
    onClick?: MouseEventHandler
    className?: String
    children?: ReactNode
}