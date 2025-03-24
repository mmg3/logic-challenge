"use client";

import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoriaId: number;
  precio: number;
  stock: number;
  imagen: string;
}

const productos: Producto[] = [
    { id: 1, nombre: "Laptop X1", descripcion: "Laptop potente", categoriaId: 1, imagen: "/images/laptop.jpg", precio: 1200, stock: 10 },
    { id: 2, nombre: "Smartphone Pro", descripcion: "Alta gama", categoriaId: 1, imagen: "/images/phone.jpg", precio: 900, stock: 15 },
    { id: 3, nombre: "Teclado Mecánico", descripcion: "Retroiluminado", categoriaId: 3, imagen: "/images/keyboard.jpg", precio: 80, stock: 25 },
    { id: 4, nombre: "Mouse Gamer", descripcion: "Ergonómico", categoriaId: 3, imagen: "/images/mouse.jpg", precio: 45, stock: 30 },
    { id: 5, nombre: "Monitor 4K", descripcion: "Alta resolución", categoriaId: 1, imagen: "/images/monitor.jpg", precio: 500, stock: 12 },
    { id: 6, nombre: "Silla Gamer", descripcion: "Cómoda y ergonómica", categoriaId: 4, imagen: "/images/chair.jpg", precio: 250, stock: 8 },
    { id: 7, nombre: "Tablet X10", descripcion: "Pantalla grande", categoriaId: 1, imagen: "/images/tablet.jpg", precio: 600, stock: 20 },
    { id: 8, nombre: "Impresora Láser", descripcion: "Alta velocidad", categoriaId: 5, imagen: "/images/printer.jpg", precio: 300, stock: 10 },
    { id: 9, nombre: "Auriculares Bluetooth", descripcion: "Sonido envolvente", categoriaId: 6, imagen: "/images/headphones.jpg", precio: 100, stock: 40 },
    { id: 10, nombre: "Cámara Web HD", descripcion: "1080p", categoriaId: 3, imagen: "/images/webcam.jpg", precio: 70, stock: 18 },
    { id: 11, nombre: "Disco Duro 1TB", descripcion: "Almacenamiento rápido", categoriaId: 7, imagen: "/images/hdd.jpg", precio: 120, stock: 22 },
    { id: 12, nombre: "SSD 500GB", descripcion: "Ultra rápido", categoriaId: 7, imagen: "/images/ssd.jpg", precio: 150, stock: 14 },
    { id: 13, nombre: "Fuente 750W", descripcion: "Eficiencia 80 Plus", categoriaId: 8, imagen: "/images/psu.jpg", precio: 110, stock: 16 },
    { id: 14, nombre: "Tarjeta Gráfica RTX", descripcion: "4K Gaming", categoriaId: 8, imagen: "/images/gpu.jpg", precio: 800, stock: 6 },
    { id: 15, nombre: "Microprocesador i9", descripcion: "Última generación", categoriaId: 8, imagen: "/images/cpu.jpg", precio: 500, stock: 9 },
    { id: 16, nombre: "TV Android 8k", descripcion: "TV de última generación", categoriaId: 2, imagen: "/images/tv.jpg", precio: 500, stock: 3 }
  ];

  const categorias = [
    { id: 1, nombre: "Electrónica" },
    { id: 2, nombre: "Hogar" },
    { id: 3, nombre: "Accesorios" },
    { id: 4, nombre: "Muebles" },
    { id: 5, nombre: "Oficina" },
    { id: 6, nombre: "Audio" },
    { id: 7, nombre: "Almacenamiento" },
    { id: 8, nombre: "Componentes" }
  ];

  const imagenes = productos.map(({ imagen, nombre }, index) => ({
    id: index + 1,
    src: imagen,
    nombre
  }));

