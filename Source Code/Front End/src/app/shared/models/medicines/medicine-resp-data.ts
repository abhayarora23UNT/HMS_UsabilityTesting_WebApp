export class medicine {
    medicineId: number;
    medicineCode:number;
    name: string;
    company: string;
    composition: string;
    expiryDate: any;
    dosage:string;
    type:string;
    description:string;
    cost:number;
    availabelQuantity:number;

    

    constructor() {
        this.medicineId = 0;
        this.medicineCode=0;
        this.name ='';
        this.company ='';
        this.composition ='';
        this.dosage ='';
        this.company ='';
        this.expiryDate = '';
        this.type = '';
        this.description='';
        this.cost=0;
        this.availabelQuantity=0;
      
    }
}