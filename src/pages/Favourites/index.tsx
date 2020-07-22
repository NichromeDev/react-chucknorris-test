import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import FavouritesContext from "../../context/FavouritesContext";

import { Joke } from "../../components";

import "./index.scss";

import { materialColor, materialVariant } from "../../variables";

const text = "Delete all jokes"

export default (): JSX.Element => {
  const { clear, favourites } = useContext(FavouritesContext);

  const clearHandler: () => void = () => clear()

  return (
    <>
      <div className="features">
        <Button
          variant={materialVariant}
          color={materialColor}
          startIcon={<DeleteForeverIcon />}
          onClick={clearHandler}
        >
          {text}
        </Button>
      </div>
      <div className="favourites">
        {favourites &&
          favourites.length &&
          favourites.map((i) => (
            <Joke key={i.id} id={i.id}>
              {i.text}
            </Joke>
          ))}
      </div>
    </>
  );
};
