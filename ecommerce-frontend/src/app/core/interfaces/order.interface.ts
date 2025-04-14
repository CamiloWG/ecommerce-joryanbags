

export interface RawOrder {
    nombreCompleto: string,
    telefono: string,
    email: string,
    cedula: string,
    departamento: string,
    ciudad: string,
    barrio: string,
    direccion: string,
    informacionAdicional: string
}

export interface Order {
    order_id: number,
    user_id: number,
    client_name: string,
    client_phone: number,
    date_creation: string,
    address: string,
    total_price: number,
    details: string,
    status_id: number,
    name: string
}