export class DataStructurePrRequest{
    public consecutivo: number;
    public fechaRegistro: Date;
    public cliente: string;
    public email: string;
    public celular: string;
    public ciudad:string;
    public estado: string;
    public lineaDeVehiculo:string;
    public canalPrimario:string;
    public canalSecundario:string;
    public observaciones:string;
    public gerenteDeCuenta: string;

    public static MapDataToExport(_LsData:DataStructurePrRequest[]):any{
        let lsData = _LsData.map( row => ({
            "Consecutivo": row.consecutivo,
            "Fecha de registro": row.fechaRegistro,
            "Cliente":row.cliente,
            "Email":row.email,
            "Celular":row.celular,
            "Ciudad": row.ciudad,
            "Estado de la solicitud": row.estado,
            "Linea de vehiculo":row.lineaDeVehiculo,
            "Canal primario": row.canalPrimario,
            "Canal secundario": row.canalSecundario,
            "Observaciones": row.observaciones,
            "Gerente de cuenta": row.gerenteDeCuenta
        }));

        console.log(lsData);
        return lsData;
    }

}