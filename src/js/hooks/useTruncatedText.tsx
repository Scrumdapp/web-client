import React, { useState, useLayoutEffect } from 'react'
import Modal from "../../components/generic/modal/Modal.tsx";
import { useModalState } from './useModalState.ts';
import ModalActionRow from '../../components/generic/modal/components/ModalActionRow.tsx';
import ModalHeadText from '../../components/generic/modal/components/ModalHeadText.tsx';
import { useTranslation } from 'react-i18next';

const useTruncatedText = ({ ref }: {ref: any}) => {
    const [isTruncated, setIsTruncated] = useState(false);

     useLayoutEffect(() => {
        const { offsetHeight, scrollHeight } = ref.current || {};
        if(offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false)
        }

     }, [ref]);

  return {
    isTruncated,
  }
}

export default function TruncatedText({ modalTitle, text }: { modalTitle: string; text: string }) {
    const ref = React.useRef(null);
    const { t } = useTranslation();
    const { isTruncated } = useTruncatedText({ ref });
    const modal = useModalState();

    const handleReadMore = () => {
        if(modal.isOpen) return;
        modal.open();
    }

    const handleClose = () => {
        if(!modal.isOpen) return;
        modal.close();
    }

    return (
        <div>
            <p ref={ref} className={`break-words line-clamp-2`}>{text}</p>
            {isTruncated && (
                <button onClick={handleReadMore} className="btn-text">
                    {t("checkpoint.modal.readmore")}
                </button>
            )}
            <Modal state={modal} className="max-w-md">
                <div className="space-y-5">
                    <ModalHeadText>
                        {modalTitle}
                    </ModalHeadText>
                    <div className="flex flex-col space-y-2 w-full overflow-y-auto max-h-96">
                        <p>{text}</p>
                    </div>
                    <ModalActionRow>
                        <button
                            className="btn border"
                            onClick={handleClose}
                            type="button"
                        >
                        {t("checkpoint.modal.close")}
                        </button>
                    </ModalActionRow>
                </div>
            </Modal>
        </div>
    )
}