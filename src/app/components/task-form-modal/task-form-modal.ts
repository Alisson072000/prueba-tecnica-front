import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-modal.html',
})
export class TaskFormModalComponent {
  taskCreated = output<Task>();
  closed = output<void>();
  errorOccurred = output<string>();

  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);

  submitting = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    assignee: ['', Validators.required],
    dueDate: [''],
  });

  get title() { return this.form.get('title')!; }
  get assignee() { return this.form.get('assignee')!; }

  submit(): void {
    if (this.form.invalid || this.submitting) return;
    this.submitting = true;

    const { title, description, assignee, dueDate } = this.form.value;
    const payload = {
      title: title!,
      description: description || undefined,
      assignee: assignee!,
      dueDate: dueDate || undefined,
    };

    this.taskService.create(payload).subscribe({
      next: (task) => {
        this.submitting = false;
        this.taskCreated.emit(task);
        this.form.reset();
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message ?? 'Error al crear la tarea';
        this.errorOccurred.emit(Array.isArray(msg) ? msg.join(', ') : msg);
        console.error('Error creando tarea:', err);
      },
    });
  }

  close(): void {
    this.form.reset();
    this.closed.emit();
  }
}
