'use client';
import { useState } from 'react';
import { format } from 'date-fns';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Movimiento {
  id: number;
  fecha: string;
  tipoTransaccion: 'IN' | 'OUT' | 'ADJUSTMENT';
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  detalle: string;
}

const productos: Producto[] = [
  { id: 1, nombre: "Laptop X1", descripcion: "Laptop potente", imagen: "/images/laptop.jpg", precio: 1200 },
  { id: 2, nombre: "Smartphone Pro", descripcion: "Alta gama", imagen: "/images/phone.jpg", precio: 900 },
  { id: 3, nombre: "Teclado Mecánico", descripcion: "Retroiluminado", imagen: "/images/keyboard.jpg", precio: 80 },
  { id: 4, nombre: "Mouse Gamer", descripcion: "Ergonómico", imagen: "/images/mouse.jpg", precio: 45 },
  { id: 5, nombre: "Monitor 4K", descripcion: "Alta resolución", imagen: "/images/monitor.jpg", precio: 500 },
  { id: 6, nombre: "Silla Gamer", descripcion: "Cómoda y ergonómica", imagen: "/images/chair.jpg", precio: 250 },
  { id: 7, nombre: "Tablet X10", descripcion: "Pantalla grande", imagen: "/images/tablet.jpg", precio: 600 },
  { id: 8, nombre: "Impresora Láser", descripcion: "Alta velocidad", imagen: "/images/printer.jpg", precio: 300 },
  { id: 9, nombre: "Auriculares Bluetooth", descripcion: "Sonido envolvente", imagen: "/images/headphones.jpg", precio: 100 },
  { id: 10, nombre: "Cámara Web HD", descripcion: "1080p", imagen: "/images/webcam.jpg", precio: 70 },
  { id: 11, nombre: "Disco Duro 1TB", descripcion: "Almacenamiento rápido", imagen: "/images/hdd.jpg", precio: 120 },
  { id: 12, nombre: "SSD 500GB", descripcion: "Ultra rápido", imagen: "/images/ssd.jpg", precio: 150 },
  { id: 13, nombre: "Fuente 750W", descripcion: "Eficiencia 80 Plus", imagen: "/images/psu.jpg", precio: 110 },
  { id: 14, nombre: "Tarjeta Gráfica RTX", descripcion: "4K Gaming", imagen: "/images/gpu.jpg", precio: 800 },
  { id: 15, nombre: "Microprocesador i9", descripcion: "Última generación", imagen: "/images/cpu.jpg", precio: 500 },
  { id: 16, nombre: "TV Android 8k", descripcion: "TV de última generación", imagen: "/images/tv.jpg", precio: 500 }
];

const TipoTransaccion = Object.freeze({
  IN: 'Compra',
  OUT: 'Venta',
  ADJUSTMENT: 'Ajuste'
});

export default function Movements() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoMovimiento, setNuevoMovimiento] = useState<Movimiento | null>(null);

  const fechaActual = format(new Date(), "dd/MM/yyyy HH:mm:ss");

  const openModal = () => {
    if (productoSeleccionado === null) return;
    const producto = productos.find((p) => p.id === productoSeleccionado.id);
    if (!producto) return;
    setNuevoMovimiento({
      id: movimientos.length + 1,
      fecha: fechaActual,
      tipoTransaccion: 'IN',
      productoId: producto.id,
      cantidad: 1,
      precioUnitario: producto.precio,
      precioTotal: producto.precio,
      detalle: '',
    });
    setMostrarModal(true);
  };

  const closeModal = () => setMostrarModal(false);

  const saveMovement = () => {
    if (!nuevoMovimiento) return;
    setMovimientos([...movimientos, nuevoMovimiento]);
    setMostrarModal(false);
  };

  return (
    <div className='container mt-4'>
      <h2 className='text-white'>Gestión de Movimientos</h2>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label className="form-label text-white">Seleccionar Producto</label>
            <select
              className="form-select"
              onChange={(e) => {
                const producto = productos.find((prod) => prod.id === Number(e.target.value));
                setProductoSeleccionado(producto || null);
              }}
              defaultValue={productoSeleccionado ? productoSeleccionado.id : 0}
            >
              <option value="0" disabled>Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-6">
          {/* Imagen del Producto */}
          {productoSeleccionado && (
            <div className="ms-3">
              <img src={productoSeleccionado?.imagen} alt={productoSeleccionado.nombre} width="100" className="img-thumbnail" />
            </div>
          )}
        </div>
      </div>
      <div className="mb-3 text-end">
        <button className="btn btn-dark" onClick={openModal} disabled={!productoSeleccionado}>Agregar Movimiento</button>
      </div>
      {/* Tabla de Movimientos */}
      <table className="table table-striped table-bordered table-hover table-dark mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.filter((m) => m.productoId === productoSeleccionado?.id).map((mov) => (
            <tr key={mov.id}>
              <td>{mov.id}</td>
              <td>{mov.fecha}</td>
              <td>{TipoTransaccion[mov.tipoTransaccion]}</td>
              <td>{mov.cantidad}</td>
              <td>${mov.precioUnitario}</td>
              <td>${mov.precioTotal}</td>
              <td>{mov.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar movimiento */}
      {mostrarModal && (
        <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Movimiento</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {nuevoMovimiento && (
                  <form>
                    <div>
                      <label>Nombre:</label>
                      <input type="text" className="form-control" defaultValue={productoSeleccionado?.nombre || ""} id="nombre" readOnly/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha</label>
                      <input id='fecha' type="text" className="form-control" value={nuevoMovimiento.fecha} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Transacción</label>
                      <select
                        id='tipoMovimiento'
                        className="form-select"
                        value={nuevoMovimiento.tipoTransaccion}
                        onChange={(e) => setNuevoMovimiento({
                          ...nuevoMovimiento,
                          tipoTransaccion: e.target.value as 'IN' | 'OUT' | 'ADJUSTMENT'
                        })}
                      >
                        <option value="IN">Compra</option>
                        <option value="OUT">Venta</option>
                        <option value="ADJUSTMENT">Ajuste</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cantidad</label>
                      <input
                        id='cantidad'
                        type="number"
                        className="form-control"
                        value={nuevoMovimiento.cantidad}
                        onChange={(e) => setNuevoMovimiento({
                          ...nuevoMovimiento,
                          cantidad: Number(e.target.value),
                          precioTotal: Number(e.target.value) * nuevoMovimiento.precioUnitario,
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Detalle</label>
                      <textarea
                        id='detalle'
                        className="form-control"
                        value={nuevoMovimiento.detalle}
                        onChange={(e) => setNuevoMovimiento({ ...nuevoMovimiento, detalle: e.target.value })}
                        maxLength={100}
                      />
                      <small className="text-white">Máximo 100 caracteres.</small>
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={saveMovement}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
