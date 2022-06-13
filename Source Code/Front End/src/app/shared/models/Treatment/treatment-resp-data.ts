export class Treatment {
    treatmentId:number;
    patientId: number;
    duration:number;
    doctorId: number;
    name: string;
    operativeRoomId:number;
    


    constructor() {
        this.treatmentId=0;
        this.patientId = 0;
        this.duration=0;
        this.doctorId =0;
        this.name = '';
        this.operativeRoomId=0;
        
}
}
