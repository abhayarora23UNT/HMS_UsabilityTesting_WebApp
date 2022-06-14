using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;

namespace WebApplication4.UtilityClasses
{
    public class Respone
    {
        public int ID { get; set; }
        public string Message { get; set; }
    }

    public class Specializations
    {
        public int SpecializationId { get; set; }
        [Required]
        public string Name { get; set; }
        public string KeyArea { get; set; }
        public string Status { get; set; }
    }

    public class Doctor
    {
        public int DoctorId { get; set; }       
        [Required]
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        [Required]
        public string Email { get; set; }
        public double Salary { get; set; }
        public string Designation { get; set; }
        public string Gender { get; set; }
        public int SpecializationId { get; set; }
    }

    public class Nurse
    {
        public int NurseId { get; set; }
        [Required]
        public string NurseCode { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Email { get; set; }
        [Required]
        public double Salary { get; set; }
        public string Gender { get; set; }
    }

    public class HospitalBranch
    {
        public int HospitalId { get; set; }
        [Required]
        public string HospitalCode { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        [Required]
        public string Email { get; set; }
        public string Description { get; set; }
    }

    public class Patient
    {
        public int PatientId { get; set; }
        [Required]
        public string PatientCode { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string GuardianPhone { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        [Required]
        public string Disease { get; set; }
        public string Gender { get; set; }
    }

    public class Medicine
    {
        public int MedicineId { get; set; }
        [Required]
        public string MedicineCode { get; set; }
        [Required]
        public string Name { get; set; }
        public string Company { get; set; }
        public string Composition { get; set; }
        public string Dosage { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public Decimal Cost { get; set; }
        public int AvailabelQuantity { get; set; }
    }

    public class Service
    {
        public int ServiceRoomId { get; set; }
        [Required]
        public string ServiceRoomCode { get; set; }
        [Required]
        public int RoomTypeId { get; set; }
        [Required]
        public string RoomNo { get; set; }
        public string Results { get; set; }
        public double Fee { get; set; }
        [Required]
        public DateTime ServiceDate { get; set; }
        [Required]
        public int HospitalId { get; set; }
        [Required]
        public int PatientId { get; set; }
        [Required]
        public int DoctorId { get; set; }
    }

    public class OperativeRoom
    {
        public int OperativeRoomId { get; set; }
        [Required]
        public string OperativeRoomCode { get; set; }
        [Required]
        public int RoomTypeId { get; set; }
        [Required]
        public string RoomNo { get; set; }
        [Required]
        public string BedNo { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [Required]
        public int HospitalId { get; set; }
    }

    public class Medication
    {
        public int MedicationId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public int App_Treatment_Id { get; set; }
        [Required]
        public List<int> MedicineId { get; set; }
    }

    public class TreatmentNurse
    {
        public int TreatmentNurseId { get; set; }
        [Required]
        public int TreatmentId { get; set; }
        [Required]
        public int NurseId { get; set; }
        [Required]
        public DateTime Tr_InTime { get; set; }
        [Required]
        public DateTime Tr_OutTime { get; set; }
        public string Notes { get; set; }
    }

    public class Treatment
    {
        public int TreatmentId { get; set; }
        [Required]
        public string TreatmentCode { get; set; }
        [Required]
        public string Name { get; set; }
        public int Duration { get; set; }
        [Required]
        public int DoctorId { get; set; }
        [Required]
        public int PatientId { get; set; }
        [Required]
        public int OperativeRoomId { get; set; }
    }

    public class Admission
    {
        public int AdmissionId { get; set; }
        [Required]
        public string AdmissionCode { get; set; }
        [Required]
        public int TreatmentId { get; set; }
        [Required]
        public DateTime AdmittedDate { get; set; }
        public DateTime DishargeDate { get; set; }
        public int IsInsuranceApplicable { get; set; }
        public string InsurancePhotoId { get; set; }
        public int PaymentId { get; set; }
    }
    public class RoomType
    {
        public int RoomTypeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
    public class PaymentMode
    {
        public int PaymentModeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ApplicableMethods { get; set; }
    }

    public class Payment
    {
        public int PaymentId { get; set; }
        [Required]
        public string PaymentCode { get; set; }
        [Required]
        public int PaymentmodeId { get; set; }
        [Required]
        public string PayeeName { get; set; }
        [Required]
        public decimal TotalAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        [Required]
        public decimal PayableAmount { get; set; }
        public decimal InsuranceAmount { get; set; }
    }

    public class DoctorSpecs
    {
        [Required]
        public int DoctorId { get; set; }
        [Required]
        public List<int> SpecializationId { get; set; }
    }

    public class Appointment
    {
        public int AppointmentId { get; set; }
        [Required]
        public string AppointmentCode { get; set; }
        [Required]
        public int DoctorId { get; set; }
        [Required]
        public int PatientId { get; set; }
        [Required]
        public int HospitalId { get; set; }
        [Required]
        public DateTime Appt_Date { get; set; }
        public DateTime Next_Appt_Date { get; set; }
        public string DiseaseNotes { get; set; }
        public decimal Fee { get; set; }
    }

    public class Appointmentmedicine
    {
        public int ApptMedicineId { get; set; }

        [Required]
        public int AppointmentId { get; set; }


        public int MedicineId { get; set; }

        public int Limit { get; set; }
    }
    public class TreatmentMedicine
    {
        public int TreatmentMedicineId { get; set; }

        [Required]
        public int TreatmentId { get; set; }


        public int MedicineId { get; set; }

        public int Limit { get; set; }
    }
    public class Users
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }
        public string UserRole { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PhoneNo { get; set; }

    }

    public class ResponseMessage
    {

        public Boolean status { get; set; }

        public string ErrorMessage { get; set; }

        public DataSet Dataresult { get; set; }

    }

    public static class Logger
    {
        private static ReaderWriterLockSlim _readWriteLock = new ReaderWriterLockSlim();
        public static void WriteToFile(string Message)
        {
            _readWriteLock.EnterWriteLock();
            try
            {
                using (StreamWriter sw = File.AppendText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Log_" + DateTime.Now.ToString("MMddyyyy")+".txt")))
                {
                    sw.WriteLine(Message);
                    sw.Close();
                }
            }
            finally
            {
                _readWriteLock.ExitWriteLock();
            }
        }
    }
}