import {gridPageCountSelector, gridPaginationModelSelector, useGridApiContext, useGridSelector} from "@mui/x-data-grid";
import {Pagination} from "@mui/material";

export function ResultsPagination() {
    const apiRef = useGridApiContext();
    const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            count={pageCount}
            page={paginationModel.page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}