import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoAction";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  //Confirmar eliminar producto
  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un producto que se elimina no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      //Pasar al action
      if (result.value) {
        dispatch(borrarProductoAction(id));
      }
    });
  };

  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
