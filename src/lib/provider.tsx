import { createRef, useRef } from "react";
import {
  TDialogsRef,
  TFormsRef,
  TModalLayoutProps,
  TNotifiesRef,
} from "./typed";
import {
  DialogController,
  FormController,
  NotificationController,
} from "./controllers";
import { ModalLayoutContext } from "./context";

export const ModalLayoutProvider = ({
  children,
  dialogs,
  forms,
  notifies,
  options,
}: TModalLayoutProps) => {
  const dialogsRef = useRef<TDialogsRef>(
    (() => {
      const obj: TDialogsRef = {};
      dialogs?.forEach((fn) => (obj[fn.name] = createRef()));
      return obj;
    })()
  );
  const formsRef = useRef<TFormsRef>(
    (() => {
      const obj: TFormsRef = {};
      forms?.forEach((fn) => (obj[fn.name] = createRef()));
      return obj;
    })()
  );
  const notifiesRef = useRef<TNotifiesRef>(
    (() => {
      const obj: TNotifiesRef = {};
      notifies?.forEach((fn) => (obj[fn.name] = createRef()));
      return obj;
    })()
  );
  const open = (key: string) => {
    const currentRef = dialogsRef.current[key] || formsRef.current[key] || notifiesRef.current[key];
    if (currentRef.current === null) return false;
    currentRef.current.open();
    return true;
  };
  const close = (key: string) => {
    const currentRef = dialogsRef.current[key] || formsRef.current[key] || notifiesRef.current[key];
    if (currentRef.current === null) return false;
    currentRef.current.close();
    return true;
  };
  return (
    <ModalLayoutContext.Provider
      value={{
        dialogs: dialogsRef.current,
        forms: formsRef.current,
        notifies: formsRef.current,
        open,
        close,
      }}
    >
      {children}
      <div id="modal-layout_forms" className="z-10">
        {forms?.map((Component) => {
          return (
            <FormController
              ref={formsRef.current[Component.name]}
              key={Component.name}
            >
              <Component />
            </FormController>
          );
        })}
      </div>
      <div id="modal-layout_dialogs" className="z-20">
        {dialogs?.map((Component) => {
          return (
            <DialogController
              ref={dialogsRef.current[Component.name]}
              key={Component.name}
            >
              <Component />
            </DialogController>
          );
        })}
      </div>
      <div id="modal-layout_notifies" className="z-30">
        {notifies?.map((Component) => {
          return (
            <NotificationController
              ref={notifiesRef.current[Component.name]}
              key={Component.name}
              timeout={options?.notifyCloseTimeout || 0}
            >
              <Component />
            </NotificationController>
          );
        })}
      </div>
    </ModalLayoutContext.Provider>
  );
};
