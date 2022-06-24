import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  // Authentication Urls//
  registerUser='api/Login/CreateLogin';
  loginUser='api/Login/GetLoginAccess';


  // Master Data //
  getDoctorsList='api/Doctors/GetDoctors';
  getHospitalBranchList='api/HospitalBranch/GetHospitalBranch';
  getPatientsList='api/Patients/GetPatients';
  getRoomTypeList ='api/RoomType/GetRoomType';
  getOperativeRoomList='api/OperativeRoom/GetOperativeRoom';
  getSpecialization = 'api/Specializations/GetSpecializations';

  getAppointmentList='api/Appointment/GetAppointment';
  getMedicinesList='api/Medicines/GetMedicines';
  getTreatmentList='api/Treatment/GetTreatment';
  

  // Doctors Module //

  getDocAppointmentList = 'api/Appointment/GetAppointment';
  createDocAppointment = 'api/Appointment/CreateAppointment';
  editDocAppointment = 'api/Appointment/EditAppointment';
  deleteDocAppointment = 'api/Appointment/DeleteAppointment';
  
  getAppointmentMedicineList = 'api/Appointmentmedicine/GetAppointmentmedicine';
  createAppointmentMedicine = 'api/Appointmentmedicine/CreateAppointmentmedicine';
  editAppointmentMedicine = 'api/Appointmentmedicine/EditAppointmentmedicine';
  deleteAppointmentMedicine = 'api/Appointmentmedicine/DeleteAppointmentmedicine';


  getTreatmentMedicineList = 'api/TreatmentMedicine/GetTreatmentMedicine';
  createTreatmentMedicine = 'api/TreatmentMedicine/CreateTreatmentMedicine';
  editTreatmentMedicine = 'api/TreatmentMedicine/EditTreatmentMedicine';
  deleteTreatmentMedicine = 'api/TreatmentMedicine/DeleteTreatmentMedicine';
  
  // Admin Module //

  createHospitalBranchList= 'api/HospitalBranch/CreateHospitalBranch';
  editHospitalBranchList= 'api/HospitalBranch/EditHospitalBranch';
  deleteHospitalBranchList ='api/HospitalBranch/DeleteHospitalBranch';


  createDoctorsList='api/Doctors/CreateDoctor';
  editDoctorsList='api/Doctors/UpdateDoctor';
  deleteDoctorsList='api/Doctors/DeleteDoctor';

  createPatientsList='api/Patients/CreatePatient';
  editPatientsList='api/Patients/UpdatePatient';
  deletePatientsList='api/Patients/DeletePatient';

  createRoomTypeList ='api/RoomType/CreateRoomType';
  editRoomTypeList ='api/RoomType/EditRoomType';
  deleteRoomTypeList ='api/RoomType/DeleteRoomType';

  createOperativeRoomList='api/OperativeRoom/CreateOperativeRoom';
  editOperativeRoomList='api/OperativeRoom/EditOperativeRoom';
  deleteOperativeRoomList='api/OperativeRoom/DeleteOperativeRoom';

  createTreatmentList='api/Treatment/CreateTreatment';
  editTreatmentList='api/Treatment/EditTreatment';
  deleteTreatmentList='api/Treatment/DeleteTreatment';

  createSpecialization = 'api/Specializations/CreateSpecializations';
  editSpecialization = 'api/Specializations/Editspecializations';
  deleteSpecialization = 'api/Specializations/DeleteSpecializations';

  createMedicinesList='api/Medicines/CreateMedicines';
  editMedicinesList='api/Medicines/EditMedicines';
  deleteMedicinesList='api/Medicines/DeleteMedicines';




}


