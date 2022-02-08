import React from "react";
import { Table } from "react-bootstrap";
import { connectionsAC } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import TableCell from "./TableCell";

function ProfileConnect() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      const res = await fetch("/connections");
      const data = await res.json();
      dispatch(connectionsAC(data));
    })();
  }, [dispatch]);

  const connectionsArr = useSelector((store) => store.connections);
  const { user, status } = useSelector((store) => store.user);

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
            {status !== "Student" ? <th>Connect</th> : null}
          </tr>
        </thead>
        <tbody>
          {connectionsArr.map((element) => {
            if (user === element.student || user === element.investor) {
              return <TableCell element={element} key={element.id} />;
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProfileConnect;
