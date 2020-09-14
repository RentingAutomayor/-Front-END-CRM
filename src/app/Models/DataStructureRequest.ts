export class DataStructureRequest{
    public nit:string;
    public consecutivo:number;
    public canal:string;
    public cliente:string;
    public gerenteRenting:string;
    public vp:string;
    public banca:string;
    public segmento:string;
    public regional:string;
    public cne:string;
    public ccBanco:string;
    public gerenteBanco:string;
    public departamentoEmpresa:string;
    public ciudadEmpresa:string;
    public daneEmpresa:string;
    public contactoEmpresa:string;
    public cargo:string;
    public telefono:string;
    public celular:string;
    public direccion:string;
    public correo:string;
    public actividadEconomica:string;
    public codigoActividadEconomica:string;
    public observaciones:string;
    public fechaVisita:Date;
    public fechaUltimaVisita:Date;
    public estadoPrincipal:string;
    public estadoSecundario:string;
    public tercerEstado:string;
    public probabilidad:string;
    public decisionRiesgo:string;
    public fechaRadicacionRiesgo:Date;
    public montoAprobado:number;
    public vehiculosEntregados:number;
    public montoActivosEntregado:number;
    public fechaLegalizacion:Date;
    public fechaEntrega:Date;
    public usuarioCreacionRegistro:string;
    public fechaCreacion:Date;
    public usuarioActualizacionRiesgo:string;
    public fechaActualizacion:Date;
    public usuarioActualizacionRiesgoOP:string;
    public fechaActualizacionRiesgoOp:Date;


    public static MapDataToExport(_LsData:DataStructureRequest[]):any{
        const data = _LsData;
        const dataMap = data.map(row => ({
            'NIT': row.nit,
            'Consecuitivo': row.consecutivo,
            'Canal': row.canal,
            'Cliente': row.cliente,
            'Gerente renting': row.gerenteRenting,
            'VP': row.vp,
            'Banca': row.banca,
            'Segmento': row.segmento,
            'Regional':row.regional,
            'CNE/Zona':row.cne,
            'CC Banco':row.ccBanco,
            'Gerente a cargo banco': row.gerenteBanco,
            'Departamento empresa':row.departamentoEmpresa,
            'Ciudad empresa':row.ciudadEmpresa,
            'Dane empresa':row.daneEmpresa,
            'Contacto empresa':row.contactoEmpresa,
            'Cargo':row.cargo,
            'Teléfono':row.telefono,
            'Celular':row.celular,
            'Dirección':row.direccion,
            'Correo':row.correo,
            'Actividad económica':row.actividadEconomica,
            'Código act económica':row.codigoActividadEconomica,
            'Observaciones':row.observaciones,
            'Fecha visita':row.fechaVisita,
            'Fecha última visita':row.fechaUltimaVisita,
            'Estado principal':row.estadoPrincipal,
            'Estado secundario':row.estadoSecundario,
            'Tercer estado':row.tercerEstado,
            'Probabilidad':row.probabilidad,
            'Decisión de riesgo':row.decisionRiesgo,
            'Fecha radicación riesgo':row.fechaRadicacionRiesgo,
            'Monto aprobado':row.montoAprobado,
            '# Vehículos entregados':row.vehiculosEntregados,
            'Monto activos entregado':row.montoActivosEntregado,
            'Fecha legalización':row.fechaLegalizacion,
            'Fecha entrega':row.fechaEntrega,
            'Usuario creción registro':row.usuarioCreacionRegistro,
            'Fecha creación':row.fechaCreacion,
            'Usuario actualización registro': row.usuarioActualizacionRiesgo,
            'Fecha actualización':row.fechaActualizacion,
            'Usuario actualización riesgoOp': row.usuarioActualizacionRiesgoOP,
            'Fecha actualización riesgoOp': row.fechaActualizacionRiesgoOp
        }));
        console.log("[Data Mapeada] : ");
        console.log(dataMap);
        return dataMap;
    }
}