export default function Products() {
    const [itemsPorPagina, setItemsPorPagina] = useState(10);
    const [paginaActual, setPaginaActual] = useState(1);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [editarProducto, setEditarProducto] = useState<Producto | null>(null);
    const [productosList, setProductosList] = useState(productos);
    const [productoEliminado, setProductoEliminado] = useState<Producto | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenes[0]);

    const indexInicio = (paginaActual - 1) * itemsPorPagina;
    const indexFin = indexInicio + itemsPorPagina;
    const productosPaginados = productosList.slice(indexInicio, indexFin);
  
    const totalPaginas = Math.ceil(productosList.length / itemsPorPagina);
  
    const handleDelete = (id: number) => {
      const producto = productosList.find((prod) => prod.id === id);
      if (producto) {
        setProductoEliminado(producto);
      }
    };
  
    const confirmDelete = () => {
      setProductosList(productosList.filter((prod) => prod.id !== productoEliminado?.id));
      setToastMessage("Producto eliminado correctamente");
      setToastType("danger");
      setShowToast(true);
      setProductoEliminado(null);
      setTimeout(() => setShowToast(false), 10000);
    };
  
    const handleCancelDelete = () => {
      setProductoEliminado(null);
    };
  
    const addProduct = () => {
      setEditarProducto(null);
      setMostrarPopup(true);
    };
  
    const handleSaveProduct = (producto: Producto) => {
      if (editarProducto !== null) {
        setProductosList(productosList.map((prod) => (prod.id === producto.id ? producto : prod)));
      } else {
        setProductosList([...productosList, producto]);
      }
      setMostrarPopup(false);
      setToastMessage(`Producto ${editarProducto !== null ? "actualizado" : "agregado"} correctamente`);
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 10000);
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
            {productosPaginados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{categorias.find(cat => cat.id === producto.categoriaId)?.nombre || "Sin categoría"}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} width="50" height="50" className="rounded" />
                </td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => { setEditarProducto(producto); setMostrarPopup(true); }}>Editar</button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Paginación */}
        <nav>
          <ul className="pagination justify-content-center gap-2">
            <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
              <button className="btn btn-dark" onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
            </li>
            {[...Array(totalPaginas)].map((_, index) => (
              <li key={index} className="page-item">
                <button className={`btn ${paginaActual === index + 1 ? "btn-primary" : "btn-dark"}`} onClick={() => setPaginaActual(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
              <button className="btn btn-dark" onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
            </li>
          </ul>
        </nav>
  
        {/* Popup para agregar/editar */}
        {mostrarPopup && (
          <div className="modal fade show bg-dark bg-opacity-75" style={{ display: "block" }} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabel">{editarProducto ? "Editar Producto" : "Agregar Producto"}</h5>
                  <button type="button" className="btn-close" onClick={handleClosePopup}></button>
                </div>
                <div className="modal-body">
                  {/* Formulario de Producto */}
                  <div>
                    <label>Nombre:</label>
                    <input type="text" className="form-control" defaultValue={editarProducto?.nombre || ""} id="nombre"
                      onChange={handleEditarProductoChange} />
                  </div>
                  <div className="mt-2">
                    <label>Descripción:</label>
                    <input type="text" className="form-control" defaultValue={editarProducto?.descripcion || ""} id="descripcion"
                      onChange={handleEditarProductoChange} />
                  </div>
                  <div className="mt-2">
                    <label>Categoría:</label>
                    <select className="form-select" id="categoriaId"
                      defaultValue={editarProducto?.categoriaId || categorias[0]?.id} 
                      onChange={handleEditarProductoNumberChange} >
                    {
                      categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))
                    }
                    </select>
                  </div>
                  <div className="mt-2">
                    <label>Precio:</label>
                    <input type="number" className="form-control" defaultValue={editarProducto?.precio || 0} id="precio"
                      onChange={handleEditarProductoChange} />
                  </div>
                  <div className="mt-2">
                    <label>Stock:</label>
                    <input type="number" className="form-control" defaultValue={editarProducto?.stock || 0} id="stock"
                      onChange={handleEditarProductoChange} />
                  </div>
                  <div className="mt-2">
                    <label>Imagen:</label>
                    <select className="form-select bg-dark text-white" defaultValue={editarProducto?.imagen || imagenSeleccionada.src}
                     id="imagen"
                     onChange={handleEditarProductoChange}>
                      {imagenes.map((img, index) => (
                        <option key={index} value={img.src}>
                          {img.nombre}
                        </option>
                      ))}
                    </select>
                    <div className="mt-3">
                      <img src={editarProducto?.imagen || imagenSeleccionada.src} alt="Imagen seleccionada" width="100" className="border rounded" />
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
                        id: editarProducto ? editarProducto.id : productosList.length + 1,
                        nombre: editarProducto?.nombre || "",
                        descripcion: editarProducto?.descripcion || "",
                        categoriaId: editarProducto?.categoriaId || 0,
                        precio: editarProducto?.precio || 0,
                        stock: editarProducto?.stock || 0,
                        imagen: editarProducto?.imagen || ""
                      });}}
                    >
                    {editarProducto ? "Actualizar" : "Agregar"}
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
                  ¿Está seguro de que desea eliminar el producto "{productoEliminado.nombre}"?
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
        <div className={`toast show position-fixed bottom-0 end-0 m-3 text-white bg-${toastType}`} style={{ width: "300px", zIndex: 1050 }}>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      )}
      </div>
    );
  }