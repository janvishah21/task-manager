import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';

import TimeRenderer from './cell-renderers/TimeRenderer';
import LoadingOverlay from './overlays/LoadingOverlay';

export const defaultModules = [
    ClientSideRowModelModule,
    RangeSelectionModule,
    RowGroupingModule,
    RichSelectModule
];

export const defaultFrameworkComponents = {
    // overlays
    // loadingOverlay: LoadingOverlay,
    // cell renderers
    timeRenderer: TimeRenderer
};

export const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 150
};

export const defaultGridOptions = {
    pagination: true,
    paginationAutoPageSize: true,
    // loadingOverlayComponent: 'loadingOverlay',
    // loadingOverlayComponentParams: {
    //     loadingMessage: 'Loading',
    // }
}