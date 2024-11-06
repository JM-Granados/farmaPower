export abstract class ElegibleMedicationBase {
    constructor(
      public medication: string, // ObjectId in string form
      public exchangeAmount: number
    ) {}
  
    abstract getDetails(): Record<string, any>;
  }
  
  export class PointsBasedElegibleMedication extends ElegibleMedicationBase {
    constructor(
      medication: string,
      public points: number,
      exchangeAmount: number
    ) {
      super(medication, exchangeAmount);
    }
  
    getDetails() {
      return {
        medication: this.medication,
        points: this.points,
        exchangeAmount: this.exchangeAmount
      };
    }
  }