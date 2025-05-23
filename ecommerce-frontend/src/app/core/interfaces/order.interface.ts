

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

export interface OrderDetails {
    order_details_id: number,
    name: string,
    quantity: number,
    subtotal: number
}


export interface Earning {
    earnings: TimeInfo,
    salesCount: TimeInfo
}

export interface TimeInfo {
    total: number,
    today: number,
    last_week: number,
    last_month: number,
    last_3_months: number
}