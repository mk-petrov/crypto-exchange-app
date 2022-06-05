import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'direction' | 'pair' | 'amount' | 'price' | 'dateTime' | 'exchange';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: Date) => string;
}

const columns: readonly Column[] = [
  { id: 'direction', label: 'ORDER', minWidth: 100 }, // align: 'left'
  { id: 'pair', label: 'PAIR', minWidth: 100 },
  { id: 'amount', label: 'AMOUNT', minWidth: 150 },
  { id: 'price', label: 'PRICE', minWidth: 150 },
  { id: 'dateTime', label: 'DATE TIME', minWidth: 150, }, // format: (v: Date) => v.toISOString()
  { id: 'exchange', label: 'EXCHANGE', minWidth: 150, },
];

interface Data {
  amount: string | number;
  dateTime: Date;
  direction: string;
  id: string | number;
  pair: string;
  price: string;
  exchange: string;
}

interface IProps {
  rows: Array<Data>
}

const UITableDetails: React.FC<IProps> = ({ rows }) => {
  if(!rows || Object.prototype.toString.call(rows) !== '[object Array]' || rows.length === 0) return null;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
      <TableContainer sx={{ minHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{
            "& th": {
              color: "#fff",
              backgroundColor: "rgba(246,161,12,0.8)"
            }
          }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {

                      let value;

                      switch (column.id) {
                        case 'pair':
                          value = (row[column.id]).toLocaleUpperCase().toString()
                          break;
                        case 'dateTime':
                          value = (row[column.id]).toLocaleTimeString()
                          break;
                        case 'direction':
                          const marketDirection = (row[column.id]).toLocaleUpperCase().toString();
                          value = ( <span style={{ display: 'inline-block', backgroundColor: 'BUY' === marketDirection ? '#01A781' : '#E44B44', padding: '6px', borderRadius: 4, width: 40, textAlign: 'center' }}> { marketDirection } </span> )
                          break;
                      
                        default:
                          value = (row[column.id]).toString();
                          break;
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UITableDetails;
