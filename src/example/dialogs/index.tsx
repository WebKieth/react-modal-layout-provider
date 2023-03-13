import { useModalLayoutProvided } from "../../lib"
import { Button } from "../common/ui/Button"

export const FirstDialogWindow = () => {
    const { open, close } = useModalLayoutProvided();
    return (
      <div className="w-full bg-yellow-400 px-4 py-3">
        <h2 className="text-xl">First Dialog Window</h2>
        <Button onClick={() => open("SecondDialogWindow")}>open second</Button>
        <Button onClick={() => close("FirstDialogWindow")}>close</Button>
      </div>
    );
};
export const SecondDialogWindow = () => {
    const { close } = useModalLayoutProvided();
    return (
      <div className="w-full bg-yellow-400 px-4 py-3">
        <h2 className="text-xl">Second Dialog Window</h2>
        <Button onClick={() => close("SecondDialogWindow")}>close</Button>
      </div>
    );
};