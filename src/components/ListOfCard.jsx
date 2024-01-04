import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import Card from "./Card";
import { fetchData, api } from "../utils/api";

const ListOfCard = ({ archived }) => {
  const [notes, ChangeNotes, search] = useStore((state) => [
    state.notes,
    state.ChangeNotes,
    state.search,
  ]);
  const [data, setData] = useState(false);

  const getAll = async () => {
    const data1 = await fetchData("GET", api.note.getAll, "", true);
    if (data1.length > 0) {
      ChangeNotes(data1);
      return;
    }
    ChangeNotes(false);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (notes) {
      let fi = notes.filter((note) => {
        if (note.archived !== archived) {
          return false;
        }
        if (
          note.CategoryNotes.some((cat) =>
            cat.Category.name.includes(search.toUpperCase())
          )
        ) {
          return true;
        }

        return false;
      });
      // let fi = notes.filter((note) => note.archived == archived);
      // fi = fi.filter((note) =>
      //   note.CategoryNotes.filter((cat) => cat.Category.name.includes(search))
      // );
      setData(fi);
    } else {
      setData(false);
    }
  }, [notes, search]);

  return (
    <>{data ? data.map((note) => <Card key={note.id} note={note} />) : null}</>
  );
};

export default ListOfCard;
