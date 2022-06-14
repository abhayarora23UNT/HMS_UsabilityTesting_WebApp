using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication4.UtilityClasses;
using System.Web.Http.Cors;

namespace WebApplication4.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HospitalManagementController : ApiController
    {
        static string nodatafound = @"{""Message"": ""No data found""}";
        static string noaction = @"{""Message"": ""No action performed, please try again""}";

        #region API Health
        [HttpGet]
        [Route("api/Health")]
        public async Task<string> Get()
        {
            await Task.Delay(1);
            return "Service Running! Healthy!";
        }

        private void BadRequestValidation<T>(T RequestObject) where T : class
        {
            var modelStateJson = ModelState.SelectMany(x => x.Value.Errors.Select(e => (string.IsNullOrEmpty(e.ErrorMessage) ? e.Exception.Message : e.ErrorMessage))).Aggregate((a, b) => a + b);
            var message = "Model Validation faiiled, Required fields are not provided. More details : " + modelStateJson;

            int id = 0;
            if (typeof(T) == typeof(Doctor)) { Doctor newT1 = (Doctor)(object)RequestObject; id = newT1.DoctorId; }
            if (typeof(T) == typeof(Nurse)) { Nurse newT1 = (Nurse)(object)RequestObject; id = newT1.NurseId; }
            if (typeof(T) == typeof(HospitalBranch)) { HospitalBranch newT1 = (HospitalBranch)(object)RequestObject; id = newT1.HospitalId; }
            if (typeof(T) == typeof(Patient)) { Patient newT1 = (Patient)(object)RequestObject; id = newT1.PatientId; }
            if (typeof(T) == typeof(Medicine)) { Medicine newT1 = (Medicine)(object)RequestObject; id = newT1.MedicineId; }
            if (typeof(T) == typeof(Service)) { Service newT1 = (Service)(object)RequestObject; id = newT1.ServiceRoomId; }
            if (typeof(T) == typeof(OperativeRoom)) { OperativeRoom newT1 = (OperativeRoom)(object)RequestObject; id = newT1.OperativeRoomId; }
            if (typeof(T) == typeof(Medication)) { Medication newT1 = (Medication)(object)RequestObject; id = newT1.MedicationId; }
            if (typeof(T) == typeof(TreatmentNurse)) { TreatmentNurse newT1 = (TreatmentNurse)(object)RequestObject; id = newT1.TreatmentNurseId; }
            if (typeof(T) == typeof(Treatment)) { Treatment newT1 = (Treatment)(object)RequestObject; id = newT1.TreatmentId; }
            if (typeof(T) == typeof(Admission)) { Admission newT1 = (Admission)(object)RequestObject; id = newT1.AdmissionId; }
            if (typeof(T) == typeof(Payment)) { Payment newT1 = (Payment)(object)RequestObject; id = newT1.PaymentId; }

            var response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            var responseModel = new Respone { ID = id, Message = message };
            response.Content = new StringContent(JsonConvert.SerializeObject(responseModel), System.Text.Encoding.UTF8, "application/json");
            throw new HttpResponseException(response);
        }

        private HttpResponseMessage PrepareDMLOutput(ResponseMessage action)
        {
            string Json = "";
            Json = JsonConvert.SerializeObject(action);
            return Request.CreateResponse(HttpStatusCode.OK, Json);
        }

        #endregion

        #region Login

        [HttpPost]
        [Route("api/Login/GetLoginAccess")]
        public async Task<HttpResponseMessage> GetLoginAccess(Users users)
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                await Task.Yield();
                string Json = "";
                var response = new HttpResponseMessage();
                string command = "select UserRole from Users where UserName='" + users.Email + "' and Password='" + users.Password + "'";
                objres = Dal.GetDataforcommand(command);
                Json = JsonConvert.SerializeObject(objres);
                return Request.CreateResponse(HttpStatusCode.OK, Json);

            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Login/CreateLogin")]
        public async Task<HttpResponseMessage> CreateLogin(Users users)
        {
            await Task.Yield();
            ResponseMessage objres = new ResponseMessage();
            string Json = "";
            objres = Dal.InsertRecord(users);
            Json = JsonConvert.SerializeObject(objres);
            return Request.CreateResponse(HttpStatusCode.OK, Json);
        }
        #endregion

        #region Specializations

        [HttpPost]
        [Route("api/Specializations/CreateSpecializations")]
        public async Task<HttpResponseMessage> CreateSpecializations(Specializations specializations)
        {
            await Task.Yield();
            ModelState.Remove("specializations.SpecializationsId");

            if (specializations == null)
                BadRequestValidation(specializations);
            return PrepareDMLOutput(Dal.InsertRecord(specializations));
        }

        [HttpPut]
        [Route("api/Specializations/Editspecializations")]
        public async Task<HttpResponseMessage> Editspecializations(Specializations specializations)
        {
            await Task.Yield();
            if (specializations == null)
                BadRequestValidation(specializations);
            return PrepareDMLOutput(Dal.UpdateRecord(specializations));
        }

        [HttpDelete]
        [Route("api/Specializations/DeleteSpecializations/{SpecializationsId:int?}")]
        public async Task<HttpResponseMessage> DeleteSpecializations(int SpecializationsId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Specializations", SpecializationsId));
        }

        [HttpPost]
        [Route("api/Specializations/GetSpecializations/{SpecializationsId:int?}")]
        public async Task<HttpResponseMessage> GetSpecializations(int SpecializationsId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("Specializations", SpecializationsId, "SpecializationID");
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Specializations/GetSpecializations")]
        public async Task<HttpResponseMessage> GetSpecializations()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("Specializations", 0, string.Empty);
                Json = JsonConvert.SerializeObject(objres,Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region HospitalBranch

        [HttpPost]
        [Route("api/HospitalBranch/CreateHospitalBranch")]
        public async Task<HttpResponseMessage> CreateHospitalBranch(HospitalBranch hospitalbranch)
        {
            await Task.Yield();
            if (hospitalbranch == null)
                BadRequestValidation(hospitalbranch);
            return PrepareDMLOutput(Dal.InsertRecord(hospitalbranch));
        }

        [HttpPut]
        [Route("api/HospitalBranch/EditHospitalBranch")]
        public async Task<HttpResponseMessage> EditHospitalBranch(HospitalBranch hospitalbranch)
        {
            await Task.Yield();
            if (hospitalbranch == null)
                BadRequestValidation(hospitalbranch);
            return PrepareDMLOutput(Dal.UpdateRecord(hospitalbranch));
        }

        [HttpDelete]
        [Route("api/HospitalBranch/DeleteHospitalBranch/{HospitalBranchId:int?}")]
        public async Task<HttpResponseMessage> DeleteHospitalBranch(int HospitalBranchId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("hospitals", HospitalBranchId));
        }

        [HttpPost]
        [Route("api/HospitalBranch/GetHospitalBranch/{HospitalBranchId:int?}")]
        public async Task<HttpResponseMessage> GetHospitalBranch(int HospitalBranchId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("hospitals", HospitalBranchId, "HospitalId");
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/HospitalBranch/GetHospitalBranch")]
        public async Task<HttpResponseMessage> GetHospitalBranch()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres =Dal.GetData("hospitals", 0, string.Empty);
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Doctors

        [HttpPost]
        [Route("api/Doctors/CreateDoctor")]
        public async Task<HttpResponseMessage> CreateDoctor(Doctor doctor)
        {
            await Task.Yield();
            ModelState.Remove("doctor.DoctorCode");

            if (doctor == null)
                BadRequestValidation(doctor);
            return PrepareDMLOutput(Dal.InsertRecord(doctor));
        }


        [HttpPut]
        [Route("api/Doctors/UpdateDoctor")]
        public async Task<HttpResponseMessage> UpdateDoctor(Doctor doctor)
        {
            await Task.Yield();
            if (doctor == null)
                BadRequestValidation(doctor);
            return PrepareDMLOutput(Dal.UpdateRecord(doctor));
        }

        [HttpDelete]
        [Route("api/Doctors/DeleteDoctor/{DoctorId:int?}")]
        public async Task<HttpResponseMessage> DeleteDoctor(int DoctorId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Doctor", DoctorId));
        }

        [HttpPost]
        [Route("api/Doctors/GetDoctors/{DoctorId:int?}")]
        public async Task<HttpResponseMessage> GetDoctors(int DoctorId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("doctors", DoctorId, "DoctorId");
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Doctors/GetDoctors")]
        public async Task<HttpResponseMessage> GetDoctors()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("doctors", 0, string.Empty);
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }

        #endregion

        #region Patients

        [HttpPost]
        [Route("api/Patients/CreatePatient")]
        public async Task<HttpResponseMessage> CreatePatient(Patient Patient)
        {
            await Task.Yield();
            ModelState.Remove("patient.PatientCode");

            if (Patient == null)
                BadRequestValidation(Patient);
            return PrepareDMLOutput(Dal.InsertRecord(Patient));
        }

        [HttpPut]
        [Route("api/Patients/UpdatePatient")]
        public async Task<HttpResponseMessage> UpdatePatient(Patient Patient)
        {
            await Task.Yield();
            if (Patient == null)
                BadRequestValidation(Patient);

            return PrepareDMLOutput(Dal.UpdateRecord(Patient));
        }

        [HttpDelete]
        [Route("api/Patients/DeletePatient/{PatientId:int?}")]
        public async Task<HttpResponseMessage> DeletePatient(int PatientId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("patients", PatientId));
        }

        [HttpPost]
        [Route("api/Patients/GetPatients/{PatientId:int?}")]
        public async Task<HttpResponseMessage> GetPatients(int PatientId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres =Dal.GetData("patients", PatientId, string.Empty);
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }

        #endregion

        #region PaymentMode

        [HttpPost]
        [Route("api/PaymentMode/CreatePaymentMode")]
        public async Task<HttpResponseMessage> CreatePaymentMode(PaymentMode paymentmodes)
        {
            await Task.Yield();
            if (paymentmodes == null)
                BadRequestValidation(paymentmodes);
            return PrepareDMLOutput(Dal.InsertRecord(paymentmodes));
        }

        [HttpPut]
        [Route("api/PaymentMode/EditPaymentMode")]
        public async Task<HttpResponseMessage> EditPaymentMode(PaymentMode paymentmodes)
        {
            await Task.Yield();
            if (paymentmodes == null)
                BadRequestValidation(paymentmodes);
            return PrepareDMLOutput(Dal.UpdateRecord(paymentmodes));
        }

        [HttpDelete]
        [Route("api/PaymentMode/DeletePaymentMode/{PaymentModeId:int?}")]
        public async Task<HttpResponseMessage> DeletePaymentMode(int PaymentModeId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("paymentmodes", PaymentModeId));
        }

        [HttpPost]
        [Route("api/PaymentMode/GetPaymentMode/{PaymentModeId:int?}")]
        public async Task<HttpResponseMessage> GetPaymentMode(int PaymentModeId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("paymentmodes", PaymentModeId, "PaymentModeId");
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/PaymentMode/GetPaymentMode")]
        public async Task<HttpResponseMessage> GetPaymentMode()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("paymentmodes", 0, string.Empty);
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region RoomType

        [HttpPost]
        [Route("api/RoomType/CreateRoomType")]
        public async Task<HttpResponseMessage> CreateRoomType(RoomType roomtype)
        {
            await Task.Yield();
            if (roomtype == null)
                BadRequestValidation(roomtype);
            return PrepareDMLOutput(Dal.InsertRecord(roomtype));
        }

        [HttpPut]
        [Route("api/RoomType/EditRoomType")]
        public async Task<HttpResponseMessage> EditRoomType(RoomType roomtype)
        {
            await Task.Yield();
            if (roomtype == null)
                BadRequestValidation(roomtype);
            return PrepareDMLOutput(Dal.UpdateRecord(roomtype));
        }

        [HttpDelete]
        [Route("api/RoomType/DeleteRoomType/{RoomTypeId:int?}")]
        public async Task<HttpResponseMessage> DeleteRoomType(int RoomTypeId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("roomtypes", RoomTypeId));
        }

        [HttpPost]
        [Route("api/RoomType/GetRoomType/{RoomTypeId:int?}")]
        public async Task<HttpResponseMessage> GetRoomType(int RoomTypeId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage objres = Dal.GetData("roomtypes", RoomTypeId, "RoomTypeId");
                Json = JsonConvert.SerializeObject(objres, Formatting.Indented);
                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/RoomType/GetRoomType")]
        public async Task<HttpResponseMessage> GetRoomType()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("roomtypes", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region OperativeRoom

        [HttpPost]
        [Route("api/OperativeRoom/CreateOperativeRoom")]
        public async Task<HttpResponseMessage> CreateOperativeRoom(OperativeRoom operativeroom)
        {
            await Task.Yield();
            if (operativeroom == null)
                BadRequestValidation(operativeroom);
            return PrepareDMLOutput(Dal.InsertRecord(operativeroom));
        }

        [HttpPut]
        [Route("api/OperativeRoom/EditOperativeRoom")]
        public async Task<HttpResponseMessage> EditOperativeRoom(OperativeRoom operativeroom)
        {
            await Task.Yield();
            if (operativeroom == null)
                BadRequestValidation(operativeroom);
            return PrepareDMLOutput(Dal.UpdateRecord(operativeroom));
        }

        [HttpDelete]
        [Route("api/OperativeRoom/DeleteOperativeRoom/{OperativeRoomId:int?}")]
        public async Task<HttpResponseMessage> DeleteOperativeRoom(int OperativeRoomId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("operativerooms", OperativeRoomId));
        }

        [HttpPost]
        [Route("api/OperativeRoom/GetOperativeRoom/{OperativeRoomId:int?}")]
        public async Task<HttpResponseMessage> GetOperativeRoom(int OperativeRoomId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("operativerooms", OperativeRoomId, "OperativeRoomId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/OperativeRoom/GetOperativeRoom")]
        public async Task<HttpResponseMessage> GetOperativeRoom()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("operativerooms", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Nurse

        [HttpPost]
        [Route("api/Nurse/CreateNurse")]
        public async Task<HttpResponseMessage> CreateNurse(Nurse nurse)
        {
            await Task.Yield();
            if (nurse == null)
                BadRequestValidation(nurse);
            return PrepareDMLOutput(Dal.InsertRecord(nurse));
        }

        [HttpPut]
        [Route("api/Nurse/EditNurse")]
        public async Task<HttpResponseMessage> EditNurse(Nurse nurse)
        {
            await Task.Yield();
            if (nurse == null)
                BadRequestValidation(nurse);
            return PrepareDMLOutput(Dal.UpdateRecord(nurse));
        }

        [HttpDelete]
        [Route("api/Nurse/DeleteNurse/{NurseId:int?}")]
        public async Task<HttpResponseMessage> DeleteNurse(int NurseId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("nurse", NurseId));
        }

        [HttpPost]
        [Route("api/Nurse/GetNurse/{NurseId:int?}")]
        public async Task<HttpResponseMessage> GetNurse(int NurseId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("nurses", NurseId, "NurseId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Nurse/GetNurse")]
        public async Task<HttpResponseMessage> GetNurse()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("nurses", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Medicines

        [HttpPost]
        [Route("api/Medicines/CreateMedicines")]
        public async Task<HttpResponseMessage> CreateMedicines(Medicine medicines)
        {
            await Task.Yield();
            if (medicines == null)
                BadRequestValidation(medicines);
            return PrepareDMLOutput(Dal.InsertRecord(medicines));
        }

        [HttpPut]
        [Route("api/Medicines/EditMedicines")]
        public async Task<HttpResponseMessage> EditMedicines(Medicine medicines)
        {
            await Task.Yield();
            if (medicines == null)
                BadRequestValidation(medicines);
            return PrepareDMLOutput(Dal.UpdateRecord(medicines));
        }

        [HttpDelete]
        [Route("api/Medicines/DeleteMedicines/{MedicinesId:int?}")]
        public async Task<HttpResponseMessage> DeleteMedicines(int MedicinesId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Medicines", MedicinesId));
        }

        [HttpPost]
        [Route("api/Medicines/GetMedicines/{MedicinesId:int?}")]
        public async Task<HttpResponseMessage> GetMedicines(int MedicinesId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("medicines", MedicinesId, "MedicinesId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Medicines/GetMedicines")]
        public async Task<HttpResponseMessage> GetMedicines()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("medicines", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Treatment

        [HttpPost]
        [Route("api/Treatment/CreateTreatment")]
        public async Task<HttpResponseMessage> CreateTreatment(Treatment treatment)
        {
            await Task.Yield();
            if (treatment == null)
                BadRequestValidation(treatment);
            return PrepareDMLOutput(Dal.InsertRecord(treatment));
        }

        [HttpPut]
        [Route("api/Treatment/EditTreatment")]
        public async Task<HttpResponseMessage> EditTreatment(Treatment treatment)
        {
            await Task.Yield();
            if (treatment == null)
                BadRequestValidation(treatment);
            return PrepareDMLOutput(Dal.UpdateRecord(treatment));
        }

        [HttpDelete]
        [Route("api/Treatment/DeleteTreatment/{TreatmentId:int?}")]
        public async Task<HttpResponseMessage> DeleteTreatment(int TreatmentId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("treatments", TreatmentId));
        }

        [HttpPost]
        [Route("api/Treatment/GetTreatment/{TreatmentId:int?}")]
        public async Task<HttpResponseMessage> GetTreatment(int TreatmentId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("treatments", TreatmentId, "treatmentid");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Treatment/GetTreatment")]
        public async Task<HttpResponseMessage> GetTreatment()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("treatments", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Payment

        [HttpPost]
        [Route("api/Payment/CreatePayment")]
        public async Task<HttpResponseMessage> CreatePayment(Payment Payment)
        {
            await Task.Yield();
            if (Payment == null)
                BadRequestValidation(Payment);
            return PrepareDMLOutput(Dal.InsertRecord(Payment));
        }

        [HttpPut]
        [Route("api/Payment/EditPayment")]
        public async Task<HttpResponseMessage> EditPayment(Payment Payment)
        {
            await Task.Yield();
            if (Payment == null)
                BadRequestValidation(Payment);
            return PrepareDMLOutput(Dal.UpdateRecord(Payment));
        }

        [HttpDelete]
        [Route("api/Payment/DeletePayment/{PaymentId:int?}")]
        public async Task<HttpResponseMessage> DeletePayment(int PaymentId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("payments", PaymentId));
        }

        [HttpPost]
        [Route("api/Payment/GetPayment/{PaymentId:int?}")]
        public async Task<HttpResponseMessage> GetPayment(int PaymentId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("payments", PaymentId, "paymentId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Payment/GetPayment")]
        public async Task<HttpResponseMessage> GetPayment()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("payments", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Admission

        [HttpPost]
        [Route("api/Admission/CreateAdmission")]
        public async Task<HttpResponseMessage> CreateAdmission(Admission admission)
        {
            await Task.Yield();
            if (admission == null)
                BadRequestValidation(admission);
            return PrepareDMLOutput(Dal.InsertRecord(admission));
        }

        [HttpPut]
        [Route("api/Admission/EditAdmission")]
        public async Task<HttpResponseMessage> EditAdmission(Admission admission)
        {
            await Task.Yield();
            if (admission == null)
                BadRequestValidation(admission);
            return PrepareDMLOutput(Dal.UpdateRecord(admission));
        }

        [HttpDelete]
        [Route("api/Admission/DeleteAdmission/{AdmissionId:int?}")]
        public async Task<HttpResponseMessage> DeleteAdmission(int AdmissionId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Admission", AdmissionId));
        }

        [HttpPost]
        [Route("api/Admission/GetAdmission/{AdmissionId:int?}")]
        public async Task<HttpResponseMessage> GetAdmission(int AdmissionId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("admissions", AdmissionId, "Admissionid");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Admission/GetAdmission")]
        public async Task<HttpResponseMessage> GetAdmission()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("admissions", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region Appointment

        [HttpPost]
        [Route("api/Appointment/CreateAppointment")]
        public async Task<HttpResponseMessage> CreateAppointment(Appointment appointment)
        {
            await Task.Yield();
            if (appointment == null)
                BadRequestValidation(appointment);
            return PrepareDMLOutput(Dal.InsertRecord(appointment));
        }

        [HttpPut]
        [Route("api/Appointment/EditAppointment")]
        public async Task<HttpResponseMessage> EditAppointment(Appointment appointment)
        {
            await Task.Yield();
            if (appointment == null)
                BadRequestValidation(appointment);
            return PrepareDMLOutput(Dal.UpdateRecord(appointment));
        }

        [HttpDelete]
        [Route("api/Appointment/DeleteAppointment/{AppointmentId:int?}")]
        public async Task<HttpResponseMessage> DeleteAppointment(int AppointmentId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("appointment", AppointmentId));
        }

        [HttpPost]
        [Route("api/Appointment/GetAppointment/{AppointmentId:int?}")]
        public async Task<HttpResponseMessage> GetAppointment(int AppointmentId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("appointments", AppointmentId, "Appointmentid");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Appointment/GetAppointment")]
        public async Task<HttpResponseMessage> GetAppointment()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("appointments", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion


        #region Appointmentmedicine

        [HttpPost]
        [Route("api/Appointmentmedicine/CreateAppointmentmedicine")]
        public async Task<HttpResponseMessage> CreateAppointmentmedicine(Appointmentmedicine appointmentmedicine)
        {
            await Task.Yield();
            if (appointmentmedicine == null)
                BadRequestValidation(appointmentmedicine);
            return PrepareDMLOutput(Dal.InsertRecord(appointmentmedicine));
        }

        [HttpPut]
        [Route("api/Appointmentmedicine/EditAppointmentmedicine")]
        public async Task<HttpResponseMessage> EditAppointmentmedicine(Appointmentmedicine appointmentmedicine)
        {
            await Task.Yield();
            if (appointmentmedicine == null)
                BadRequestValidation(appointmentmedicine);
            return PrepareDMLOutput(Dal.UpdateRecord(appointmentmedicine));
        }

        [HttpDelete]
        [Route("api/Appointmentmedicine/DeleteAppointmentmedicine/{AppointmentmedicineId:int?}")]
        public async Task<HttpResponseMessage> DeleteAppointmentmedicine(int AppointmentmedicineId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Dlt_Medication", AppointmentmedicineId));
        }

        [HttpPost]
        [Route("api/Appointmentmedicine/GetAppointmentmedicine/{AppointmentmedicineId:int?}")]
        public async Task<HttpResponseMessage> GetAppointmentmedicine(int AppointmentmedicineId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("appointmentmedicines", AppointmentmedicineId, "ApptMedicineId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/Appointmentmedicine/GetAppointmentmedicine")]
        public async Task<HttpResponseMessage> GetAppointmentmedicine()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("appointmentmedicines", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion

        #region TreatmentMedicine

        [HttpPost]
        [Route("api/TreatmentMedicine/CreateTreatmentMedicine")]
        public async Task<HttpResponseMessage> CreateTreatmentMedicine(TreatmentMedicine treatmentMedicine)
        {
            await Task.Yield();
            if (treatmentMedicine == null)
                BadRequestValidation(treatmentMedicine);
            return PrepareDMLOutput(Dal.InsertRecord(treatmentMedicine));
        }

        [HttpPut]
        [Route("api/TreatmentMedicine/EditTreatmentMedicine")]
        public async Task<HttpResponseMessage> EditTreatmentMedicine(TreatmentMedicine treatmentMedicine)
        {
            await Task.Yield();
            if (treatmentMedicine == null)
                BadRequestValidation(treatmentMedicine);
            return PrepareDMLOutput(Dal.UpdateRecord(treatmentMedicine));
        }

        [HttpDelete]
        [Route("api/TreatmentMedicine/DeleteTreatmentMedicine/{TreatmentMedicineId:int?}")]
        public async Task<HttpResponseMessage> DeleteTreatmentMedicine(int TreatmentMedicineId)
        {
            await Task.Yield();
            return PrepareDMLOutput(Dal.DeleteRecord("Dlt_Trt_Medication", TreatmentMedicineId));
        }

        [HttpPost]
        [Route("api/TreatmentMedicine/GetTreatmentMedicine/{TreatmentMedicineId:int?}")]
        public async Task<HttpResponseMessage> GetTreatmentMedicine(int TreatmentMedicineId = 0)
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("treamentmedicines", TreatmentMedicineId, "TreatmentMedicineId");

                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }
        }
        [HttpPost]
        [Route("api/TreatmentMedicine/GetTreatmentMedicine")]
        public async Task<HttpResponseMessage> GetTreatmentMedicine()
        {
            try
            {
                await Task.Yield();
                string Json = "";
                ResponseMessage data = Dal.GetData("treamentmedicines", 0, string.Empty);
                Json = JsonConvert.SerializeObject(data, Formatting.Indented);

                return Request.CreateResponse(HttpStatusCode.OK, Json);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.InnerException.Message);
            }

        }

        #endregion




        //#region Nurses

        //[HttpPost]
        //[Route("api/Nurses/CreateNurse")]
        //public async Task<HttpResponseMessage> CreateNurse(Nurse Nurse)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("nurse.NurseCode");

        //    if (Nurse == null )
        //        BadRequestValidation(Nurse);
        //    return PrepareDMLOutput(Dal.InsertRecord(Nurse));
        //}

        //[HttpPut]
        //[Route("api/Nurses/UpdateNurse")]
        //public async Task<HttpResponseMessage> UpdateNurse(Nurse Nurse)
        //{
        //    await Task.Yield();
        //    if (Nurse == null )
        //        BadRequestValidation(Nurse);

        //    return PrepareDMLOutput(Dal.UpdateRecord(Nurse));
        //}

        //[HttpDelete]
        //[Route("api/Nurses/DeleteNurse/{NurseId:int?}")]
        //public async Task<HttpResponseMessage> DeleteNurse(int NurseId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Nurse", NurseId));
        //}


        //[HttpGet]
        //[Route("api/Nurses/GetNurses/{NurseId:int?}")]
        //public async Task<HttpResponseMessage> GetNurses(int NurseId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("nurses", NurseId, string.Empty);
        //    return PrepareGetOutput(NurseId, data);
        //}
        //#endregion

        //#region Hospitals

        //[HttpPost]
        //[Route("api/Hospitals/CreateHospital")]
        //public async Task<HttpResponseMessage> CreateHospital(Hospital Hospital)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("hospital.HospitalCode");

        //    if (Hospital == null )
        //        BadRequestValidation(Hospital);
        //    return PrepareDMLOutput(Dal.InsertRecord(Hospital));
        //}

        //[HttpPut]
        //[Route("api/Hospitals/UpdateHospital")]
        //public async Task<HttpResponseMessage> UpdateHospital(Hospital Hospital)
        //{
        //    await Task.Yield();
        //    if (Hospital == null )
        //        BadRequestValidation(Hospital);

        //    return PrepareDMLOutput(Dal.UpdateRecord(Hospital));
        //}

        //[HttpDelete]
        //[Route("api/Hospitals/DeleteHospital/{HospitalId:int?}")]
        //public async Task<HttpResponseMessage> DeleteHospital(int HospitalId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Hospital", HospitalId));
        //}

        //[HttpGet]
        //[Route("api/Hospitals/GetHospitals/{HospitalId:int?}")]
        //public async Task<HttpResponseMessage> GetHospitals(int HospitalId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("hospitals", HospitalId, string.Empty);
        //    return PrepareGetOutput(HospitalId, data);
        //}
        //#endregion



        //#region Medicines

        //[HttpPost]
        //[Route("api/Medicines/CreateMedicine")]
        //public async Task<HttpResponseMessage> CreateMedicine(Medicine Medicine)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("medicine.MedicineCode");

        //    if (Medicine == null )
        //        BadRequestValidation(Medicine);
        //    return PrepareDMLOutput(Dal.InsertRecord(Medicine));
        //}

        //[HttpPut]
        //[Route("api/Medicines/UpdateMedicine")]
        //public async Task<HttpResponseMessage> UpdateMedicine(Medicine Medicine)
        //{
        //    await Task.Yield();
        //    if (Medicine == null )
        //        BadRequestValidation(Medicine);

        //    return PrepareDMLOutput(Dal.UpdateRecord(Medicine));
        //}

        //[HttpDelete]
        //[Route("api/Medicines/DeleteMedicine/{MedicineId:int?}")]
        //public async Task<HttpResponseMessage> DeleteMedicine(int MedicineId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Medicine", MedicineId));
        //}

        //[HttpGet]
        //[Route("api/Medicines/GetMedicines/{MedicineId:int?}")]
        //public async Task<HttpResponseMessage> GetMedicines(int MedicineId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("doctors", MedicineId, string.Empty);
        //    return PrepareGetOutput(MedicineId, data);
        //}
        //#endregion

        //#region Services

        //[HttpPost]
        //[Route("api/Services/CreateService")]
        //public async Task<HttpResponseMessage> CreateService(Service Service)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("service.ServiceCode");

        //    if (Service == null )
        //        BadRequestValidation(Service);
        //    return PrepareDMLOutput(Dal.InsertRecord(Service));
        //}

        //[HttpPut]
        //[Route("api/Services/UpdateService")]
        //public async Task<HttpResponseMessage> UpdateService(Service Service)
        //{
        //    await Task.Yield();
        //    if (Service == null )
        //        BadRequestValidation(Service);

        //    return PrepareDMLOutput(Dal.UpdateRecord(Service));
        //}

        //[HttpDelete]
        //[Route("api/Services/DeleteService/{ServiceId:int?}")]
        //public async Task<HttpResponseMessage> UpdateService(int ServiceId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Service", ServiceId));
        //}

        //[HttpGet]
        //[Route("api/Services/GetServices/{ServiceId:int?}")]
        //public async Task<HttpResponseMessage> GetServices(int ServiceId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("servicerooms", ServiceId, string.Empty);
        //    return PrepareGetOutput(ServiceId, data);
        //}

        //#endregion

        //#region OperativeRooms

        //[HttpPost]
        //[Route("api/OpsRooms/CreateOpsRoom")]
        //public async Task<HttpResponseMessage> CreateOpsRoom(OpsRoom OpsRoom)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("opsroom.OperativeRoomCode");

        //    if (OpsRoom == null )
        //        BadRequestValidation(OpsRoom);
        //    return PrepareDMLOutput(Dal.InsertRecord(OpsRoom));
        //}

        //[HttpPut]
        //[Route("api/OpsRooms/UpdateOpsRoom")]
        //public async Task<HttpResponseMessage> UpdateOpsRoom(OpsRoom OpsRoom)
        //{
        //    await Task.Yield();
        //    if (OpsRoom == null )
        //        BadRequestValidation(OpsRoom);
        //    return PrepareDMLOutput(Dal.UpdateRecord(OpsRoom));
        //}

        //[HttpDelete]
        //[Route("api/OpsRooms/DeleteOpsRoom/{OpsRoomId:int?}")]
        //public async Task<HttpResponseMessage> DeleteOpsRoom(int OpsRoomId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("OpsRoom", OpsRoomId));
        //}

        //[HttpGet]
        //[Route("api/OpsRooms/GetOpsRooms/{OpsRoomId:int?}")]
        //public async Task<HttpResponseMessage> GetOpsRooms(int OpsRoomId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("operativerooms", OpsRoomId, string.Empty);
        //    return PrepareGetOutput(OpsRoomId, data);
        //}

        //#endregion

        //#region MedicationDetails

        //[HttpPost]
        //[Route("api/MedicationDetails/CreateMedication")]
        //public async Task<HttpResponseMessage> CreateMedication(Medication Medication)
        //{
        //    await Task.Yield();

        //    if (Medication == null )
        //        BadRequestValidation(Medication);
        //    return PrepareDMLOutput(Dal.InsertRecord(Medication));
        //}

        //[HttpDelete]
        //[Route("api/MedicationDetails/DeleteMedication/{Type}/{AppointmentId:int?}")]
        //public async Task<HttpResponseMessage> DeleteMedication(string Type, int AppointmentId)
        //{
        //    await Task.Yield();
        //    if (Type == "Appointment")
        //        return PrepareDMLOutput(Dal.DeleteRecord("App_Medication", AppointmentId));
        //    else
        //        return PrepareDMLOutput(Dal.DeleteRecord("Trt_Medication", AppointmentId));
        //}

        //[HttpGet]
        //[Route("api/MedicationDetails/GetMedicationDetails/{Type}/{AppointmentId:int?}")]
        //public async Task<HttpResponseMessage> GetMedicationDetails(string Type, int AppointmentId)
        //{
        //    await Task.Yield();
        //    if (Type == "Appointment")
        //        return PrepareGetOutput(0, Dal.GetData("appointmentmedicines", AppointmentId, string.Empty));
        //    else
        //        return PrepareGetOutput(0, Dal.GetData("treamentmedicines", AppointmentId, string.Empty));
        //}

        //#endregion

        //#region TreatmentNurses

        //[HttpPost]
        //[Route("api/TreatmentNurses/CreateTreatmentNurse")]
        //public async Task<HttpResponseMessage> CreateTreatmentNurse(TreatmentNurse TreatmentNurse)
        //{
        //    await Task.Yield();

        //    if (TreatmentNurse == null )
        //        BadRequestValidation(TreatmentNurse);
        //    return PrepareDMLOutput(Dal.InsertRecord(TreatmentNurse));
        //}

        //[HttpPut]
        //[Route("api/TreatmentNurses/UpdateTreatmentNurse")]
        //public async Task<HttpResponseMessage> UpdateTreatmentNurse(TreatmentNurse TreatmentNurse)
        //{
        //    await Task.Yield();
        //    if (TreatmentNurse == null )
        //        BadRequestValidation(TreatmentNurse);
        //    return PrepareDMLOutput(Dal.UpdateRecord(TreatmentNurse));
        //}

        //[HttpDelete]
        //[Route("api/TreatmentNurses/DeleteTreatmentNurse/{TreatmentNurseId:int?}")]
        //public async Task<HttpResponseMessage> DeleteTreatmentNurse(int TreatmentNurseId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("TreatmentNurse", TreatmentNurseId));
        //}

        //[HttpGet]
        //[Route("api/TreatmentNurses/GetTreatmentNurses/{TreatmentId:int?}")]
        //public async Task<HttpResponseMessage> GetTreatmentNurses(int TreatmentId)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("treamentnurses", TreatmentId, string.Empty);
        //    return PrepareGetOutput(TreatmentId, data);
        //}

        //#endregion

        //#region DoctorSpecs

        //[HttpPost]
        //[Route("api/DoctorSpecs/CreateDoctorSpec")]
        //public async Task<HttpResponseMessage> CreateDoctorSpec(DoctorSpecs DoctorSpec)
        //{
        //    await Task.Yield();
        //    if (DoctorSpec == null )
        //        BadRequestValidation(DoctorSpec);
        //    return PrepareDMLOutput(Dal.InsertRecord(DoctorSpec));
        //}

        //[HttpDelete]
        //[Route("api/DoctorSpecs/DeleteDoctorSpec/{DoctorId:int?}")]
        //public async Task<HttpResponseMessage> DeleteDoctorSpec(int DoctorId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("DoctorSpecs", DoctorId));
        //}

        //[HttpGet]
        //[Route("api/DoctorSpecs/GetDoctorSpec/{DoctorId:int?}")]
        //public async Task<HttpResponseMessage> GetDoctorSpec(int DoctorId)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("doctorspecializations", DoctorId, string.Empty);
        //    return PrepareGetOutput(0, data);
        //}

        //#endregion

        //#region Treatments

        //[HttpPost]
        //[Route("api/Treatments/CreateTreatment")]
        //public async Task<HttpResponseMessage> CreateTreatment(Treatment Treatment)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("treatment.TreatmentCode");

        //    if (Treatment == null )
        //        BadRequestValidation(Treatment);
        //    return PrepareDMLOutput(Dal.InsertRecord(Treatment));
        //}

        //[HttpPut]
        //[Route("api/Treatments/UpdateTreatment")]
        //public async Task<HttpResponseMessage> UpdateTreatment(Treatment Treatment)
        //{
        //    await Task.Yield();
        //    if (Treatment == null )
        //        BadRequestValidation(Treatment);
        //    return PrepareDMLOutput(Dal.UpdateRecord(Treatment));
        //}

        //[HttpDelete]
        //[Route("api/Treatments/DeleteTreatment/{TreatmentId:int?}")]
        //public async Task<HttpResponseMessage> DeleteTreatment(int TreatmentId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Treatment", TreatmentId));
        //}

        //[HttpGet]
        //[Route("api/Treatments/GetTreatments/{TreatmentId:int?}")]
        //public async Task<HttpResponseMessage> GetTreatments(int TreatmentId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("treatments", TreatmentId, string.Empty);
        //    return PrepareGetOutput(TreatmentId, data);
        //}

        //#endregion

        //#region Admissions

        //[HttpPost]
        //[Route("api/Admissions/CreateAdmission")]
        //public async Task<HttpResponseMessage> CreateAdmission(Admission Admission)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("admission.AdmissionCode");

        //    if (Admission == null )
        //        BadRequestValidation(Admission);
        //    return PrepareDMLOutput(Dal.InsertRecord(Admission));
        //}

        //[HttpPut]
        //[Route("api/Admissions/UpdateAdmission")]
        //public async Task<HttpResponseMessage> UpdateAdmission(Admission Admission)
        //{
        //    await Task.Yield();
        //    if (Admission == null )
        //        BadRequestValidation(Admission);
        //    return PrepareDMLOutput(Dal.UpdateRecord(Admission));
        //}

        //[HttpDelete]
        //[Route("api/Admissions/DeleteAdmission/{AdmissionsId:int?}")]
        //public async Task<HttpResponseMessage> DeleteAdmission(int AdmissionsId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("Admission", AdmissionsId));
        //}

        //[HttpGet]
        //[Route("api/Admissions/GetAdmissions/{AdmissionsId:int?}")]
        //public async Task<HttpResponseMessage> GetAdmissions(int AdmissionsId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("admissions", AdmissionsId, string.Empty);
        //    return PrepareGetOutput(AdmissionsId, data);
        //}

        //#endregion

        //#region Payments

        //[HttpPost]
        //[Route("api/Payments/CreatePayment")]
        //public async Task<HttpResponseMessage> CreatePayment(Payment Payment)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("payment.PaymentCode");

        //    if (Payment == null )
        //        BadRequestValidation(Payment);
        //    return PrepareDMLOutput(Dal.InsertRecord(Payment));
        //}

        //[HttpPut]
        //[Route("api/Payments/UpdatePayment")]
        //public async Task<IHttpActionResult> UpdatePayment(Payment Payment)
        //{
        //    await Task.Yield();
        //    if (Payment == null )
        //        BadRequestValidation(Payment);
        //    return PrepareDMLOutput(Dal.UpdateRecord(Payment));
        //}

        //[HttpDelete]
        //[Route("api/Payments/DeletePayment/{PaymentId:int?}")]
        //public async Task<IHttpActionResult> DeletePayment(int PaymentId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("OpsRoom", PaymentId));
        //}

        //[HttpGet]
        //[Route("api/Payments/GetPayment/{PaymentId:int?}")]
        //public async Task<IHttpActionResult> GetPayments(int PaymentId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("payments", PaymentId, string.Empty);
        //    return PrepareGetOutput(PaymentId, data);
        //}

        //#endregion

        //#region Appointments

        //[HttpPost]
        //[Route("api/Appointments/CreateAppointments")]
        //public async Task<IHttpActionResult> CreateAppointment(Appointments Appointment)
        //{
        //    await Task.Yield();
        //    ModelState.Remove("appointment.AppointmentCode");

        //    if (Appointment == null )
        //        BadRequestValidation(Appointment);
        //    return PrepareDMLOutput(Dal.InsertRecord(Appointment));
        //}

        //[HttpPut]
        //[Route("api/Appointments/UpdateAppointment")]
        //public async Task<IHttpActionResult> UpdateAppointment(Appointments Appointment)
        //{
        //    await Task.Yield();
        //    if (Appointment == null )
        //        BadRequestValidation(Appointment);
        //    return PrepareDMLOutput(Dal.UpdateRecord(Appointment));
        //}

        //[HttpDelete]
        //[Route("api/Appointments/DeleteAppointment/{AppointmentId:int?}")]
        //public async Task<IHttpActionResult> DeleteAppointment(int AppointmentId)
        //{
        //    await Task.Yield();
        //    return PrepareDMLOutput(Dal.DeleteRecord("OpsRoom", AppointmentId));
        //}

        //[HttpGet]
        //[Route("api/Appointments/GetAppointments/{AppointmentId:int?}")]
        //public async Task<IHttpActionResult> GetAppointments(int AppointmentId = 0)
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("appointments", AppointmentId, string.Empty);
        //    return PrepareGetOutput(AppointmentId, data);
        //}

        //#endregion

        //#region GetMasterData

        //[HttpGet]
        //[Route("api/GetSpecilizations")]
        //public async Task<IHttpActionResult> GetSpecilizations()
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("specializations", 0, string.Empty);
        //    return PrepareGetOutput(0, data);
        //}

        //[HttpGet]
        //[Route("api/GetPaymentModes")]
        //public async Task<IHttpActionResult> GetPaymentModes()
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("paymentmodes", 0, string.Empty);
        //    return PrepareGetOutput(0, data);
        //}

        //[HttpGet]
        //[Route("api/GetRoomTypes")]
        //public async Task<IHttpActionResult> GetRoomTypes()
        //{
        //    await Task.Yield();
        //    string data = Dal.GetData("roomtypes", 0, string.Empty);
        //    return PrepareGetOutput(0, data);
        //}
        //#endregion
    }
}