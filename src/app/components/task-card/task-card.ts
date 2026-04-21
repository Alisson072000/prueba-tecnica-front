import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
})
export class TaskCardComponent {
  task = input.required<Task>();
  statusChanged = output<{ id: string; status: TaskStatus }>();
  deleted = output<string>();

  readonly statusFlow: Record<TaskStatus, TaskStatus | null> = {
    TODO: 'IN_PROGRESS',
    IN_PROGRESS: 'DONE',
    DONE: null,
  };

  readonly statusLabel: Record<TaskStatus, string> = {
    TODO: 'Por hacer',
    IN_PROGRESS: 'En progreso',
    DONE: 'Completada',
  };

  readonly nextLabel: Record<TaskStatus, string> = {
    TODO: 'Iniciar',
    IN_PROGRESS: 'Completar',
    DONE: '',
  };

  readonly statusBadge: Record<TaskStatus, string> = {
    TODO: 'bg-slate-100 text-slate-600 border border-slate-200',
    IN_PROGRESS: 'bg-amber-100 text-amber-700 border border-amber-200',
    DONE: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  };

  readonly statusDot: Record<TaskStatus, string> = {
    TODO: 'bg-slate-400',
    IN_PROGRESS: 'bg-amber-400',
    DONE: 'bg-emerald-400',
  };

  get nextStatus(): TaskStatus | null {
    return this.statusFlow[this.task().status];
  }

  advance(): void {
    const next = this.nextStatus;
    if (next) {
      this.statusChanged.emit({ id: this.task().id, status: next });
    }
  }

  remove(): void {
    this.deleted.emit(this.task().id);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  isDueSoon(): boolean {
    if (!this.task().dueDate) return false;
    const diff = new Date(this.task().dueDate!).getTime() - Date.now();
    return diff > 0 && diff < 2 * 24 * 60 * 60 * 1000;
  }

  isOverdue(): boolean {
    if (!this.task().dueDate || this.task().status === 'DONE') return false;
    return new Date(this.task().dueDate!).getTime() < Date.now();
  }
}
