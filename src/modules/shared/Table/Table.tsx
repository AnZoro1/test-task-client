import { MouseEvent, useState } from 'react';
import { formatDateTime } from '../../../helpers/formatDateTime';
import styles from './Table.module.scss'
import Modal from '../Modal/Modal';
import ReactDOM from 'react-dom';
import { DataItem } from './types';


interface TableProps<T extends DataItem> {
    data: T[];
    modal: boolean,
    setModal: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

const Table = <T extends DataItem>({ data, modal, setModal }: TableProps<T>) => {

    const [object, setObject] = useState<T | undefined>()

    const handleModal = (e: MouseEvent<HTMLDivElement>, item: T) => {
        e.stopPropagation()
        setObject(item)
        setModal(true)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.columnsHeader}>
                    <div className={styles.name}>{data[0]?.name ? 'Name' : data[0]?.description ? 'Description' : data[1]?.title ? 'Title' : ''}</div>
                    <div className={styles.statusCreatedContainer}>
                        <div className={styles.status}>Status</div>
                        <div className={styles.created}>Created</div>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.columns}>
                        {data?.map((item, index) => {
                            return (
                                <div className={`${styles.contantContainer} ${index % 2 !== 0 ? styles.rowsBC : ''}`} key={item?.id}>
                                    <div>
                                        <div className={styles.nameColumn}>{item?.name || item?.title || item?.description}</div>
                                    </div>

                                    <div className={styles.statusCreatedColumns}>
                                        <div className={styles.statusColumn}>{item?.active ? 'Active' : ''}</div>
                                        <div className={styles.createdColumn}>{item?.createdAt ? formatDateTime(item.createdAt) : item?.publishedAt ? formatDateTime(item.publishedAt) : ''}</div>
                                        <div className={styles.edit} onClick={(e) => handleModal(e, item)}>edit</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {modal && object && ReactDOM.createPortal(
                    <Modal setModal={setModal} object={object} />,
                    document.body // Рендерим дочерний элемент в body
                )}
            </div>


        </>
    );
};

export default Table;