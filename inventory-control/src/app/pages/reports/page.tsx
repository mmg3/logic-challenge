import { useState } from 'react';

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
  { id: 1, nombre: "Laptop X1", descripcion: "Laptop potente", imagen: "/images/laptop.jpg", precio: 1200, stock: 10 },
  { id: 2, nombre: "Smartphone Pro", descripcion: "Alta gama", imagen: "/images/phone.jpg", precio: 900, stock: 15 },
  { id: 3, nombre: "Teclado Mecánico", descripcion: "Retroiluminado", imagen: "/images/keyboard.jpg", precio: 80, stock: 25 },
  { id: 4, nombre: "Mouse Gamer", descripcion: "Ergonómico", imagen: "/images/mouse.jpg", precio: 45, stock: 30 },
  { id: 5, nombre: "Monitor 4K", descripcion: "Alta resolución", imagen: "/images/monitor.jpg", precio: 500, stock: 12 },
  { id: 6, nombre: "Silla Gamer", descripcion: "Cómoda y ergonómica", imagen: "/images/chair.jpg", precio: 250, stock: 8 },
  { id: 7, nombre: "Tablet X10", descripcion: "Pantalla grande", imagen: "/images/tablet.jpg", precio: 600, stock: 20 },
  { id: 8, nombre: "Impresora Láser", descripcion: "Alta velocidad", imagen: "/images/printer.jpg", precio: 300, stock: 10 },
  { id: 9, nombre: "Auriculares Bluetooth", descripcion: "Sonido envolvente", imagen: "/images/headphones.jpg", precio: 100, stock: 40 },
  { id: 10, nombre: "Cámara Web HD", descripcion: "1080p", imagen: "/images/webcam.jpg", precio: 70, stock: 18 },
  { id: 11, nombre: "Disco Duro 1TB", descripcion: "Almacenamiento rápido", imagen: "/images/hdd.jpg", precio: 120, stock: 22 },
  { id: 12, nombre: "SSD 500GB", descripcion: "Ultra rápido", imagen: "/images/ssd.jpg", precio: 150, stock: 14 },
  { id: 13, nombre: "Fuente 750W", descripcion: "Eficiencia 80 Plus", imagen: "/images/psu.jpg", precio: 110, stock: 16 },
  { id: 14, nombre: "Tarjeta Gráfica RTX", descripcion: "4K Gaming", imagen: "/images/gpu.jpg", precio: 800, stock: 6 },
  { id: 15, nombre: "Microprocesador i9", descripcion: "Última generación", imagen: "/images/cpu.jpg", precio: 500, stock: 9 },
  { id: 16, nombre: "TV Android 8k", descripcion: "TV de última generación", imagen: "/images/tv.jpg", precio: 500, stock: 3 }
];

const transacciones: Movimiento[] = [
  { id: 1, productoId: 1, fecha: '2025-03-20', tipoTransaccion: 'IN', cantidad: 10, precioUnitario: 1200, precioTotal: 12000, detalle: 'Compra de laptops' },
  { id: 2, productoId: 1, fecha: '2025-03-21', tipoTransaccion: 'OUT', cantidad: 5, precioUnitario: 1200, precioTotal: 6000, detalle: 'Venta de laptops' },
  { id: 3, productoId: 2, fecha: '2025-03-22', tipoTransaccion: 'IN', cantidad: 15, precioUnitario: 900, precioTotal: 13500, detalle: 'Compra de smartphones' },
  { id: 4, productoId: 2, fecha: '2025-03-23', tipoTransaccion: 'ADJUSTMENT', cantidad: 10, precioUnitario: 900, precioTotal: 9000, detalle: 'Ajuste de stock' },
];

export default function Reports() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroTipoTransaccion, setFiltroTipoTransaccion] = useState('');

   // Filtrar las transacciones por producto, fecha y tipo
  const transaccionesFiltradas = transacciones.filter((movimiento) => {
    const fechaValida = (
      (fechaInicio === '' || movimiento.fecha >= fechaInicio) &&
      (fechaFin === '' || movimiento.fecha <= fechaFin)
    );
    const tipoValido = filtroTipoTransaccion === '' || movimiento.tipoTransaccion === filtroTipoTransaccion;

    return movimiento.productoId === (productoSeleccionado?.id || null) && fechaValida && tipoValido;
  });

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const productoId = Number(e.target.value);
    const producto = productos.find((prod) => prod.id === productoId);
    if(producto){
      setProductoSeleccionado(producto);
    }
  };

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
              onChange={(e) => {
                const producto = productos.find((prod) => prod.id === Number(e.target.value));
                setProductoSeleccionado(producto || null);
              }}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>{producto.nombre}</option>
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
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="fechaFin" className="form-label text-white">Fecha Fin</label>
            <input
              type="date"
              id="fechaFin"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div className="col-md-4 mt-3">
            <label htmlFor="tipoTransaccion" className="form-label text-white">Tipo de Transacción</label>
            <select
              id="tipoTransaccion"
              className="form-select"
              value={filtroTipoTransaccion}
              onChange={(e) => setFiltroTipoTransaccion(e.target.value)}
            >
              <option value="">Seleccionar Tipo</option>
              <option value="IN">Compra</option>
              <option value="OUT">Venta</option>
              <option value="ADJUSTMENT">Ajuste</option>
            </select>
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
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {transaccionesFiltradas.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">No hay transacciones para este producto.</td>
            </tr>
          ) : (
            transaccionesFiltradas.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.id}</td>
                <td>{mov.fecha}</td>
                <td>{TipoTransaccion[mov.tipoTransaccion]}</td>
                <td>{mov.cantidad}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
