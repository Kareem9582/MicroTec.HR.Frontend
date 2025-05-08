import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nationality } from '@hrfeatures/employee/models/nationality.model';
import { GetEmployeeByIdApiResponse } from '@hrfeatures/employee/responses/getEmployeeById-api-response.model copy';
import { NationalityService } from '@hrfeatures/employee/services/Nationality.service';
import { AgeCalculatorService } from '@shared/utils/age-calculator.service';
import { DateService } from '@shared/utils/date.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss', 
  standalone:true
})
export class EmployeeFormComponent implements OnInit{
  @Input() isViewMode:boolean = false;
  @Input() employeeData!: GetEmployeeByIdApiResponse;
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() formCancel = new EventEmitter();
  
  employeeForm!: FormGroup;
  genders: ('Male' | 'Female')[] = ['Male', 'Female'];
  minDate: Date;
  maxDate: Date;
  employeeAge: string = "To be Calculated";
  nationalities!: Nationality[];
  /**
   *
   */
  constructor(
    private ageCalculator: AgeCalculatorService ,
    private dateService:DateService, 
    private nationalityService: NationalityService , 
    private fb: FormBuilder ) {
    // Set date boundaries (e.g., 18-65 years old)
    const currentYear = new Date().getFullYear();

    this.minDate = new Date(currentYear - 65, 0, 1);
    this.maxDate = new Date(currentYear - 18, 11, 31);
    
    this.initializeForm();
  }
  ngOnInit(): void {
    this.loadNationalities();
  }

  onSubmit() {
    this.formSubmit.emit(this.employeeForm);
  }

  onCancel() {
    this.formCancel.emit();
  }
  
  ngOnChanges() {
    if(this.employeeData)
    {
        // Convert the birthDate to the correct format for the input
      const formattedBirthDate = this.dateService.formatDateForInput(this.employeeData.birthDate);
      if (this.employeeData) {
        this.employeeForm.patchValue({
          employeeCode: this.employeeData.employeeCode,
          fullName: this.employeeData.fullName,
          birthDate: formattedBirthDate,
          nationality: this.employeeData.nationalityId,
          gender: this.employeeData.gender
        });
        
        if (this.isViewMode) {
          this.employeeForm.disable();
        }
        
        // Calculate age if birthDate exists
        if (this.employeeData.birthDate) {
          this.calculateAge(this.employeeData.birthDate);
        }
      }
    }
  }

  private initializeForm(): void {
      this.employeeForm = this.fb.group({
        employeeCode: [''], // Add this line
        fullName: ['', [Validators.required, Validators.maxLength(100)]],
        birthDate: [null, [Validators.required]],
        nationality: ['', Validators.required],
        gender: ['', Validators.required]
      });
  
      // Watch for birthDate changes
      this.employeeForm.get('birthDate')?.valueChanges.subscribe(date => {
        if (date) {
          this.calculateAge(date);
        }
      });
    }

  calculateAge(birthDate: Date): void {
    this.employeeAge = this.ageCalculator.calculateAge(birthDate);
  }

  loadNationalities() {
    this.nationalityService.
    getNationalities().
    subscribe({
      next: (response) => {
        this.nationalities = response;
      },
      error: (err) => {
        console.error('Failed to load employees', err);
      }
    });
  }
}
