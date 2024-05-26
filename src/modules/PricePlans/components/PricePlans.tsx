import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../features/store/store";
import Table from "../../shared/Table/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";
import { SearchProps } from "../api/types";
import { getPricePlansReq } from "../slice/pricePlansSlice";

const PricePlans: React.FC<SearchProps> = ({ search, active, modal, setModal }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPricePlansReq())
    }, [])


    const pricePlansState = useSelector((state: RootState) => state.pricePlansSlice.pricePlans)

    const pricePlansWithSearch = pricePlansState.filter((pricePlan) => {
        if (search) {
            return pricePlan?.description.toLowerCase().includes(search.toLowerCase());
        }
        return true;

    })

    const pricePlansWithActive = pricePlansWithSearch.filter((pricePlan) => {
        if (active && active !== 'all') {
            return pricePlan?.active === true
        }

        return true
    })

    return (
        <div>
            <Table data={pricePlansWithActive} modal={modal} setModal={setModal} />
        </div>
    );
};

export default PricePlans;