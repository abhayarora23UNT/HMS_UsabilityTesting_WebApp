export class HospitalBranch {
    hospitalId: number;
    roomTypeId:number;
    hospitalCode:string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    phone1: string;
    phone2: string;
    description: string;
    email: string;
    

    constructor() {
        this.hospitalId=0;
        this.roomTypeId=0;
        this.hospitalCode='';
        this.name = '';
        this.address1 = '';
        this.address2 = '';
        this.city = '';
        this.phone1 = '';
        this.phone2 = '';
        this.email = '';
        this.description = '';
    }
}

