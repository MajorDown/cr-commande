import { PropsWithChildren, useCallback, useEffect } from "react";

type UIModalProps = PropsWithChildren & {
    onClose: (isClosed: boolean) => void;
}

const UIModal = (props: UIModalProps) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            props.onClose(false);
        }
    }, [props]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
    
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