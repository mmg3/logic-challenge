import { getAllMovements } from '@/app/services/inventoryService';
import { getAllProducts } from '@/app/services/productService';
import { Categoria, Movimiento } from '@/app/types/interfaces';
import { useEffect, useState } from 'react';

const TipoTransaccion = Object.freeze({
  IN: 'Compra',
  OUT: 'Venta',
  ADJUSTMENT: 'Ajuste'
});

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}


export default function Reports() {
  const [productolist, setProductosList] = useState<Producto[] | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroTipoTransaccion, setFiltroTipoTransaccion] = useState('');
  const [transacciones, setTransacciones] = useState<Movimiento[]>([]);
  const [transaccionesFiltradas, setTransaccionesFiltradas] = useState<Movimiento[]>([]);
  const [filtroProducto, setFiltroProducto] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducto: Producto[] = await getAllProducts();
        setProductosList(dataProducto.items);

        const dataMovimientos: Movimiento[] = await getAllMovements();
        setTransacciones(dataMovimientos.movements);
        setTransaccionesFiltradas(dataMovimientos.movements);
        
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    fetchData();
  }, []);


  const filtraTransaccionesProducto = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const productoId = Number(e.target.value);

    const filtraTransac = transaccionesFiltradas.filter((movimiento) =>
      movimiento.itemId === productoId
    );
    
    setTransaccionesFiltradas(filtraTransac);
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const productoId = Number(e.target.value);
    const producto = productolist && productolist.find((prod) => prod.id === productoId);
    if (producto) {
      setProductoSeleccionado(producto);
    }
    setFiltroProducto(productoId.toString());
    filtraTransaccionesProducto(e);
  };

  const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fechaInicio = e.target.value;
    setFechaInicio(fechaInicio);

    const filtraTransac = transaccionesFiltradas.filter((movimiento) =>
      movimiento.date >= fechaInicio
    );

    setTransaccionesFiltradas(filtraTransac);
  };

  const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fechaFin = e.target.value;
    setFechaFin(fechaFin);

    const filtraTransac = transaccionesFiltradas.filter((movimiento) =>
      movimiento.date <= fechaFin
    );

    setTransaccionesFiltradas(filtraTransac);
  };

  const handleTipoTransaccionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tipoTransaccion = e.target.value;
    setFiltroTipoTransaccion(tipoTransaccion);

    const filtraTransac = transaccionesFiltradas.filter((movimiento) =>
      movimiento.type === tipoTransaccion
    );

    setTransaccionesFiltradas(filtraTransac);
  };
  
  const hadleFilterRest = () => {
    setFechaInicio('');
    setFechaFin('');
    setFiltroTipoTransaccion('');
    setFiltroProducto('');
    setProductoSeleccionado(null);
    setTransaccionesFiltradas(transacciones);
  }

  return (
    <div className="container mt-4">
      <h2 className="text-white">Historial de Transacciones</h2>

      {/* Filtros */}
      <div className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="producto" className="form-label text-white">Seleccionar Producto</label>
            <select
              id="producto"
              className="form-select"
              onChange={handleProductoChange}
              value={filtroProducto}
            >
              <option value="" disabled>Seleccione un producto</option>
              {productolist && productolist.map((producto) => (
                <option key={producto.id} value={producto.id}>{producto.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="fechaInicio" className="form-label text-white">Fecha Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              className="form-control"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="fechaFin" className="form-label text-white">Fecha Fin</label>
            <input
              type="date"
              id="fechaFin"
              className="form-control"
              value={fechaFin}
              onChange={handleFechaFinChange}
            />
          </div>

          <div className="col-md-4 mt-3">
            <label htmlFor="tipoTransaccion" className="form-label text-white">Tipo de Transacción</label>
            <select
              id="tipoTransaccion"
              className="form-select"
              value={filtroTipoTransaccion}
              onChange={handleTipoTransaccionChange}
            >
              <option value="" disabled>Seleccionar Tipo</option>
              <option value="IN">Compra</option>
              <option value="OUT">Venta</option>
              <option value="ADJUSTMENT">Ajuste</option>
            </select>
          </div>
          <div className="mb-3 text-end">
            <button className="btn btn-dark" onClick={hadleFilterRest} >Reset</button>
          </div>
        </div>
      </div>

      {/* Historial de Transacciones */}
      {productoSeleccionado && (
        <div className="mb-3">
          <h4 className="text-white">{productoSeleccionado.nombre}</h4>
          <p className="text-white">Stock disponible: {productoSeleccionado.stock}</p>
        </div>
      )}

      <table className="table table-striped table-bordered table-hover table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {transaccionesFiltradas.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">No hay transacciones para este producto.</td>
            </tr>
          ) : (
            transaccionesFiltradas.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{productolist?.find(p => p.id === mov.itemId)?.name}</td>
                <td>{mov.date}</td>
                <td>{TipoTransaccion[mov.type]}</td>
                <td>{mov.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
