import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from 'react-bootstrap/Alert'

const Record = () => {

	const [data, setData] = useState([]);
	const [totaldata, setTotalData] = useState([]);
	const [page, setPage] = useState(1);
	const [dataPerPage, setDataPerPage] = useState(100);
	const [loading, setLoading] = useState(true);
	const [mode, setMode] = useState('online')

	const totalpage = (totaldata.length) / dataPerPage;

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/todos').then(res => { setTotalData(res.data) })
	}, [])

	useEffect(() => {
		axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${dataPerPage}`)
			.then(res => {
				setData(res.data);
				setLoading(false)
				localStorage.setItem('data', JSON.stringify(res.data))
			}).catch(() => {
				const fetchdata = localStorage.getItem('data');
				setData(JSON.parse(fetchdata))
				setMode('offline')
				setLoading(false)
			})
	}, [page])

	return (
		<>
			<div className='record_wrap'>
				<div className='container'>
					<div>
						{
							mode === 'offline' ?
								<Alert variant='warning'>Check Internet Connection</Alert> : ''
						}
					</div>
					{
						loading ? <span className='loading'><CircularProgress /></span> :
							<div className='record_inner'>
								<div className='record_table'>
									<Table responsive hover bordered>
										<thead>
											<tr>
												<th>userId</th>
												<th>id</th>
												<th>title</th>
												<th>completed</th>
											</tr>
										</thead>
										<tbody>
											{
												data.map((item, key) => {
													return (
														<tr key={key}>
															<td>{item.userId}</td>
															<td>{item.id}</td>
															<td>{item.title}</td>
															<td>
																{
																	item.completed ? <span className='text-success'>Completed</span> :
																		<span className='text-warning'>Pending</span>
																}
															</td>
														</tr>
													)
												})
											}
										</tbody>
									</Table>
								</div>
								<div className='pagination'>
									{
										mode === 'online' ?
											<Pagination
												color='primary'
												count={parseInt(totalpage)}
												page={page}
												onChange={(event, value) => setPage(value)}
											/>
											: ''
									}
								</div>
							</div>
					}
				</div>
			</div>
		</>
	)
}

export default Record