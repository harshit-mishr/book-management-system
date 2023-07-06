import React, { useState } from "react";
import './styles.css'
import AddMovieBox from "./addBookBox";
import { image} from './BookData'
import { Table } from "reactstrap";
import EditBookBox from './editBookBox'
import Button from "@mui/material/Button";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./action";
import { Padding } from "@mui/icons-material";
export default function App() {
  const { counter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputdata, setInputData] = useState("");
  const [page, setPage] = useState(1);
  function handleAdd() {
    dispatch({ type: actions.ADDAVALUE, payload: inputdata });
  }
  console.log(counter, "app");
  function handleDelete(x) {
    dispatch({ type: actions.DLTVALUE, payload: x.BOOK });
  }
  return (
    <div>
      <h1 style={{ display:"flex", justifyContent: "center" }} >Book Management System</h1>
      <div style={{ display:"flex", justifyContent: "center", gap:"2rem", margin:"1rem" }} >
      <div>

      <input   className="form-control"
       style={{flex:"2", width:"10rem"}}
        onChange={(e) => {
          setInputData(e.target.value);
        }}
        value={inputdata}
        placeholder="search..."
      />
        </div>
     
      <AddMovieBox style={{flex:"2"}} />
      </div>

      <Table>
        <thead>
          <tr>
            <th>ICONS</th>
            <th>BOOK NAME</th>
            <th>AUTHOR</th>
            <th></th>
          </tr>
        </thead>

        { counter.slice(page * 10 - 10, page * 10).filter((x)=>x.BOOK.toLowerCase().includes(inputdata.toLowerCase()) || x.AUTHOR.toLowerCase().includes(inputdata.toLowerCase())).map((x) => {
          return (
            <tbody key={x.id} >
              <tr>
                <td>
                  <img width="50px" src={image} />
                </td>
                <td>{x.BOOK}</td>
                <td>{x.AUTHOR}</td>
                <td>
                  <Button variant="outlined" onClick={() => handleDelete(x)}>
                    <RiDeleteBin5Fill />
                  </Button>
                  <EditBookBox Data={x} /> 
                   
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>

      <div className="line"></div>
      <nav aria-label="Page navigation example" style={{ display:"flex", justifyContent: "center" }} >
  <ul class="pagination" >
    <li class="page-item"><a class="page-link" href="#"  onClick={() => {
            page === 1 ? setPage(3) : setPage(page - 1);
          }}
          disabled={page === 1}  >Previous</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={() => {
            setPage(1);
          }} >1</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={() => {
            setPage(2);
          }} >2</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={() => {
            setPage(3);
          }} >3</a></li>
    <li class="page-item"><a class="page-link" href="#" onClick={() => {
            page === 3 ? setPage(1) : setPage(page + 1);
          }} >Next</a></li>
  </ul>
</nav>
      
    </div>
  );
}
