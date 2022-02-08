import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { thunkChangeStatusAC } from "../../store/actions";
import ModalProfileStudent from "./ModalStudent";
import ModalProfileInvestor from "./ModalInvestor";

function TableCell({ element }) {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.user);
  return (
    <tr>
      <td>{element.id}</td>
      <td><ModalProfileStudent element={element}/></td>
      <td><ModalProfileInvestor element={element}/></td>
      <td>{element.status === false ? "Pending..." : "Connected!"}</td>
      {status !== "Student" ? <td><Button variant="outline-primary" onClick={() => dispatch(thunkChangeStatusAC(element.status, element.investorId, element.studentId))}>Connect</Button></td> : null}
    </tr>
  );
}

export default TableCell;
