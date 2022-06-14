DELIMITER $$
USE hospitalmgmt$$

CREATE DEFINER=hmsdba PROCEDURE InsertData(RequestData json, InsType varchar(50))
BEGIN
SET FOREIGN_KEY_CHECKS=0;
	If InsType = 'Specializations' Then

		Insert into Specializations(Name,KeyAres,Status)
		Select 
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.KeyArea') AS KeyAres,
			JSON_VALUE(RequestData, '$.Status') AS Status;
         ElseIf InsType = 'paymentmodes' Then
		Insert into paymentmodes(Name,ApplicableMethods)
		Select 
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.ApplicableMethods') AS ApplicableMethods;
	elseif InsType = 'roomtype' Then
	
		Insert into roomtypes (Name,Description)
		Select 
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Description') AS Description;   
	  elseif InsType = 'doctor' Then
	
		Insert into doctors (Name,Address1,Address2,City,Phone,mobile,Email,Salary,Designation,Gender)
		Select 
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Address1') AS Address1,
			JSON_VALUE(RequestData, '$.Address2') AS Address2,
			JSON_VALUE(RequestData, '$.City') AS City,
			JSON_VALUE(RequestData, '$.Phone') AS Phone1,
			JSON_VALUE(RequestData, '$.Mobile') AS Mobile,
			JSON_VALUE(RequestData, '$.Email') AS Email,
			JSON_VALUE(RequestData, '$.Salary') AS Salary,
			JSON_VALUE(RequestData, '$.Designation') AS Designation,
			JSON_VALUE(RequestData, '$.Gender') AS Gender;   
	Elseif InsType = 'hospital' then 
		Select @MaxId := Max(HospitalId) from hospitals;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select HospitalCode from hospitals where hospitalId =  @MaxId), "HSP", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('HSP', Cast(@MaxId as char(10)));
		
		Insert into hospitals(HospitalCode,Name,Address1,Address2,City,Phone1,Phone2,Email,Description)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Address1') AS Address1,
			JSON_VALUE(RequestData, '$.Address2') AS Address2,
			JSON_VALUE(RequestData, '$.City') AS City,
			JSON_VALUE(RequestData, '$.Phone1') AS Phone1,
			JSON_VALUE(RequestData, '$.Phone2') AS Phone2,
			JSON_VALUE(RequestData, '$.Email') AS Email,
			JSON_VALUE(RequestData, '$.Description') AS Description;
			
	Elseif InsType = 'nurse' then 
		
        If (Select 1 from nurses where Email = JSON_VALUE(RequestData, '$.Email') limit 0,1) then
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Duplicate Entry with existing EmailID';
		end if;
		
		Select @MaxId := Max(NurseId) from nurses;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select NurseCode from nurses where nurseId =  @MaxId), "NRS", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('NRS', Cast(@MaxId as char(10)));
		
		Insert into nurses(NurseCode,Name,Address1,Address2,City,Phone1,Phone2,Email,gender,Salary)
		Select 
			@DocCode AS DoctorCode,
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Address1') AS Address1,
			JSON_VALUE(RequestData, '$.Address2') AS Address2,
			JSON_VALUE(RequestData, '$.City') AS City,
			JSON_VALUE(RequestData, '$.Phone1') AS Phone1,
			JSON_VALUE(RequestData, '$.Phone2') AS Phone2,
			JSON_VALUE(RequestData, '$.Email') AS Email,
			JSON_VALUE(RequestData, '$.Gender') AS Gender,
			JSON_VALUE(RequestData, '$.Salary') AS Salary;
				
	Elseif InsType = 'patient' then 
		
        If (Select 1 from patients where Email = JSON_VALUE(RequestData, '$.Email') limit 0,1) then
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Duplicate Entry with existing EmailID';
		end if;
		
		Select @MaxId := Max(patientId) from patients;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select patientCode from patients where patientId =  @MaxId), "PAT", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('PAT', Cast(@MaxId as char(10)));
		
		Insert into patients(patientCode,Name,Address1,Address2,City,Phone,GuardianPhone,Email,Disease,Gender)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Address1') AS Address1,
			JSON_VALUE(RequestData, '$.Address2') AS Address2,
			JSON_VALUE(RequestData, '$.City') AS City,
			JSON_VALUE(RequestData, '$.Phone') AS Phone1,
			JSON_VALUE(RequestData, '$.GuardianPhone') AS GuardianPhone,
			JSON_VALUE(RequestData, '$.Email') AS Email,
			JSON_VALUE(RequestData, '$.Disease') AS Disease,
			JSON_VALUE(RequestData, '$.Gender') AS Gender;
				
	Elseif InsType = 'medicine' then 
		
        If (Select 1 from medicines where MedicineCode = JSON_VALUE(RequestData, '$.MedicineCode') limit 0,1) then
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Duplicate Entry with existing MedicineCode';
		end if;
		
		Select @MaxId := Max(medicineId) from medicines;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select MedicineCode from medicines where medicineId =  @MaxId), "MED", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('MED', Cast(@MaxId as char(10)));
		
		Insert into medicines(MedicineCode,Name,Company,Composition,Dosage,ExpiryDate,Type,Description,Cost,AvailableQuantity)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Company') AS Company,
			JSON_VALUE(RequestData, '$.Composition') AS Composition,
			JSON_VALUE(RequestData, '$.Dosage') AS Dosage,
			JSON_VALUE(RequestData, '$.ExpiryDate') AS ExpiryDate,
			JSON_VALUE(RequestData, '$.Type') AS Type,
			JSON_VALUE(RequestData, '$.Description') AS Description,
			JSON_VALUE(RequestData, '$.Cost') AS Cost,
			JSON_VALUE(RequestData, '$.AvailabelQuantity') AS AvailableQuantity;
				
	Elseif InsType = 'service' then 
		
		Select @MaxId := Max(ServiceRoomId) from hospitals;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select ServiceroomCode from servicerooms where ServiceRoomId =  @MaxId), "SVC", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('SVC', Cast(@MaxId as char(10)));
		
		Insert into servicerooms(ServiceroomCode, RoomTypeId, RoomNo, Results, Fee, ServiceDate, HospitalId, PatientId, DoctorId)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.RoomTypeId') AS RoomTypeId,
			JSON_VALUE(RequestData, '$.RoomNo') AS RoomNo,
			JSON_VALUE(RequestData, '$.Results') AS Results,
			JSON_VALUE(RequestData, '$.Fee') AS Fee,
			JSON_VALUE(RequestData, '$.ServiceDate') AS ServiceDate,
			JSON_VALUE(RequestData, '$.HospitalId') AS HospitalId,
			JSON_VALUE(RequestData, '$.PatientId') AS PatientId,
			JSON_VALUE(RequestData, '$.DoctorId') AS DoctorId;
				
	Elseif InsType = 'operativerooms' then 
		
		Select @MaxId := Max(OperativeRoomId) from operativerooms;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select OperativeRoomCode from operativerooms where OperativeRoomId =  @MaxId), "OPS", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('OPS', Cast(@MaxId as char(10)));
		
		Insert into operativerooms(OperativeRoomCode, RoomTypeId, RoomNo, BedNo, StartDate, EndDate, HospitalId)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.RoomTypeId') AS RoomTypeId,
			JSON_VALUE(RequestData, '$.RoomNo') AS RoomNo,
			JSON_VALUE(RequestData, '$.BedNo') AS BedNo,
			JSON_VALUE(RequestData, '$.StartDate') AS StartDate,
			JSON_VALUE(RequestData, '$.EndDate') AS EndDate,
			JSON_VALUE(RequestData, '$.HospitalId') AS HospitalId;
				
	Elseif InsType = 'medication' then 
		
        Select 
			@Tabletype := JSON_VALUE(RequestData, '$.Type') AS Type,
			@App_Treatment_Id := JSON_VALUE(RequestData, '$.App_Treatment_Id') AS App_Treatment_Id,
			@MedicineId := JSON_VALUE(RequestData, '$.MedicineId') AS MedicineId,
			@Limit := JSON_VALUE(RequestData, '$.Limit') AS Limit1;
		
		If @Tabletype = 'Appointment'	then	
			Delete from appointmentmedicines where AppointmentId = @App_Treatment_Id;
			Insert into appointmentmedicines(AppointmentId, MedicineId)
			SELECT @App_Treatment_Id,ids FROM JSON_TABLE(@MedicineId,"$[*]" COLUMNS(ids BIGINT(20) PATH "$")) AS tt;
		ELSE
			Delete from treamentmedicines where TreatmentId = @App_Treatment_Id;
			Insert into treamentmedicines(TreatmentId, MedicineId)
			SELECT @App_Treatment_Id,ids FROM JSON_TABLE(@MedicineId,"$[*]" COLUMNS(ids BIGINT(20) PATH "$")) AS tt;
		End If;
				
	Elseif InsType = 'treatmentNurse' then 
		
        Select 
			@TreatmentId := JSON_VALUE(RequestData, '$.TreatmentId') AS TreatmentId,
			@NurseId := JSON_VALUE(RequestData, '$.NurseId') AS NurseId,
			@Tr_InTime := JSON_VALUE(RequestData, '$.Tr_InTime') AS Tr_InTime,
			@Tr_OutTime := JSON_VALUE(RequestData, '$.Tr_OutTime') AS Tr_OutTime,
			@Notes := JSON_VALUE(RequestData, '$.Notes') AS Notes;
        
		Insert into treamentnurses(TreatmentId, NurseId, Tr_InTime, Tr_OutTime, Notes)
		Select @TreatmentId, @NurseId,@Tr_InTime, @Tr_OutTime, @Notes ;
	
    Elseif InsType = 'doctorspecializations' then 
		
        Select 
			@DoctorId := JSON_VALUE(RequestData, '$.DoctorId') AS DoctorId,
			@SpecializationId := JSON_VALUE(RequestData, '$.SpecializationId') AS SpecializationId;
            
		Delete from doctorspecializations where DoctorId = @DoctorId;
		Insert into doctorspecializations(DoctorId, SpecializationId)
		SELECT @DoctorId,ids FROM JSON_TABLE(@SpecializationId,"$[*]" COLUMNS(ids BIGINT(20) PATH "$")) AS tt;
        
	Elseif InsType = 'treatment' then 
		
		Select @MaxId := Max(TreatmentId) from treatments;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select TreatmentCode from treatments where TreatmentId =  @MaxId), "TRT", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('TRT', Cast(@MaxId as char(10)));
		
		Insert into treatments(TreatmentCode, Name, Duration, DoctorId, PatientId, OperativeRoomId)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.Name') AS Name,
			JSON_VALUE(RequestData, '$.Duration') AS Duration,
			JSON_VALUE(RequestData, '$.DoctorId') AS DoctorId,
			JSON_VALUE(RequestData, '$.PatientId') AS PatientId,
			JSON_VALUE(RequestData, '$.OperativeRoomId') AS OperativeRoomId;
				
	Elseif InsType = 'admission' then 
		
		Select @MaxId := Max(admissionId) from admissions;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select AdmissionCode from admissions where admissionId =  @MaxId), "ADM", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('ADM', Cast(@MaxId as char(10)));
		
		Insert into admissions(AdmissionCode, TreatmentId, AdmittedDate, IsInsuranceApplicable, InsurancePhotoId, PaymentId, DischargeDate)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.TreatmentId') AS TreatmentId,
			JSON_VALUE(RequestData, '$.AdmittedDate') AS AdmittedDate,
			JSON_VALUE(RequestData, '$.IsInsuranceApplicable') AS IsInsuranceApplicable,
			JSON_VALUE(RequestData, '$.InsurancePhotoId') AS InsurancePhotoId,
			JSON_VALUE(RequestData, '$.PaymentId') AS PaymentId,
			JSON_VALUE(RequestData, '$.DishargeDate') AS DischargeDate;
				
	Elseif InsType = 'payment' then 
		
		Select @MaxId := Max(PaymentId) from Payments;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select PaymentCode from Payments where PaymentId =  @MaxId), "PAY", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('PAY', Cast(@MaxId as char(10)));
		
		Insert into Payments(PaymentCode, PaymentmodeId, PayeeName, TotalAmount, DiscountAmount, InsuranceAmount, PayableAmount)
		Select 
			@DocCode AS PaymentCode,
			JSON_VALUE(RequestData, '$.PaymentmodeId') AS PaymentmodeId,
			JSON_VALUE(RequestData, '$.PayeeName') AS PayeeName,
			JSON_VALUE(RequestData, '$.TotalAmount') AS TotalAmount,
			JSON_VALUE(RequestData, '$.DiscountAmount') AS DiscountAmount,
			JSON_VALUE(RequestData, '$.InsuranceAmount') AS InsuranceAmount,
			JSON_VALUE(RequestData, '$.PayableAmount') AS PayableAmount;
			
	Elseif InsType = 'appointment' then 
		
		Select @MaxId := Max(AppointmentId) from appointments;
		if @MaxId is null then
			set @MaxId =1000;
		else
			SELECT @MaxId := cast((REPLACE((Select AppointmentCode from appointments where AppointmentId =  @MaxId), "PAY", "")) as char(5));
		end if;
		Set @MaxId = @MaxId + 1;
		
		Select @DocCode := CONCAT('PAY', Cast(@MaxId as char(10)));
		
		Insert into appointments(AppointmentCode, DoctorId, PatientId, HospitalId, Appt_Date, Next_Appt_Date, DiseaseNotes, Fee)
		Select 
			@DocCode AS HospitalCode,
			JSON_VALUE(RequestData, '$.DoctorId') AS DoctorId,
			JSON_VALUE(RequestData, '$.PatientId') AS PatientId,
			JSON_VALUE(RequestData, '$.HospitalId') AS HospitalId,
			JSON_VALUE(RequestData, '$.Appt_Date') AS Appt_Date,
			JSON_VALUE(RequestData, '$.Next_Appt_Date') AS Next_Appt_Date,
			JSON_VALUE(RequestData, '$.DiseaseNotes') AS DiseaseNotes,
            JSON_VALUE(RequestData, '$.Fee') AS Fee;
		Elseif InsType = 'treamentmedicines' then
         Insert into treamentmedicines(TreatmentId, MedicineId,Limits)
		Select 
			JSON_VALUE(RequestData, '$.TreatmentId') AS TreatmentId,
			JSON_VALUE(RequestData, '$.MedicineId') AS MedicineId,
			JSON_VALUE(RequestData, '$.Limit') AS Limits;
            Elseif InsType = 'appointmentmedicine' then
         Insert into appointmentmedicines(AppointmentId, MedicineId,Limits)
		Select 
			JSON_VALUE(RequestData, '$.AppointmentId') AS AppointmentId,
			JSON_VALUE(RequestData, '$.MedicineId') AS MedicineId,
			JSON_VALUE(RequestData, '$.Limit') AS Limits;
	Elseif InsType = 'Users' then
         Insert into Users(UserName,FirstName,LastName,Email,UserRole,Password,PhoneNo)
		Select 
			JSON_VALUE(RequestData, '$.UserName') AS UserName,
			JSON_VALUE(RequestData, '$.FirstName') AS FirstName,
			JSON_VALUE(RequestData, '$.LastName') AS LastName,
			JSON_VALUE(RequestData, '$.Email') AS Email,
			JSON_VALUE(RequestData, '$.UserRole') AS UserRole,
			JSON_VALUE(RequestData, '$.Password') AS Password,
			JSON_VALUE(RequestData, '$.PhoneNo') AS PhoneNo;
    End If;
	
END$$

DELIMITER ;