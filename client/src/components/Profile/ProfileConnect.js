import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "./TableCell";
import { connectionsAC } from "../../store/actions";

function ProfileConnect() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((store) => store.user);
  const connectionsArr = useSelector((store) => store.connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await fetch("/connections");
        const data = await res.json();
        dispatch(connectionsAC(data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };
    fetchConnections();
  }, [dispatch]);

  return (
    <div className="w-50">
      <h3>Connections Status</h3>
      <Table className="mb-3" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Investor</th>
            <th>Status</th>
            {status !== "Student" && <th>Connect</th>}
          </tr>
        </thead>
        <tbody>
          {connectionsArr.map((element) => {
            if (user === element.student || user === element.investor) {
              return <TableCell element={element} key={element.id} />;
            }
            return null;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProfileConnect;

