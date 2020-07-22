import React, { useContext } from "react";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

import FavouritesContext from "../../../context/FavouritesContext";

type Props = {
  id: string;
  children: string;
};

export default ({ id, children }: Props): JSX.Element => {
  const { remove } = useContext(FavouritesContext);

  const deleteHandler: () => void = () => remove(id);

  return (
    <div className="joke">
      {children}
      <div className="delete" onClick={deleteHandler}>
        <RestoreFromTrashIcon />
      </div>
    </div>
  );
};
