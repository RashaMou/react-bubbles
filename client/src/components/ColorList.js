import React, { useState } from "react";
import axiosWithAuth from "./../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(initialColor);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: ""
    }
  });

  const changeHandlerForAdd = e => {
    setNewColor({
      ...newColor,
      code: {
        [e.target.name]: e.target.value
      },
      [e.target.name]: e.target.value
    });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(colorToEdit);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit);
    setEditing(false);
  };

  const deleteColor = color => {
    setColorToDelete(color);
    axiosWithAuth().delete(`/api/colors/${colorToDelete.id}`);
  };

  const showForm = e => {
    e.preventDefault();
    setDisplayForm(true);
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/colors", newColor)
      .then(setDisplayForm(false));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={showForm}>Add Color</button>
      {displayForm && (
        <form onSubmit={addColor}>
          <label htmlFor="color">Color Name:</label>
          <input type="text" name="color" onChange={changeHandlerForAdd} />
          <label htmlFor="hex">Hex Code:</label>
          <input type="text" name="hex" onChange={changeHandlerForAdd} />
          <button type="submit">Add color</button>
        </form>
      )}
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
