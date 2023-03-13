import { useNavigate } from "react-router-dom"
import { ModalLayoutProvider, useModalLayoutProvided } from "../../lib"
import { BackIcon } from "../common/icons/BackIcon"
import { Button } from "../common/ui/Button"
import { FirstDialogWindow, SecondDialogWindow } from "../dialogs"
const ParentComponent = () => {
    return <div>
        <div>Parent Component Example</div>
        <ChildComponent />
    </div>
}

const ChildComponent = () => {
    const { open } = useModalLayoutProvided()
    return <Button onClick={() => {
        open('FirstDialogWindow')
    }}>click</Button>
}
export const BasicExample = () => {
    const navigate = useNavigate()
    return <ModalLayoutProvider dialogs={[FirstDialogWindow, SecondDialogWindow]}>
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