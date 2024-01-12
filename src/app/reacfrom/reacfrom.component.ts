import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-reacfrom',
  templateUrl: './reacfrom.component.html',
  styleUrls: ['./reacfrom.component.scss']
})
export class ReacfromComponent {
  reacFrom!:FormGroup;
  editMode = false;
  constructor(private fb:FormBuilder,private serviceService:ServiceService){}

  ngOnInit(): void {
    this.fromPostData();
  }

  fromPostData() {
    this.reacFrom = this.fb.group(
      {
        id: [null],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        company: ['', Validators.required],
        gender: ['', Validators.required],
        date: ['', Validators.required],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value; 
    const confirmpassword = group.get('confirmpassword')?.value; 
    return password === confirmpassword ? null : { mismatch: true };
  }

  submitForm() {
    if (this.reacFrom.valid) {
      if (this.editMode) {
        this.serviceService.updateUser({ ...this.reacFrom.value });
        this.editMode = false;
      } else {
        this.serviceService.addUser({ id: this.generateUniqueId(), ...this.reacFrom.value });
      }
      this.reacFrom.reset();
    } else {
      alert('Please fill in all fields');
    }
  }

  editUser(id: number) {
    this.editMode = true;
    const userToEdit = this.serviceService.getUsers().find(user => user.id === id);
    if (userToEdit) {
      this.reacFrom.patchValue(userToEdit);
    }
  }

  deleteUser(id: number) {
    this.reacFrom.reset();
    this.editMode = false;
    this.serviceService.deleteUser(id);
  }

  getUsers() {
    return this.serviceService.getUsers();
  }
  clearForm() {
    this.editMode = false;
    this.reacFrom.reset();
  }
  private nextId: number = 1;

  private generateUniqueId(): number {
    return this.nextId++;
  }
}

