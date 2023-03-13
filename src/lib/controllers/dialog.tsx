import { Dialog } from "@headlessui/react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { TModalController } from "../typed";

interface IDialogController extends TModalController {
  toggle: () => void;
}

export const DialogController = forwardRef<
  IDialogController,
  { children: ReactNode }
>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((_) => !_),
      isOpen,
    }),
    []
  );
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </Dialog>
  );
});
