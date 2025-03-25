'use client';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Categoria, Movimiento } from '@/app/types/interfaces';
import { getAllProducts } from '@/app/services/productService';
import { createMovement, getMovementByProductId } from '@/app/services/inventoryService';

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const TipoTransaccion = Object.freeze({
  IN: 'Compra',
  OUT: 'Venta',
  ADJUSTMENT: 'Ajuste'
});

export default function Movements() {
  const [productolist, setProductosList] = useState<Producto[] | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoMovimiento, setNuevoMovimiento] = useState<Movimiento | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const fechaActual = format(new Date(), "dd/MM/yyyy HH:mm:ss");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducto: Producto = await getAllProducts();

        setProductosList(dataProducto.items);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    if (productoSeleccionado === null) return;
    const producto = productolist && productolist.find((p) => p.id === productoSeleccionado.id);
    if (!producto) return;
    setNuevoMovimiento({
      id: 0,
      date: fechaActual,
      type: 'IN',
      itemId: producto.id,
      quantity: 1,
      unitPrice: producto.price,
      totalPrice: producto.price,
      detail: '',
    });
    setMostrarModal(true);
  };

  const closeModal = () => setMostrarModal(false);

  const saveMovement = async () => {
    if (nuevoMovimiento) {
      try {

        await createMovement(nuevoMovimiento);
        const dataMovimiento: Movimiento[] = await getMovementByProductId(nuevoMovimiento.itemId);

        setMovimientos(dataMovimiento.movements);
      } catch (error) {
        console.error('Error fetching on new handleSaveProduct:', error);
      }
    }
    setMostrarModal(false);
  };
  const handleProductoChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const producto = productolist && productolist.find((prod) => prod.id === Number(e.target.value));

    const dataMovimiento: Movimiento[] = await getMovementByProductId(producto?.id);
    setMovimientos(dataMovimiento.movements);
  };

  return (
    <div className='container mt-4'>
      <div className="row">
        <div className="col-6">
          <div className="mb-3">
            <label className="form-label text-white">Seleccionar Producto</label>
            <select
              className="form-select"
              onChange={handleProductoChange}
              defaultValue={productoSeleccionado ? productoSeleccionado.id : 0}
            >
              <option value="0" disabled>Seleccione un producto</option>
              {productolist && productolist.map((producto) => (
                <option key={producto.id} value={producto.id}>{producto.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-6">
          {/* Imagen del Producto */}
          {productoSeleccionado && (
            <div className="ms-3">
              <img src={productoSeleccionado?.image} alt={productoSeleccionado.name} width="100" className="img-thumbnail" />
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
          {movimientos && movimientos.map((mov) => (
            <tr key={mov.id}>
              <td>{mov.id}</td>
              <td>{mov.date}</td>
              <td>{TipoTransaccion[mov.type]}</td>
              <td>{mov.quantity}</td>
              <td>${mov.unitPrice}</td>
              <td>${mov.totalPrice}</td>
              <td>{mov.detail}</td>
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
                      <input type="text" className="form-control" defaultValue={productoSeleccionado?.name || ""} id="nombre" readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Fecha</label>
                      <input id='fecha' type="text" className="form-control" value={nuevoMovimiento.date} readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tipo de Transacción</label>
                      <select
                        id='tipoMovimiento'
                        className="form-select"
                        value={nuevoMovimiento.type}
                        onChange={(e) => setNuevoMovimiento({
                          ...nuevoMovimiento,
                          type: e.target.value as 'IN' | 'OUT' | 'ADJUSTMENT'
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
                        value={nuevoMovimiento.quantity}
                        onChange={(e) => setNuevoMovimiento({
                          ...nuevoMovimiento,
                          quantity: Number(e.target.value),
                          totalPrice: Number(e.target.value) * nuevoMovimiento.unitPrice,
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Detalle</label>
                      <textarea
                        id='detalle'
                        className="form-control"
                        value={nuevoMovimiento.detail}
                        onChange={(e) => setNuevoMovimiento({ ...nuevoMovimiento, detail: e.target.value })}
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
