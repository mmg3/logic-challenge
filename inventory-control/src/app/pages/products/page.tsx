"use client";

import { useEffect, useState } from "react";
import { getCategories, getProducts, updateProduct, deleteProduct, createProduct } from "../../services/productService";
import { Categoria, Producto } from "../../types/interfaces";

interface Imagen {
  id: number;
  name: string;
  src: string;
}

interface RespuestaProducto {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  items: {items: Producto[]};
}


export default function Products() {
  const [itemsPorPagina, setItemsPorPagina] = useState<number>(10);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [editarProducto, setEditarProducto] = useState<Producto | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto | null>(null);
  const [productosList, setProductosList] = useState<Producto[]>([]);
  const [productoEliminado, setProductoEliminado] = useState<Producto | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [oldStock, setOldStock] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCategoria: Categoria[] = await getCategories();
        setCategorias(dataCategoria.categories);
        const dataProducto: RespuestaProducto = await getProducts(paginaActual, itemsPorPagina);

        setProductosList(dataProducto.items.items);
        setTotalPages(dataProducto.totalPages);
        setTotalItems(dataProducto.totalItems);
        setPaginaActual(dataProducto.currentPage);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchData();
  }, [paginaActual, itemsPorPagina]);


  const imagenes: Imagen[] = productosList.length > 0 ? productosList.map((image, index) => ({
    id: index + 1,
    src: image.image,
    name: image.name
  })) : [];

  const [imagenSeleccionada, setImagenSeleccionada] = useState<Imagen>(imagenes[0]);

  const handleDelete = (id: number) => {
    const producto = productosList.find((prod) => prod.id === id);
    if (producto) {
      setProductoEliminado(producto);
    }
  };

  const confirmDelete = async () => {
    if (productoEliminado !== null) {

      try {

        await deleteProduct(productoEliminado.id);
        const dataProducto: RespuestaProducto = await getProducts(paginaActual, itemsPorPagina);

        setProductosList(dataProducto.items.items);
        setTotalPages(dataProducto.totalPages);
        setTotalItems(dataProducto.totalItems);
        setPaginaActual(dataProducto.currentPage);
      } catch (error) {
        console.error('Error fetching on confirmDelete:', error);
      }
    }
    setToastMessage("Producto eliminado correctamente");
    setToastType("success");
    setShowToast(true);
    setProductoEliminado(null);
    setTimeout(() => setShowToast(false), 10000);
  };

  const handleCancelDelete = () => {
    setProductoEliminado(null);
  };

  const addProduct = () => {
    setImagenSeleccionada(imagenes[0]);
    setEditarProducto({
      id: 0,
      name: "",
      description: "",
      categoryId: 0,
      price: 0,
      stock: 0,
      image: "",
      oldStock: 0
    });
    setMostrarPopup(true);
  };

  const handleSaveProduct = async (producto: Producto) => {
    if (producto.name === "" || producto.description === "" || producto.categoryId === 0 || producto.price === 0 || producto.stock === 0 || producto.image === "") {
      setToastMessage("Todos los campos son obligatorios");
      setToastType("danger");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 10000);

    } else {
      if (editarProducto && editarProducto?.id > 0) {
        try {

          await updateProduct(producto);
          const dataProducto: RespuestaProducto = await getProducts(paginaActual, itemsPorPagina);

          setProductosList(dataProducto.items.items);
          setTotalPages(dataProducto.totalPages);
          setTotalItems(dataProducto.totalItems);
          setPaginaActual(dataProducto.currentPage);
        } catch (error) {
          console.error('Error fetching on edit handleSaveProduct:', error);
        }
      } else {
        try {
          await createProduct(producto);
          const dataProducto: RespuestaProducto = await getProducts(paginaActual, itemsPorPagina);
          
          setProductosList(dataProducto.items.items);
          setTotalPages(dataProducto.totalPages);
          setTotalItems(dataProducto.totalItems);
          setPaginaActual(dataProducto.currentPage);
        } catch (error) {
          console.error('Error fetching on new handleSaveProduct:', error);
        }
      }
      setMostrarPopup(false);
      setToastMessage(`Producto ${editarProducto !== null ? "actualizado" : "agregado"} correctamente`);
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 10000);
    }
  };

  const handleClosePopup = () => {
    setMostrarPopup(false);
  };

  const handleEditarProductoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (editarProducto) {
      setEditarProducto({
        ...editarProducto,
        [id]: value,
      });
    }
  };

  const handleEditarProductoNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (editarProducto) {
      setEditarProducto({
        ...editarProducto,
        [id]: Number(value),
      });
    }
  };

  const handleEditarProdcto = (prod: Producto) => {
    setOldStock(prod.stock);
    setEditarProducto(prod);
    setMostrarPopup(true);
  };

  return (
    <div className="container mt-4">
      {/* agregar un producto */}
      <div className="mb-3 text-end">
        <button className="btn btn-dark" onClick={addProduct}>Agregar Producto</button>
      </div>

      {/* productos */}
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList.length > 0 ? productosList.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>{categorias.length > 0 && categorias.find(cat => cat.id === prod.categoryId)?.name}</td>
              <td>
                <img src={prod.image} alt={prod.name} width="50" height="50" className="rounded" />
              </td>
              <td>{prod.price}</td>
              <td>{prod.stock}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEditarProdcto(prod)}>Editar</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(prod.id)}>Eliminar</button>
              </td>
            </tr>
          )) : <tr><td colSpan={8}>No hay productos disponibles</td></tr>}
        </tbody>
      </table>

      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center gap-2">
          <li>
            <button className={`btn btn-dark ${paginaActual === 1 ? "disabled" : ""}`} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className="page-item">
              <button className={`btn ${paginaActual === index + 1 ? "btn-primary" : "btn-dark"}`} onClick={() => setPaginaActual(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button className={`btn btn-dark page-item ${paginaActual === totalPages ? "disabled" : ""}`} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
          </li>
        </ul>
      </nav>

      {/* Popup para agregar/editar */}
      {mostrarPopup && (
        <div className="modal fade show bg-dark bg-opacity-75" style={{ display: "block" }} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">{editarProducto && editarProducto?.id > 0 ? "Editar Producto" : "Agregar Producto"}</h5>
                <button type="button" className="btn-close" onClick={handleClosePopup}></button>
              </div>
              <div className="modal-body">
                {/* Formulario de Producto */}
                <div>
                  <label>Nombre:</label>
                  <input type="text" className="form-control" defaultValue={editarProducto?.name || ""} id="name"
                    onChange={handleEditarProductoChange} />
                </div>
                <div className="mt-2">
                  <label>Descripción:</label>
                  <input type="text" className="form-control" defaultValue={editarProducto?.description || ""} id="description"
                    onChange={handleEditarProductoChange} />
                </div>
                <div className="mt-2">
                  <label>Categoría:</label>
                  <select className="form-select" id="categoryId"
                    defaultValue={editarProducto?.categoryId || 0}
                    onChange={handleEditarProductoNumberChange} >
                    <option value="0" disabled hidden={editarProducto?.categoryId !== 0} >
                      Escoja una opción
                    </option>
                    {
                      categorias.length > 0 &&
                      categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mt-2">
                  <label>Precio:</label>
                  <input type="number" className="form-control" defaultValue={editarProducto?.price || 0} id="price"
                    onChange={handleEditarProductoChange} />
                </div>
                <div className="mt-2">
                  <label>Stock:</label>
                  <input type="number" className="form-control" defaultValue={editarProducto?.stock || 0} id="stock"
                    onChange={handleEditarProductoChange} />
                </div>
                <div className="mt-2">
                  <label>Imagen:{editarProducto?.name}</label>
                  <select className="form-select"
                    defaultValue={editarProducto?.image || 0}
                    id="image"
                    onChange={handleEditarProductoChange}>
                    <option value="" disabled hidden={editarProducto?.image !== ""}>
                      Escoja una opción
                    </option>
                    {imagenes.map((img, index) => (
                      <option key={index} value={img.src}>
                        {img.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-3">
                    <img src={editarProducto?.image || imagenSeleccionada.src} alt="Imagen seleccionada" width="100" className="border rounded" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>Cerrar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleSaveProduct({
                      id: editarProducto ? editarProducto.id : 0,
                      name: editarProducto?.name || "",
                      description: editarProducto?.description || "",
                      categoryId: editarProducto?.categoryId || 0,
                      price: editarProducto?.price || 0,
                      stock: editarProducto?.stock || 0,
                      image: editarProducto?.image || "",
                      oldStock: oldStock || 0
                    });
                  }}
                >
                  {editarProducto && editarProducto?.id > 0 ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {productoEliminado && (
        <div className="modal fade show bg-dark bg-opacity-75" style={{ display: "block" }} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h5 className="modal-title">Confirmación de eliminación</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                ¿Está seguro de que desea eliminar el producto "{productoEliminado.name}"?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className={`toast show position-fixed bottom-0 end-0 m-3 text-white bg-${toastType}`} style={{ width: "300px", zIndex: 9050 }}>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}