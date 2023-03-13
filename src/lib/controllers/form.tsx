import { Dialog } from "@headlessui/react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { TModalController } from "../typed";
interface IFormController extends TModalController {
  loading: boolean;
  setLoading: (value: boolean) => void;
}
export const FormController = forwardRef<
  IFormController,
  { children: ReactNode }
>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      isOpen,
      loading,
      setLoading: (value) => setLoading(value),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    []
  );
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      {children}
    </Dialog>
  );
});
