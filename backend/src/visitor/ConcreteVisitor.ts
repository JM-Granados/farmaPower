import { Visitor } from "./Visitor";
import { Request } from "express";
import mongoose from 'mongoose';

import RequestModel from '../models/Request';
import ExchangeModel from '../models/Exchange';


export class ConcreteVisitor implements Visitor {
  //  Este visitor es el encargado de la recuperación de los registros de solicitud candidatos de un cliente
  // el id corresponede al ID del medicamento
  async visitCandidates(params: { id: number; idClient: number }): Promise<{ success: boolean; data: any }> {
    try {
      const idClient = params.idClient;
      const idMedication = params.id;

      // Paso 1: Obtener los requests asociados al cliente y medicamento
      const requests = await RequestModel.find({
        client: new mongoose.Types.ObjectId(idClient),
        medication: new mongoose.Types.ObjectId(idMedication),
        rStatus: { $in: ['Aprobada', 'Canjeada'] }
      })
        //Query de toda la vida
        .populate({
          path: 'medication',
          model: 'ElegibleMedication',
          populate: {
            path: 'medication',
            model: 'Medication',
            select: 'name',
          },
        })
        .populate('pharmacy');

      // Paso 2: Buscar entre todos los requests recien consultados los que estan asociados a algun canje
      const requestsWithExchange = await Promise.all(
        requests.map(async (request) => {
          const exchange = await ExchangeModel.findOne({
            requests: request._id,
          }).select('exchangeNumber');

          return {
            // Los 3 puntitos se usan para el manejo de arrglos en Typescript
            // https://itsourcecode.com/typescript-tutorial/what-is-typescript-spread-operator-and-how-to-use-it/
            // Aqui lo que estamos haciendo es copiando el arreglo requests y agregando el exchangeNumber 
            ...request.toObject(), exchangeNumber: exchange ? exchange.exchangeNumber : "Sin asociación",

          };
        })
      );

      // Paso 3: Devolver los resultados
      return { success: true, data: requestsWithExchange };
    } catch (error) {
      console.error("Error al obtener los requests:", error);
      return { success: false, data: { message: "Error al obtener los requests", error } };
    }
  }


  //  Este visitor es el encargado de a recuperar los registros incluidos en un
  //  canje
  //  el id corresponde al ID del canje
  async visitExchanges(params: { id: number; idClient: number }): Promise<{ success: boolean; data: any }> {
    try {
      const idClient = params.idClient;
      const idExchange = params.id;
      console.log("idExchange", idExchange);
      console.log("idClient", idClient);
      const exchanges = await ExchangeModel.find({
        client: new mongoose.Types.ObjectId(idClient),
        _id: new mongoose.Types.ObjectId(idExchange),
      })
        //Query de toda la vida
        .populate("pharmacy")
        .populate("requests")
        .populate({
          path: 'product',
          model: 'ElegibleMedication',
          populate: {
            path: 'medication',
            model: 'Medication',
            select: 'name',
          },
        })
        .populate("client")

      console.log("CONCRETE VISITOR -> exchanges", exchanges);

      //  Fecha del canje
      //  Número de canje – debería mostrarse de mayor a menor por la cronología.
      //  Producto incluido en el canje : descripción , puntos requeridos.
      //  Detalle del número de solicitud registrada, número de factura y farmacia de los
      // registros que respaldan el canje.
      // Al final de la consulta debe presentar:
      //  Cantidad de puntos globales acumulados.
      //  Cantidad de puntos globales usados en canjes.
      //  Cantidad de puntos globales disponibles. 

      return { success: true, data: exchanges };
    } catch (error) {
      console.error("Error al obtener los requests:", error);
      return { success: false, data: { message: "Error al obtener los canjes", error } };
    }
  }
}