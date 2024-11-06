import { ElegibleMedicationBase, PointsBasedElegibleMedication } from '../models/ElegibleMedicationBase';

export class ElegibleMedicationFactory {
  static createElegibleMedication(type: string, data: any): ElegibleMedicationBase {
    type = 'points';
    switch (type) {
      case 'points':
        return new PointsBasedElegibleMedication(data.medication, data.points, data.exchangeAmount);
      default:
        throw new Error(`Unknown ElegibleMedication type: ${type}`);
    }
  }
}
