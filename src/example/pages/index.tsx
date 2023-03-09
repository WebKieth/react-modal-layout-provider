import { useNavigate } from "react-router-dom"
import { ModalLayoutProvider, useModalLayoutProvided } from "../../lib/ModalLayoutProvider"
import { BackIcon } from "../common/icons/BackIcon"
import { Button } from "../common/ui/Button"

const ParentComponent = () => {
    return <div>
        <div>Parent Component Example</div>
        <ChildComponent />
    </div>
}

const ChildComponent = () => {
    const { open } = useModalLayoutProvided()
    return <Button onClick={() => {
        open('DialogWindow')
    }}>click</Button>
}

const DialogWindow = () => {
    const { close } = useModalLayoutProvided();
    return (
      <div className="w-full bg-yellow-400 px-4 py-3">
        <h2 className="text-xl">Dialog Window</h2>
        <Button onClick={() => close("DialogWindow")}>close</Button>
      </div>
    );
};


export const BasicExample = () => {
    const navigate = useNavigate()
    return <ModalLayoutProvider dialogs={[DialogWindow]}>
      <div className="w-full flex items-center px-6 py-4 border-b border-gray-300">
        <BackIcon className='mr-6' onClick={() => navigate('/')}/>
        <div className="flex flex-col">
            <h1 className="text-lg mb-1">Basic Example</h1>
            <pre>{`Form => Confirm => Notify`}</pre>
        </div>
      </div>
      <div className="px-10 py-12">
        <ParentComponent />
      </div>
    </ModalLayoutProvider>
}