import { PropsWithChildren } from "react";

// propsWithChildren
type UIModalProps = PropsWithChildren & {
    onClose: (isClosed: boolean) => void;
}

const UIModal = (props: UIModalProps) => {
    
    return (
        <div className={"uiModal"}>
            <div className={"uiModalContent"}>
                <button
                    className={"uiModalCloseBtn"}
                    onClick={() => props.onClose(false)}
                >
                    X
                </button>
                {props.children}
            </div>
        </div>
    )
}

export default UIModal;