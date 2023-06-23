// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const CustomTable = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Column 1</TableCell>
//             <TableCell>Column 2</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.column1Data}</TableCell>
//               <TableCell>{row.column2Data}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const Tablee= () => {
//   const data = [
//     { column1Data: 'Row 1, Column 1', column2Data: 'Row 1, Column 2' },
//     { column1Data: 'Row 2, Column 1', column2Data: 'Row 2, Column 2' },
//     { column1Data: 'Row 3, Column 1', column2Data: 'Row 3, Column 2' },
//     // Add more rows as needed
//   ];

//   return (
//     <div>
//       <h2>Table Example</h2>
//       <CustomTable data={data} />
//     </div>
//   );
// };

// export default Tablee;


// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(() => ({
//   tableContainer: {
//     display: "flex",
//     float: "left",
//     justifyContent: 'space-between',
//     margin: "30px",
//     maxWidth: 500,
//   },
//   headerCell: {
//     fontWeight: '600',
//     textAlign: 'left',
//     color: 'red'
//   },
//   itemCell: {
//     textAlign: 'left',
//   },
// }));

// // const CustomTable = ({ data, headers }) => {
// //   const classes = useStyles();

// //   return (
// //     <>
// //     <TableContainer component={Paper} className={classes.tableContainer}>
// //       <Table>
// //         <TableBody>
// //           {headers.map((header, index) => (
// //             <TableRow key={index}>
// //               <TableCell style={{fontWeight: "bold"}} >{header}</TableCell>
// //               <TableCell className={classes.itemCell}>{data[index]}</TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </TableContainer>


//     // </>
    
    
// //   );
// // };


// // const Tablee = ({voter}) => {
// //   const headers = ['Full Name: ','Reg No: ', 'College Name: ', 'Block Number: '];
// //   const data = voter;

// //   return (
// //     <div>
// //       <h1>Table Example</h1>
// //       <CustomTable headers={headers} data={data} />
// //     </div>
// //   );
// // };

// const CustomTable = ({ data }) => {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper} className={classes.tableContainer}>
//       <Table>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell style={{ fontWeight: "bold" }}>{row.header}</TableCell>
//               <TableCell className={classes.itemCell}>{row.data}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const Tablee = ({ voter }) => {
//   const headers = ['Full Name: ', 'Reg No: ', 'College Name: ', 'Block Number: '];
//   const data = headers.map((header, index) => ({ header, data: voter[index] }));

//   return (
//     <div>
//       <h1>Table Example</h1>
//       <CustomTable data={data} />
//     </div>
//   );
// };

// export default Tablee;



import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  tableContainer: {
    display: "flex",
    float: "left",
    justifyContent: 'space-between',
    margin: "30px",
    maxWidth: 500,
  },
  headerCell: {
    fontWeight: '600',
    textAlign: 'left',
    color: 'red'
  },
  itemCell: {
    textAlign: 'left',
  },
}));



const CustomTable = ({ headers, data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableBody>
          {headers.map((header, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontWeight: "bold" }}>{header}</TableCell>
              <TableCell className={classes.itemCell}>{data[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Tablee = ({ voter }) => {
  const headers = ['Full Name: ', 'Reg No: ', 'College Name: ', 'Block Number: '];
  const data = voter;

  return (
    <div>
      <h1>Table Example</h1>
      <CustomTable headers={headers} data={data} />
    </div>
  );
};

export default Tablee;

