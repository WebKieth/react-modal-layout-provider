import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TModalController } from "../typed";

interface INotifyController extends TModalController {
  timeout: number;
}
export const NotificationController = forwardRef<
  INotifyController,
  { children: ReactNode; timeout: number }
>(({ children, timeout }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (timeout === 0) return;
    if (isOpen === true) {
      timer.current = setTimeout(() => setIsOpen(false), timeout);
    } else clearTimeout(timer.current);
    return () => clearTimeout(timer.current);
  }, [isOpen]);
  useImperativeHandle(
    ref,
    () => ({
      isOpen,
      timeout,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    []
  );
  return <div className="notification-controller">{children}</div>;
});
