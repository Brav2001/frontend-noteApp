import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useStore } from "../store/store";
import Input from "./Input";
import TextArea from "./TextArea";
import Toggle from "./Toggle";
import { api, fetchData } from "../utils/api";
import ConfirmModal from "./ConfirmModal";
import Badge from "./Badge";
import DataList from "./DataList";

const FormEditNote = ({ onclose, note }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [archived, setArchived] = useState(note.archived);
  const [ChangeNotes, category] = useStore((state) => [
    state.ChangeNotes,
    state.category,
  ]);
  const [categories, setCategories] = useState([]);
  const [actualCat, setActualCat] = useState([]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const getAll = async () => {
    const data = await fetchData("GET", api.note.getAll, "", true);

    if (data.length > 0) {
      ChangeNotes(data);
      return;
    }
    ChangeNotes(false);
  };

  const handleChangeArchived = async () => {
    if (!archived == true) {
      await fetchData(
        "GET",
        `${api.note.updateArchivedTrue}${note.id}`,
        "",
        true
      );
      setArchived(true);
      getAll();
    } else {
      await fetchData(
        "GET",
        `${api.note.updateArchivedFalse}${note.id}`,
        "",
        true
      );
      setArchived(false);
      getAll();
    }
  };

  const valuesDefault = () => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      let saveCat = [];
      note.CategoryNotes &&
        note.CategoryNotes.map((cat) => {
          saveCat = [...saveCat, cat.Category];
        });
      setCategories(saveCat);
      setActualCat(saveCat);
    }
    setEdit(false);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
  };

  const deletedNote = async () => {
    if (categories.length > 0) {
      const rescat = await fetchData(
        "DELETE",
        api.categoryNote.delete,
        { id: note.id },
        true
      );
    }
    const response = await fetchData(
      "PUT",
      `${api.note.deleteNote}${note.id}`,
      "",
      true
    );
    if (response.status == 200) {
      getAll();
      onclose();
    }
  };

  const handleSelectCategory = (e) => {
    const value = e.target.value;
    const findcategory =
      category && category.filter((cat) => value == cat.name);

    if (findcategory.length > 0) {
      const findActual =
        categories && categories.filter((cat) => value == cat.name);
      e.target.value = "";
      if (findActual.length == 0) {
        setCategories([...categories, ...findcategory]);
      }
    }
  };

  const handleRemoveCategory = (data) => {
    const newCategories = categories.filter((cat) => cat.name != data.name);
    setCategories(newCategories);
  };

  useEffect(() => {
    valuesDefault();
    setEdit(false);
  }, [note]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      id: note.id,
      title: title,
      description: description,
    };
    const response = await fetchData("PATCH", api.note.updateNote, body, true);
    if (response.status == 200) {
      if (JSON.stringify(categories) != JSON.stringify(actualCat)) {
        const newBody = {
          id: note.id,
          categories: categories,
        };
        await fetchData("PUT", api.categoryNote.update, newBody, true);
        getAll();
      }
      getAll();
    }
  };

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <Input
            id={"title"}
            type={"text"}
            label={"title"}
            value={title}
            change={handleChangeTitle}
            disabled={!edit}
          />
          <TextArea
            id={"description"}
            label={"description"}
            value={description}
            change={handleChangeDescription}
            disabled={!edit}
          />
          <div className="mt-2 mb-4">
            {categories &&
              categories.map((cat) => (
                <Badge
                  label={cat.name}
                  edit={edit}
                  key={cat.id}
                  remove={() => {
                    handleRemoveCategory(cat);
                  }}
                />
              ))}
          </div>

          {edit && <DataList oninput={handleSelectCategory} />}

          {!edit && (
            <div className="w-full flex  justify-end my-4 ">
              <Toggle
                label={"archived"}
                val={archived}
                onchange={handleChangeArchived}
              />
            </div>
          )}

          {!edit && (
            <div className="w-full mt-8 flex justify-end ">
              <button
                type="button"
                className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2 hover:border-text duration-200"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <FaPen size={25} />
              </button>
              <button
                type="button"
                className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2 hover:border-text duration-200"
                onClick={() => {
                  setConfirmModal(true);
                }}
              >
                <FaTrashAlt size={25} />
              </button>
            </div>
          )}

          {edit && (
            <div className="w-full mt-8 flex justify-end ">
              <button
                type="submit"
                className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2 hover:border-text duration-200"
              >
                <FaCheck size={25} />
              </button>
              <button
                type="button"
                className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2 hover:border-text duration-200"
                onClick={valuesDefault}
              >
                <FaTimes size={25} />
              </button>
            </div>
          )}
          {/*  */}
        </form>
      </div>

      <ConfirmModal
        hidden={confirmModal}
        text={"Are you sure?"}
        onclose={closeConfirmModal}
        onConfirm={deletedNote}
      ></ConfirmModal>
    </>
  );
};

export default FormEditNote;
