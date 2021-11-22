import 'react-table';

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<D extends Record<string, unknown>>
    extends UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  // export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>> extends UseExpandedHooks<D>, UseGroupByHooks<D>, UseRowSelectHooks<D>, UseSortByHooks<D> {}

  // export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
  //   extends UseColumnOrderInstanceProps<D>,
  //     UseExpandedInstanceProps<D>,
  //     UseFiltersInstanceProps<D>,
  //     UseGlobalFiltersInstanceProps<D>,
  //     UseGroupByInstanceProps<D>,
  //     UsePaginationInstanceProps<D>,
  //     UseRowSelectInstanceProps<D>,
  //     UseRowStateInstanceProps<D>,
  //     UseSortByInstanceProps<D> {}

  export interface TableState<D extends Record<string, unknown> = Record<string, unknown>> extends UseFiltersState<D>, UseGlobalFiltersState<D>, UsePaginationState<D>, UseSortByState<D> {}

  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>> extends UseFiltersColumnOptions<D>, UseGlobalFiltersColumnOptions<D>, UseSortByColumnOptions<D> {}

  export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

  // export interface Cell<D extends Record<string, unknown> = Record<string, unknown>, V = any> extends UseGroupByCellProps<D>, UseRowStateCellProps<D> {}

  // export interface Row<D extends Record<string, unknown> = Record<string, unknown>> extends UseExpandedRowProps<D>, UseGroupByRowProps<D>, UseRowSelectRowProps<D>, UseRowStateRowProps<D> {}
}
