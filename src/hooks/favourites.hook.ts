import { useState, useCallback } from "react";

import { favourite } from "../types";

import { storageName, favouritesLimit } from "../variables";

export const useFavourites = () => {
  const arrayStorage = JSON.parse(localStorage.getItem(storageName) || "{}");
  let array: favourite[] = [];
  if (arrayStorage) array = arrayStorage;
  const [favourites, setFavourites] = useState<favourite[]>(array);

  const upgradeStorage = (favourites: favourite[]): void => {
    setFavourites(favourites);
    localStorage.setItem(storageName, JSON.stringify(favourites));
  };

  const removeFirst = (array: favourite[]): favourite[] =>
    array.filter((_, i) => i !== 0) || [];
  const removeById = (array: favourite[], id: string): favourite[] =>
    array.filter((item) => item.id !== id) || [];

  const add = useCallback((id: string, text: string) => {
    if (!id) return;

    const data = JSON.parse(localStorage.getItem(storageName) || "{}");
    if (data && data.length) {
      let favourites: Array<favourite> = data;
      if (favourites.map((i) => i.id).includes(id))
        return;


      favourites.length === favouritesLimit &&
        (favourites = removeFirst(favourites));

      favourites.push({
        id: id,
        text: text,
      });

      upgradeStorage(favourites)
    } else {
      let favourites = [
        {
          id: id,
          text: text,
        },
      ];

      upgradeStorage(favourites)
    }
  }, []);

  const remove = useCallback((id: string) => {
    if (!id) return;

    const data = JSON.parse(localStorage.getItem(storageName) || "");
    if (data) {
      let favourites: Array<favourite> = data;
      favourites = removeById(favourites, id);

      upgradeStorage(favourites)
    }
  }, []);

  const clear = useCallback(() => {
    upgradeStorage([])
  }, []);

  return { add, remove, clear, favourites };
};
