import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Custody } from '@hrfeatures/employee/models/custody.model';
import { DateService } from '@shared/utils/date.service';


@Component({
  selector: 'app-custody-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './custody-table.component.html',
  styleUrls: ['./custody-table.component.scss']
})
export class CustodyTableComponent implements OnInit {
  @Input() isViewMode: boolean = false;
  @Input() custodyData!: Custody[];
  @Output() custodiesChange = new EventEmitter<Custody[]>();

  custodyForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dateService: DateService) {
    this.custodyForm = this.fb.group({
      custodies: this.fb.array([])
    });
  }
  
  ngOnInit() {
    this.initializeCustodies();

    this.custodies.valueChanges.subscribe(() => {
      this.emitCustodies();
    });
  }

  get custodies(): FormArray {
    return this.custodyForm.get('custodies') as FormArray;
  }

  getCustodyControl(index: number, controlName: string): FormControl {
    return this.custodies.at(index).get(controlName) as FormControl;
  }

  private initializeCustodies() {
    if (this.custodyData?.length > 0) {
      this.custodyData.forEach(data => {
        this.custodies.push(this.fb.group({
          custodyCode: [{ value: data.custodyNumber, disabled: true }],
          custodyName: [data.custodyName, Validators.required],
          custodyDescription: [data.custodyDescription],
          assignDate: [this.dateService.formatDateForInput(data.assignDate), Validators.required]
        }));
      });
    } else {
      this.addCustody();
    }
  
    this.emitCustodies(); // optional, could defer to valueChanges
  }

  addCustody() {
    const today = new Date();
    const formattedDate = this.dateService.formatDateForInput(today);
    
    this.custodies.push(this.fb.group({
      custodyCode: [{ value: '', disabled: true }],
      custodyName: ['', Validators.required],
      custodyDescription: [''],
      assignDate: [formattedDate, Validators.required]
    }));

    this.emitCustodies();
  }

  removeCustody(index: number) {
    this.custodies.removeAt(index);
    this.emitCustodies();
  }

  private emitCustodies() {
    this.custodiesChange.emit(this.custodies.getRawValue());
  }
}