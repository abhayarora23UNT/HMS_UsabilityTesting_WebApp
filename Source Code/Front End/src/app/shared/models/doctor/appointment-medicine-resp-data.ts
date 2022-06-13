export class DocAppointmentMedicine {
    apptMedicineId: number;
    appointmentId: number;
    medicineId: number;
    limits: number;
    
    constructor() {
        this.appointmentId = 0;
        this.apptMedicineId = 0;
        this.medicineId = 0;
        this.limits = 0;
    }
}

