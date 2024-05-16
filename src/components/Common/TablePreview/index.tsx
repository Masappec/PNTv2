import { Pagination, Table as TableFlowbite } from "flowbite-react";
import { useState } from "react";

interface Column<T> {
  title: string | React.ReactNode;
  render: (data: T) => React.ReactNode;
  classname?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  title: string;

  onAdd?: () => void;
  onFilter: (type: string) => void;
  data: T[];
  onChangePage?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  showPagination?: boolean;
}

function TablePreview<T>(props: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="overflow-x-auto border-b-2 border-gray-100 pb-10 w-auto ">
      <TableFlowbite>
        <TableFlowbite.Head className="text-xs text-gray-700  bg-gray-300 normal-case gap-40">
          {props.columns.map((column) => (
            <TableFlowbite.HeadCell
              className={"px-10 p py-3" + column.classname}
            >
              {column.title}
            </TableFlowbite.HeadCell>
          ))}
        </TableFlowbite.Head>
        <TableFlowbite.Body className="text-sm divide-gray-200 dark:divide-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 dark:border-gray-700 divide-y">
          {props.data.map((row) => (
            <TableFlowbite.Row>
              {props.columns.map((column) => (
                <TableFlowbite.Cell className="px-4 py-3">
                  {column.render(row)}
                </TableFlowbite.Cell>
              ))}
            </TableFlowbite.Row>
          ))}
        </TableFlowbite.Body>
      </TableFlowbite>

      <div className="flex overflow-x-auto sm:justify-center -mr-[520px]">
        {props.showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
            showIcons
            nextLabel="Siguiente"
            previousLabel="Anterior"
          />
        )}
      </div>
    </div>
  );
}

export default TablePreview;
