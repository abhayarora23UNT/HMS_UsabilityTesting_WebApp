export class DoctorAppointment {
    appointmentId: number;
    appointmentCode: string;
    doctorId: number;
    doctorName: string;
    patientId: number;
    patientName: string;
    hospitalName: string;
    hospitalId: number;
    appt_Date: string;
    next_Appt_Date: string;
    diseaseNotes: string;
    fee: number;


    constructor() {
        this.appointmentId = 0;
        this.appointmentCode = '';
        this.doctorId = 0;
        this.doctorName= '';
        this.patientId = 0;
        this.patientName= '';
        this.hospitalName='';
        this.hospitalId = 0;
        this.appt_Date = '';
        this.next_Appt_Date = '';
        this.diseaseNotes = '';
        this.fee = 0.0;
    }
}

