import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  task = [];
  constructor(public taskService: TaskService, private ruta: Router) {}

  ngOnInit(): void {
    this.taskService.obtenerUsers().subscribe({
      next: (res) => {
        this.task = res;
      },
      error: (err) => console.log(err),
    });
  }
}
