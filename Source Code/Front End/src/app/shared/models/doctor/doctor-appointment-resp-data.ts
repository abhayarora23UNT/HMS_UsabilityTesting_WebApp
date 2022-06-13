export class DoctorAppointment {
    appointmentId: number;
    appointmentCode: string;
    doctorId: number;
    patientId: number;
    hospitalId: number;
    appt_Date: string;
    next_Appt_Date: string;
    diseaseNotes: string;
    fee: number;


    constructor() {
        this.appointmentId = 0;
        this.appointmentCode = '';
        this.doctorId = 0;
        this.patientId = 0;
        this.hospitalId = 0;
        this.appt_Date = '';
        this.next_Appt_Date = '';
        this.diseaseNotes = '';
        this.fee = 0.0;
    }
}

