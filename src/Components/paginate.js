import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const Paginate= ({questionPerPage, totalQuestion, paginateHandler, currentPage}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalQuestion/questionPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div>
            <Pagination>
            <Pagination.First onClick={() => paginateHandler(1)}/>
            <Pagination.Prev onClick={() => paginateHandler(currentPage - 1)}/>
            {pageNumbers.map(number =>(
                <Pagination.Item key={number} onClick={() => paginateHandler(number)}>{number}</Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginateHandler(currentPage + 1)}/>
            <Pagination.Last onClick={() => paginateHandler(totalQuestion/questionPerPage)}/>
            </Pagination>
        </div>
    )
}

export default Paginate;