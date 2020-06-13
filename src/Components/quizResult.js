import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

const columns = [
  { id: "lastName", label: "Last Name", minWidth: 150 },
  { id: "firstName", label: "First Name", minWidth: 150 },
  { id: "age", label: "Age", minWidth: 100, align: "right" },
  { id: "gender", label: "Gender", minWidth: 100, align: "center" },
  { id: "email", label: "Email", minWidth: 160 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 170, align: "right" },
  {
    id: "totalQuestion",
    label: "Total Question",
    minWidth: 100,
    align: "center",
  },
  { id: "attaimpted", label: "Attaimpted", minWidth: 100, align: "center" },
  { id: "correctAns", label: "Correct Answer", minWidth: 100, align: "center" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 500,
  },
});

export default function QuizResultTable(quizId) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        "https://floating-badlands-28885.herokuapp.com/player/findPlayer",
        quizId,
        header
      )
      .then((res) => {
        console.log(res.data);
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
              {players
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((player, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = player[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          rowsPerPageOptions={[
            5,
            10,
            15,
            20,
            25,
            30,
            40,
            50,
            60,
            70,
            80,
            90,
            100,
          ]}
          component="div"
          count={players.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
