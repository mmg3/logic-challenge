export interface Producto {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    stock: number;
    image: string;
    oldStock?: number;
  }
  
  export interface Categoria {
    id: number;
    name: string;
  }
  
  export interface Movimiento {
    id: number;
    date: string;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    itemId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    detail: string;
  }