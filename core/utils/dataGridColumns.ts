import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export type DataGridColumnBuilder<Row extends GridValidRowModel, Context> = (
  context: Context
) => GridColDef<Row>;

export type DataGridColumnStrategy<Row extends GridValidRowModel, Context> =
  | GridColDef<Row>
  | DataGridColumnBuilder<Row, Context>;

export type DataGridColumnRegistry<
  Key extends string,
  Row extends GridValidRowModel,
  Context
> = Record<Key, DataGridColumnStrategy<Row, Context>>;

function buildDataGridColumn<Row extends GridValidRowModel, Context>(
  strategy: DataGridColumnStrategy<Row, Context>,
  context: Context
): GridColDef<Row> {
  return typeof strategy === "function" ? strategy(context) : strategy;
}

export function createDataGridColumnsFactory<
  Key extends string,
  Row extends GridValidRowModel,
  Context
>(registry: DataGridColumnRegistry<Key, Row, Context>) {
  return (
    context: Context,
    columnOrder: readonly Key[]
  ): GridColDef<Row>[] =>
    columnOrder.map((key) => buildDataGridColumn(registry[key], context));
}
