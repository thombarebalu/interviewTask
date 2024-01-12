import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private users: any[] = [];
  private nextId: number = 1;
  constructor() { const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    this.users = JSON.parse(storedUsers);
    this.nextId = this.calculateNextId();
  }
}
private calculateNextId(): number {
  return this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
}

private updateLocalStorage() {
  localStorage.setItem('users', JSON.stringify(this.users));
}

addUser(user: any) {
  user.id = this.nextId++;
  this.users.push(user);
  this.updateLocalStorage();
}

updateUser(updatedUser: any) {
  const index = this.users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    this.users[index] = updatedUser;
    this.updateLocalStorage();
  }
}

deleteUser(userId: number) {
  this.users = this.users.filter(user => user.id !== userId);
  this.updateLocalStorage();
}

getUsers() {
  return this.users.slice();
}
}

