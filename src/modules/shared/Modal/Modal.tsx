import { MouseEvent, useState, ChangeEvent } from 'react';
import styles from './Modal.module.scss'
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../features/store/store';
import { sendProductsReq } from '../../Products/slice/productsSlice';
import { sendPricePlansReq } from '../../PricePlans/slice/pricePlansSlice';
import { DataItem } from '../Table/types';
import { sendPagesReq } from '../../Pages/slice/pagesSlice';

interface modalPropsI {
    setModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
    object: DataItem
}

const Modal = ({ setModal, object }: modalPropsI) => {

    const location = useLocation()
    const dispatch = useAppDispatch()

    const [inputText, setInputText] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const sendMutation = () => {
        if (location.pathname === '/products') {
            dispatch(sendProductsReq({ id: object.id, text: inputText }));
            setModal(false)
        } else if (location.pathname === '/pricePlans') {
            dispatch(sendPricePlansReq({ id: object.id, text: inputText }));
            setModal(false)
        } else if (location.pathname === '/pages') {
            dispatch(sendPagesReq({ id: object.id, text: inputText }));
            setModal(false)
        }

    }


    return (
        <div className={styles.container} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <div className={styles.editAndClose}>
                <span> Edit </span>
                <button onClick={() => setModal(false)}>x</button>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.inputName}>
                    {object?.name ? 'Name' : object?.description ? 'Description' : object?.title ? 'Title' : ''}
                </div>
                <input type="text"
                    defaultValue={object?.name || object?.description || object?.title || ''}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.saveContainer}>
                <button onClick={sendMutation}>Save</button>
            </div>

        </div >
    );
};

export default Modal;