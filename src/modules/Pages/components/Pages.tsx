import { useEffect } from "react";
import { useAppDispatch } from "../../../features/store/store";
import Table from "../../shared/Table/Table";

import { useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";
import { SearchProps } from "../api/types";
import { getPagesReq } from "../slice/pagesSlice";

const Pages: React.FC<SearchProps> = ({ search, active, modal, setModal }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPagesReq())
    }, [])


    const pagesState = useSelector((state: RootState) => state.pagesSlice.pages)

    const pagesWithSearch = pagesState.filter((page) => {
        if (search) {
            return page?.title.toLowerCase().includes(search.toLowerCase());
        }
        return true;

    })

    const pagesWithActive = pagesWithSearch.filter((page) => {
        if (active && active !== 'all') {
            return page?.active === true
        }

        return true
    })

    return (
        <div>
            <Table data={pagesWithActive} modal={modal} setModal={setModal} />
        </div>
    );
};

export default Pages;