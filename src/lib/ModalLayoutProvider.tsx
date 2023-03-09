import { createContext, createRef, forwardRef, ReactNode, RefObject, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { TModalLayoutProps, TFormsRef, TNotifiesRef, TDialogsRef } from "./typed";
import { Dialog } from '@headlessui/react'

export type IModalController = {
    open: () => void
    close: () => void
    isOpen: boolean
}
export interface IDialogController extends IModalController {
    toggle: () => void
}
export interface IFormController extends IModalController {
    loading: boolean
    setLoading: (value: boolean) => void
}
export interface INotifyController extends IModalController {
    timeout: number
}
type IDialogControllerProps = {
    children: ReactNode
}
type IFormControllerProps = {
    children: ReactNode
}
type INotifyControllerProps = {
    children: ReactNode
    timeout: number
}
export const DialogController = forwardRef<IDialogController, IDialogControllerProps>(({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(
        ref,
        () => ({
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
            toggle: () => setIsOpen((_) => !_),
            isOpen,
        }),
        [],
    )
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            {children}
        </Dialog>
    )
})

export const FormController = forwardRef<IFormController, IFormControllerProps>(({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    useImperativeHandle(
        ref,
        () => ({
            isOpen,
            loading,
            setLoading: (value) => setLoading(value),
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }),
        [],
    )
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            {children}
        </Dialog>
    )
})

export const NotificationController = forwardRef<INotifyController, INotifyControllerProps>(({ children, timeout }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const timer = useRef<number | undefined>(undefined)
    useEffect(() => {
        if (timeout === 0) return
        if (isOpen === true) {
            timer.current = setTimeout(() => setIsOpen(false), timeout)
        } else clearTimeout(timer.current)
        return () => clearTimeout(timer.current)
    }, [isOpen])
    useImperativeHandle(
        ref,
        () => ({
            isOpen,
            timeout,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }),
        [],
    )
    return (
        <div className="notification-controller">
            {children}
        </div>
    )
})


const ModalLayoutContext = createContext<{
    dialogs: TDialogsRef | null
    forms: TFormsRef | null
    open: (key: string) => void
    close: (key: string) => void
}>({
    dialogs: null,
    forms: null,
    open: () => {},
    close: () => {}
})

export const ModalLayoutProvider = ({
    children,
    dialogs,
    forms,
    notifies,
    options,
}: TModalLayoutProps) => {
    const dialogsRef = useRef<TDialogsRef>(( () => {
        const obj: TDialogsRef = {}
        dialogs?.forEach((fn) => obj[fn.name] = createRef())
        return obj
    })())
    const formsRef = useRef<TFormsRef>(( () => {
        const obj: TFormsRef = {}
        dialogs?.forEach((fn) => obj[fn.name] = createRef())
        return obj
    })())
    const notifiesRef = useRef<TNotifiesRef>(( () => {
        const obj: TNotifiesRef = {}
        dialogs?.forEach((fn) => obj[fn.name] = createRef())
        return obj
    })())
    const open = (key: string) => {
        const currentRef = dialogsRef.current[key] || formsRef.current[key]
        if (currentRef.current === null) return false
        currentRef.current.open()
        return true
    }
    const close = (key: string) => {
        const currentRef = dialogsRef.current[key] || formsRef.current[key]
        if (currentRef.current === null) return false
        currentRef.current.close()
        return true
    }
    return <ModalLayoutContext.Provider value={{ dialogs: dialogsRef.current, forms: formsRef.current, open, close }}>
        {children}
        <div id='modal-layout_forms' className="z-10">
            {forms?.map((Component => {
                return <FormController ref={formsRef.current[Component.name]} key={Component.name}>
                    <Component />
                </FormController>
            }))}
        </div>
        <div id='modal-layout_dialogs' className="z-20">
            {dialogs?.map((Component => {
                return <DialogController ref={dialogsRef.current[Component.name]} key={Component.name}>
                    <Component />
                </DialogController>
            }))}
        </div>
        <div id='modal-layout_notifies' className="z-30">
            {notifies?.map((Component => {
                return <NotificationController ref={notifiesRef.current[Component.name]} key={Component.name} timeout={options?.notifyCloseTimeout || 0}>
                    <Component />
                </NotificationController>
            }))}
        </div>
    </ModalLayoutContext.Provider>
}


export const useModalLayoutProvided = () => useContext(ModalLayoutContext)