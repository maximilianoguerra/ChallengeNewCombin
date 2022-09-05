import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStatePage } from '../hooks/StateProvider';


const UserTable = (props:any)=> {
  const {rows} = useStatePage(); 
/*   React.useEffect(()=>{console.log('cambio',rows);
  },[rows]) */
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell >Last name</TableCell>
            <TableCell >Address</TableCell>
            <TableCell >SSN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:RowTable) => (
            <TableRow
              key={row.ssn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.ssn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface RowTable{
  firstName:string,
  lastName:string,
  address:string,
  ssn:string
}
export default UserTable;