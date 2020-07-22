import React, { useState, useContext } from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import LoopIcon from "@material-ui/icons/Loop";
import PanToolIcon from "@material-ui/icons/PanTool";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

import FavouritesContext from "../../context/FavouritesContext";
import { useHttp } from "../../hooks/http.hook";
import { useInterval } from "../../hooks/interval.hook";

import { JokeWindow, Alert } from "../../components";

import "./index.scss";

import { favourite } from "../../types";

import {
  materialColor,
  materialVariant,
  intervalTime,
  alertTime,
  storageName,
  alertSuccess,
  alertError,
  alertInfo
} from "../../variables";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

const removeSuccessInfo: string = "this joke was successfully removed";
const duplicateError: string = "this joke is already added";
const absentError: string = "a joke is not selected";
const success: string = "this joke was successfully added";

const text1: string = "new joke";
const text2_1: string = "run jokesfall";
const text2_2: string = "stop jokesfall";
const text3_1: string = "add current joke to favourites";
const text3_2: string = "remove this joke from favourites";

export default (): JSX.Element => {
  const { request, loading } = useHttp();
  const { add, remove } = useContext(FavouritesContext);
  const classes = useStyles();

  const [currentId, setCurrentId] = useState("");
  const [currentJoke, setCurrentJoke] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [delay, setDelay] = useState(intervalTime);

  const [infoOpen, setInfoOpen] = useState({
    open: false,
    message: "",
  });
  const [errorOpen, setErrorOpen] = useState({
    open: false,
    message: "",
  });
  const [successOpen, setSuccessOpen] = useState({
    open: false,
    message: "",
  });

  const handleInfo = (message: string): void =>
    setInfoOpen({ open: true, message: message });
  const handleError = (message: string): void =>
    setErrorOpen({ open: true, message: message });
  const handleSuccess = (message: string): void =>
    setSuccessOpen({ open: true, message: message });

    const handleCloseInfo = (_: any, reason: any): void => {
      if (reason === "clickaway") return;
      setInfoOpen({ open: false, message: "" });
    };

  const handleCloseError = (_: any, reason: any): void => {
    if (reason === "clickaway") return;
    setErrorOpen({ open: false, message: "" });
  };

  const handleCloseSuccess = (_: any, reason: any): void => {
    if (reason === "clickaway") return;
    setSuccessOpen({ open: false, message: "" });
  };

  const fetchApi: () => void = async () => {
    try {
      const { value, id } = await request("random?category=political", "GET");

      setCurrentId(id);
      setCurrentJoke(value);
      setIsAdded(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const stopLoop: () => void = () => setIsRunning(false);

  const newJokeHandler: () => void = () => {
    stopLoop();
    fetchApi();
  };

  const runLoopHandler: () => void = () => {
    !isRunning && fetchApi();
    setIsRunning(!isRunning);
  };

  const addToFavourites: () => void = () => {
    const arrayStorage = JSON.parse(localStorage.getItem(storageName) || "[]");
    if (isAdded) {
      remove(currentId);

      handleInfo(removeSuccessInfo)
      setIsAdded(false);
      return;
    }
    if (!currentId) {
      handleError(absentError);
      return;
    }
    if (
      arrayStorage &&
      arrayStorage.length &&
      arrayStorage.map((i: favourite) => i.id).includes(currentId)
    ) {
      handleError(duplicateError);
      return;
    } else {
      add(currentId, currentJoke);
      handleSuccess(success);
      setIsAdded(true);
      return;
    }
  };

  useInterval(
    () => {
      fetchApi();
    },
    isRunning ? delay : null
  );

  return (
    <div className="main">
      <Snackbar
        open={infoOpen.open}
        autoHideDuration={alertTime}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleCloseInfo} severity={alertInfo}>
          {infoOpen.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successOpen.open}
        autoHideDuration={alertTime}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity={alertSuccess}>
          {successOpen.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen.open}
        autoHideDuration={alertTime}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity={alertError}>
          {errorOpen.message}
        </Alert>
      </Snackbar>

      <JokeWindow loading={loading} text={currentJoke} />
      <div className="main-buttons">
        <Button
          variant={materialVariant}
          color={materialColor}
          startIcon={<PlayForWorkIcon />}
          onClick={newJokeHandler}
          className={classes.button}
        >
          {text1}
        </Button>
        <Button
          variant={materialVariant}
          color={materialColor}
          startIcon={isRunning ? <PanToolIcon /> : <LoopIcon />}
          onClick={runLoopHandler}
          className={classes.button}
        >
          {isRunning ? text2_2 : text2_1}
        </Button>
        <Button
          variant={materialVariant}
          color={materialColor}
          startIcon={isAdded ? <RestoreFromTrashIcon /> : <StarBorderIcon />}
          onClick={addToFavourites}
          className={classes.button}
        >
          {isAdded ? text3_2 : text3_1}
        </Button>
      </div>
    </div>
  );
};
