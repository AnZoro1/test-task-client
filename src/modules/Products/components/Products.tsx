import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../features/store/store";
import Table from "../../shared/Table/Table";
import { getProductsReq } from "../slice/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";
import { SearchProps } from "../api/types";

const Products: React.FC<SearchProps> = ({ search, active, modal, setModal }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProductsReq())
    }, [])


    const productsState = useSelector((state: RootState) => state.productsSlice.products)

    const productsWithSearch = productsState.filter((product) => {
        if (search) {
            return product?.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;

    })

    const productsWithActive = productsWithSearch.filter((product) => {
        if (active && active !== 'all') {
            return product?.active === true
        }

        return true
    })

    return (
        <div>
            <Table data={productsWithActive} modal={modal} setModal={setModal} />
        </div>
    );
};

export default Products;