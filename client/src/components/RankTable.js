import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RankTable = (props) => {
    const {rank, name, country} = props
	return (
		<tr className="rankingResults">
			<td className="rank">{rank}</td>
			<td className="name">{name}</td>
			<td className="country">{country}</td>
		</tr>
	);
	
}

export default RankTable


// <Table striped bordered hover>
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>First Name</th>
//       <th>Last Name</th>
//       <th>Username</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1</td>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//     <tr>
//       <td>2</td>
//       <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td>
//     </tr>
//     <tr>
//       <td>3</td>
//       <td colSpan="2">Larry the Bird</td>
//       <td>@twitter</td>
//     </tr>
//   </tbody>
// </Table>