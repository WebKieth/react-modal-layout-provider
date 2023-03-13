import { createContext, useContext } from "react"
import { TDialogsRef, TFormsRef, TNotifiesRef } from "./typed"

const ModalLayoutContext = createContext<{
    dialogs: TDialogsRef | null
    forms: TFormsRef | null
    notifies: TNotifiesRef | null
    open: (key: string) => void
    close: (key: string) => void
}>({
    dialogs: null,
    forms: null,
    notifies: null,
    open: () => {},
    close: () => {},
})

const useModalLayoutProvided = () => useContext(ModalLayoutContext)

export { ModalLayoutContext, useModalLayoutProvided }