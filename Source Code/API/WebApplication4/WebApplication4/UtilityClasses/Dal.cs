using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.OleDb;
using MySql.Data.MySqlClient;
using System.Configuration;
using Newtonsoft.Json;

namespace WebApplication4.UtilityClasses
{
    public static class Dal
    {
        static string connstring = ConfigurationManager.AppSettings["connstring"].ToString();
       
        public static ResponseMessage InsertRecord<T>(T Request) where T:class
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                string spname = "InsertData", type = "", requestdata=""; ;int returncode= 0;
                if (typeof(T) == typeof(Doctor)) 
                {
                    type = "doctor";
                    Doctor T1 = (Doctor)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(HospitalBranch))
                {
                    type = "hospital";
                    HospitalBranch T1 = (HospitalBranch)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Nurse))
                {
                    type = "nurse";
                    Nurse T1 = (Nurse)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Patient))
                {
                    type = "patient";
                    Patient T1 = (Patient)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Medicine))
                {
                    type = "medicine";
                    Medicine T1 = (Medicine)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Service))
                {
                    type = "service";
                    Service T1 = (Service)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(OperativeRoom))
                {
                    type = "operativerooms";
                    OperativeRoom T1 = (OperativeRoom)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Medication))
                {
                    type = "medication";
                    Medication T1 = (Medication)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(TreatmentNurse))
                {
                    type = "treatmentNurse";
                    TreatmentNurse T1 = (TreatmentNurse)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(DoctorSpecs))
                {
                    type = "doctorspecializations";
                    DoctorSpecs T1 = (DoctorSpecs)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Treatment))
                {
                    type = "treatment";
                    Treatment T1 = (Treatment)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Admission))
                {
                    type = "admission";
                    Admission T1 = (Admission)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Payment))
                {
                    type = "payment";
                    Payment T1 = (Payment)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else if (typeof(T) == typeof(Appointment))
                {
                    type = "appointment";
                    Appointment T1 = (Appointment)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(Specializations))
                {
                    type = "Specializations";
                    Specializations T1 = (Specializations)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(PaymentMode))
                {
                    type = "paymentmodes";
                    PaymentMode T1 = (PaymentMode)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(RoomType))
                {
                    type = "roomtype";
                    RoomType T1 = (RoomType)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(Appointmentmedicine))
                {
                    type = "appointmentmedicine";
                    Appointmentmedicine T1 = (Appointmentmedicine)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(TreatmentMedicine))
                {
                    type = "treamentmedicines";
                    TreatmentMedicine T1 = (TreatmentMedicine)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }else if (typeof(T) == typeof(Users))
                {
                    type = "Users";
                    Users T1 = (Users)(object)Request;
                    requestdata = JsonConvert.SerializeObject(T1);
                }
                else
                {
                    objres.status = false;
                    objres.ErrorMessage = "````````````````````````````````````````````````````````````````````````````````No data passed, please check";
                    return objres;
                }

                using (MySqlConnection connection = new MySqlConnection(connstring))
                {
                    using (MySqlCommand cmd = new MySqlCommand(spname, connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("RequestData", requestdata);
                        cmd.Parameters.AddWithValue("InsType", type);
                        connection.Open();
                        returncode = cmd.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                objres.status= returncode > 0 ? true : false;
                return objres;
            }
            catch (Exception ex)
            {
                objres.status = false;
                objres.ErrorMessage = ex.Message;
                return objres;
            }
        }

        public static ResponseMessage UpdateRecord<T>(T Request) where T : class
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                string command = ""; int returncode = 0;
                if (typeof(T) == typeof(Specializations))
                {
                    Specializations T1 = (Specializations)(object)Request;
                    command = string.Format("UPDATE Specializations Set Name = '{1}', KeyAres = '{2}', Status = '{3}' WHERE SpecializationId = '{0}'",T1.SpecializationId, T1.Name, T1.KeyArea, T1.Status);
                }
                else if(typeof(T) == typeof(Doctor))
                {
                    Doctor T1 = (Doctor)(object)Request;
                    command = string.Format("UPDATE doctors Set Name = '{0}', Address1 = '{1}', Address2 = '{2}', City = '{3}', Phone = '{4}', mOBILE = '{5}',  Email = '{6}', Salary = {7}, Designation = '{8}', Gender = '{9}' WHERE Doctorid = {10}", T1.Name, T1.Address1, T1.Address2, T1.City, T1.Phone, T1.Mobile, T1.Email, T1.Salary, T1.Designation, T1.Gender,T1.DoctorId);
                }
                else if (typeof(T) == typeof(HospitalBranch))
                {
                    HospitalBranch T1 = (HospitalBranch)(object)Request;
                    command = string.Format("UPDATE Hospitals Set Name = '{0}', Address1 = '{1}', Address2 = '{2}', City = '{3}', Phone1 = '{4}', Phone2 = '{5}', Email = '{6}', Description = '{7}' WHERE HospitalId = '{8}'", T1.Name, T1.Address1, T1.Address2, T1.City, T1.Phone1, T1.Phone2, T1.Email, T1.Description, T1.HospitalId);
                }
                else if (typeof(T) == typeof(Nurse))
                {
                    Nurse T1 = (Nurse)(object)Request;
                    command = string.Format("UPDATE Nurses Set Name = '{0}', Address1 = '{1}', Address2 = '{2}', City = '{3}', Phone1 = '{4}', Phone2 = '{5}', Email = '{6}', Salary = {7}, Gender ='{8}' WHERE NurseId = '{9}'", T1.Name, T1.Address1, T1.Address2, T1.City, T1.Phone1, T1.Phone2, T1.Email, T1.Salary, T1.Gender,T1.NurseId);
                }
                else if (typeof(T) == typeof(Patient))
                {
                    Patient T1 = (Patient)(object)Request;
                    command = string.Format("UPDATE Patients Set Name = '{0}', Address1 = '{1}', Address2 = '{2}', City = '{3}', Phone = '{4}', GuardianPhone = '{5}', Email = '{6}', Disease = '{7}',Gender ='{8}'  WHERE PatientId = '{9}'", T1.Name, T1.Address1, T1.Address2, T1.City, T1.Phone, T1.GuardianPhone, T1.Email, T1.Disease,T1.Gender, T1.PatientId);
                }
                else if (typeof(T) == typeof(Medicine))
                {
                    Medicine T1 = (Medicine)(object)Request;
                    command = string.Format("UPDATE Medicines Set Name = '{0}', Company = '{1}', Composition = '{2}', Dosage = '{3}', ExpiryDate = '{4}', Type = '{5}', Description = '{6}', Cost = {7}, AvailableQuantity = {8} WHERE MedicineId = '{9}'", T1.Name, T1.Company, T1.Composition, T1.Dosage, T1.ExpiryDate.ToString("yyyy-MM-dd"), T1.Type, T1.Description, T1.Cost, T1.AvailabelQuantity, T1.MedicineId);
                }
                else if (typeof(T) == typeof(Service))
                {
                    Service T1 = (Service)(object)Request; 
                    command = string.Format("UPDATE servicerooms Set RoomTypeId = {0}, RoomNo = '{1}', Results = '{2}', Fee = {3}, ServiceDate = '{4}', HospitalId = {5}, PatientId = {6}, DoctorId = {7} WHERE ServiceroomCode = '{8}'", T1.RoomTypeId, T1.RoomNo, T1.Results, T1.Fee, T1.ServiceDate, T1.HospitalId, T1.PatientId, T1.DoctorId, T1.ServiceRoomCode);
                }
                else if (typeof(T) == typeof(OperativeRoom))
                {
                    OperativeRoom T1 = (OperativeRoom)(object)Request;
                    command = string.Format("UPDATE operativerooms Set RoomTypeId = {0}, RoomNo = '{1}', BedNo = '{2}', StartDate = '{3}', EndDate= '{4}', HospitalId = {5} WHERE OperativeRoomId = '{6}'", T1.RoomTypeId, T1.RoomNo, T1.BedNo, T1.StartDate.ToString("yyyy-MM-dd"), T1.EndDate.ToString("yyyy-MM-dd"), T1.HospitalId,  T1.OperativeRoomId);
                }
                else if (typeof(T) == typeof(TreatmentMedicine))
                {
                    TreatmentMedicine T1 = (TreatmentMedicine)(object)Request;
                    command = string.Format("UPDATE treamentmedicines Set TreatmentId = {0}, MedicineId = '{1}', Limits = '{2}' WHERE TreatmentMedicineId = '{3}'", T1.TreatmentId, T1.MedicineId,T1.Limit, T1.TreatmentMedicineId);

                }
                else if (typeof(T) == typeof(TreatmentNurse))
                {
                    
                }
                else if (typeof(T) == typeof(Appointmentmedicine))
                {
                    Appointmentmedicine T1 = (Appointmentmedicine)(object)Request;
                    command = string.Format("UPDATE appointmentmedicines Set AppointmentId = {0}, MedicineId = '{1}', Limits = '{2}' WHERE ApptMedicineId = '{3}'", T1.AppointmentId, T1.MedicineId, T1.Limit, T1.ApptMedicineId);

                }
                else if (typeof(T) == typeof(Treatment))
                {
                    Treatment T1 = (Treatment)(object)Request;
                    command = string.Format("UPDATE treatments Set Name = '{0}', Duration = {1}, DoctorId = {2}, PatientId = {3}, OperativeRoomId = {4} WHERE TreatmentId = '{5}'", T1.Name, T1.Duration, T1.DoctorId, T1.PatientId, T1.OperativeRoomId, T1.TreatmentId);
                }
                else if (typeof(T) == typeof(Admission))
                {
                    Admission T1 = (Admission)(object)Request;
                    command = string.Format("UPDATE admissions Set TreatmentId = {0}, AdmittedDate = '{1}', IsInsuranceApplicable = {2}, InsurancePhotoId = {3}, PaymentId = {4}, DischargeDate = '{5}' WHERE AdmissionCode = '{6}'", T1.TreatmentId, T1.AdmittedDate, T1.IsInsuranceApplicable, T1.InsurancePhotoId, T1.PaymentId, T1.DishargeDate, T1.AdmissionCode);
                }
                else if (typeof(T) == typeof(Payment))
                {
                    Payment T1 = (Payment)(object)Request;
                    command = string.Format("UPDATE payments Set PaymentmodeId = {0}, PayeeName = '{1}', TotalAmount = {2}, DiscountAmount = {3}, InsuranceAmount = {4}, PayableAmount = {5} WHERE PaymentId = '{6}'", T1.PaymentmodeId, T1.PayeeName, T1.TotalAmount, T1.DiscountAmount, T1.InsuranceAmount, T1.PayableAmount, T1.PaymentId);
                }
                else if (typeof(T) == typeof(Appointment))
                {
                    Appointment T1 = (Appointment)(object)Request;
                    command = string.Format("UPDATE appointments Set DoctorId = {0}, PatientId = {1}, HospitalId = {2}, Appt_Date = '{3}', Next_Appt_Date = '{4}', DiseaseNotes = '{5}', Fee = {6} WHERE AppointmentId = '{7}'", T1.DoctorId, T1.PatientId, T1.HospitalId, T1.Appt_Date.ToString("yyyy-MM-dd"), T1.Next_Appt_Date.ToString("yyyy-MM-dd"), T1.DiseaseNotes, T1.Fee, T1.AppointmentId);
                }
                else if (typeof(T) == typeof(PaymentMode))
                {
                    PaymentMode T1 = (PaymentMode)(object)Request;
                    command = string.Format("UPDATE paymentmodes Set Name = '{0}', ApplicableMethods = '{1}' WHERE PaymentModeId = '{2}'", T1.Name, T1.ApplicableMethods, T1.PaymentModeId);
                }else if (typeof(T) == typeof(RoomType))
                {
                    RoomType T1 = (RoomType)(object)Request;
                    command = string.Format("UPDATE roomtypes Set Name = '{0}', Description = '{1}' WHERE RoomTypeId = '{2}'", T1.Name, T1.Description, T1.RoomTypeId);
                }else if (typeof(T) == typeof(Users))
                {
                    Users T1 = (Users)(object)Request;
                    command = ""; //string.Format("UPDATE roomtypes Set Name = '{0}', Description = '{1}' WHERE RoomTypeId = '{2}'", T1.Name, T1.Description, T1.RoomTypeId);
                }
                else
                {
                    throw new Exception("No data passed, please check");
                }
                using (MySqlConnection connection = new MySqlConnection(connstring))
                {
                    using (MySqlCommand cmd = new MySqlCommand(command, connection))
                    {
                        connection.Open();
                        returncode = cmd.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                
                objres.status = returncode > 0 ? true : false;
                return objres;
            }
            catch (Exception ex)
            {
                objres.status = false;
                objres.ErrorMessage = ex.Message;
                return objres;
            }
        }

        public static ResponseMessage DeleteRecord(string Type, int ID)        
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                string command = ""; int returncode = 0;
                if(Type== "Specializations") command = "Delete from Specializations Where SpecializationId = " + ID.ToString();
                else if(Type== "doctor") command = "Delete from Doctors Where DoctorId = " + ID.ToString();
                else if (Type == "Doctor") command = "Delete from Doctors Where DoctorId = " + ID.ToString();
                else if(Type== "hospitals") command = "Delete from Hospitals Where HospitalId = " + ID.ToString();
                else if(Type== "nurse") command = "Delete from Nurses Where NurseId = " + ID.ToString();
                else if(Type== "patient") command = "Delete from Patients Where PatientId = " + ID.ToString();
                else if (Type == "patients") command = "Delete from Patients Where PatientId = " + ID.ToString();
                else if(Type== "Medicines") command = "Delete from Medicines Where MedicineId = " + ID.ToString();
                else if(Type== "Service") command = "Delete from servicerooms Where ServiceRoomId = " + ID.ToString();
                else if(Type== "operativerooms") command = "Delete from operativerooms Where OperativeRoomId = " + ID.ToString();
                else if(Type== "App_Medication") command = "Delete from appointmentmedicines Where AppointmentId = " + ID.ToString();
                else if (Type == "Dlt_Medication") command = "Delete from appointmentmedicines Where ApptMedicineId = " + ID.ToString();
                else if (Type == "Dlt_Trt_Medication") command = "Delete from treamentmedicines Where TreatmentMedicineId = " + ID.ToString();
                else if(Type== "Trt_Medication") command = "Delete from treamentmedicines Where TreatmentId = " + ID.ToString();
                else if(Type== "TreatmentNurse") command = "Delete from treamentnurses Where TreatmentNurseId = " + ID.ToString();
                else if(Type== "DoctorSpecs") command = "Delete from doctorspecializations Where DoctorId = " + ID.ToString();
                else if(Type== "treatments") command = "Delete from Treatments Where TreatmentId = " + ID.ToString();
                else if(Type== "Admission") command = "Delete from Admissions Where AdmissionId = " + ID.ToString();
                else if(Type== "payment") command = "Delete from Payments Where PaymentId = " + ID.ToString();
                else if(Type== "appointment") command = "Delete from Appointments Where AppointmentId = " + ID.ToString();
                else if(Type== "paymentmodes") command = "Delete from paymentmodes Where PaymentModeId = " + ID.ToString();
                else if(Type== "roomtypes") command = "Delete from roomtypes Where RoomTypeId = " + ID.ToString();
                else if(Type== "payments") command = "Delete from Payments Where PaymentId = " + ID.ToString();
                else
                {
                    objres.status = false;
                    objres.ErrorMessage = "No data passed, please check";
                    return objres;
                }


                using (MySqlConnection connection = new MySqlConnection(connstring))
                {
                    using (MySqlCommand cmd = new MySqlCommand(command, connection))
                    {
                        connection.Open();
                        returncode = cmd.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                objres.status = returncode > 0 ? true : false;
                return objres;
            }
            catch (Exception ex)
            {
                objres.status = false;
                objres.ErrorMessage = ex.Message;
                return objres;
            }
        }

        public static ResponseMessage GetData(string Type, int ID, string OtherId) 
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                string command = ""; DataSet ds = new DataSet();string keycol = string.Empty; 
                Dictionary<string, string> keyValuePair = new Dictionary<string, string>();
                keyValuePair.Add("admissions", "AdmissionId");
                keyValuePair.Add("appointmentmedicines", "ApptMedicineId");
                keyValuePair.Add("appointments", "appointmentid");
                keyValuePair.Add("doctors", "doctorid");
                keyValuePair.Add("doctorspecializations", "doctorid");
                keyValuePair.Add("hospitals", "hospitalid");
                keyValuePair.Add("medicines", "medicineid");
                keyValuePair.Add("nurses", "nurseid");
                keyValuePair.Add("operativerooms", "OperativeRoomId");
                keyValuePair.Add("patients", "patientid");
                keyValuePair.Add("payments", "paymentid");
                keyValuePair.Add("servicerooms", "serviceroomid");
                keyValuePair.Add("treamentmedicines", "TreatmentMedicineId");
                keyValuePair.Add("treamentnurses", "treamentnurseid");
                keyValuePair.Add("treatments", "treatmentid");
                keyValuePair.Add("Users", "UserName");
                keyValuePair.Add("Specializations", "SpecializationID");
                keyValuePair.Add("paymentmodes", "PaymentModeId");
                keyValuePair.Add("roomtypes", "RoomTypeId");

                if (!keyValuePair.TryGetValue(Type, out keycol)) throw new Exception("No Data found");

                command = "Select * from " + Type ;
                if (OtherId != string.Empty ) command += " Where " + OtherId + " = " + ID.ToString();
                else if (ID > 0) command += " Where " + keycol + " = " + ID.ToString();

                using (MySqlConnection connection = new MySqlConnection(connstring))
                {
                    using (   MySqlDataAdapter da = new MySqlDataAdapter())
                    {
                        using (MySqlCommand cmd = new MySqlCommand(command, connection))
                        {
                            da.SelectCommand = cmd;
                            da.Fill(ds);
                        }
                    }
                }

                objres.status = true;
                objres.Dataresult = ds;
                return objres;

            }
            catch (Exception ex)
            {
                objres.status = false;
                objres.ErrorMessage = ex.Message;
                return objres;
            }
        }

        public static ResponseMessage GetDataforcommand(string command)
        {
            ResponseMessage objres = new ResponseMessage();
            try
            {
                DataSet ds = new DataSet();
                using (MySqlConnection connection = new MySqlConnection(connstring))
                {
                    using (MySqlDataAdapter da = new MySqlDataAdapter())
                    {
                        using (MySqlCommand cmd = new MySqlCommand(command, connection))
                        {
                            da.SelectCommand = cmd;
                            da.Fill(ds);
                        }
                    }
                }
                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count>0)
                {
                    objres.status = true;
                    objres.Dataresult = ds;
                }
                else
                {
                    objres.status = false;
                    objres.Dataresult = null;
                }

              
                return objres;

            }
            catch (Exception ex)
            {
                objres.status = false;
                objres.ErrorMessage = ex.Message;
                return objres;
            }
        }
    }
}