import { useEffect, useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { validatePartialNote } from "../schemas/note.schema";
import { api, fetchData } from "../utils/api";
import { useStore } from "../store/store";
import Badge from "./Badge";
import DataList from "./DataList";

const FormAddNote = ({ onclose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [ChangeNotes, category] = useStore((state) => [
    state.ChangeNotes,
    state.category,
  ]);
  const [categories, setCategories] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: title,
      description: description,
      archived: false,
    };
    const res = await fetchData("POST", api.note.create, body, true);
    if (res.status == 201) {
      if (categories.length > 0) {
        const newBody = {
          id: res.id,
          categories: categories,
        };
        const response = await fetchData(
          "POST",
          api.categoryNote.create,
          newBody,
          true
        ).then(getAll());
      }
      setTitle("");
      setDescription("");
      setDisabledButton(true);
      setCategories([]);
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
    let validateTitle = false;
    let validateDescription = false;
    if (title) {
      const validateTitleRes = validatePartialNote({ title: title });
      if (validateTitleRes.error) {
        validateTitle = false;
      } else {
        validateTitle = true;
      }
    }

    if (description) {
      const validateDescriptionRes = validatePartialNote({
        description: description,
      });

      if (validateDescriptionRes.error) {
        validateDescription = false;
      } else {
        validateDescription = true;
      }
    }

    validateTitle && validateDescription
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [title, description]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <Input
          id={"title"}
          type={"text"}
          label={"title"}
          value={title}
          change={handleChangeTitle}
        />
        <TextArea
          id={"description"}
          label={"description"}
          value={description}
          change={handleChangeDescription}
        />
        <div className="mt-2 mb-4">
          {categories &&
            categories.map((cat) => (
              <Badge
                label={cat.name}
                edit={true}
                key={cat.id}
                remove={() => {
                  handleRemoveCategory(cat);
                }}
              />
            ))}
        </div>

        <DataList oninput={handleSelectCategory} />
        <div className="w-full mt-8 flex justify-end ">
          <button
            type="submit"
            className={`bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2   duration-200 ${
              disabledButton && "cursor-not-allowed"
            }
            ${!disabledButton && "hover:border-text"}`}
            disabled={disabledButton}
          >
            <FaCheck size={25} />
          </button>
          <button
            type="button"
            className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-2.5 mr-2 mb-2  hover:border-text  duration-200"
            onClick={onclose}
          >
            <FaTimes size={25} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddNote;
