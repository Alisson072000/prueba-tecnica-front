import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card';
import { TaskFormModalComponent } from '../task-form-modal/task-form-modal';

type FilterOption = 'ALL' | TaskStatus;

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskCardComponent, TaskFormModalComponent],
  templateUrl: './task-list.html',
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  activeFilter = signal<FilterOption>('ALL');
  showModal = signal(false);
  errorMessage = signal<string | null>(null);
  loading = signal(false);

  readonly filters: { value: FilterOption; label: string; count: () => number }[] = [
    { value: 'ALL', label: 'Todas', count: () => this.tasks().length },
    { value: 'TODO', label: 'Por hacer', count: () => this.tasks().filter(t => t.status === 'TODO').length },
    { value: 'IN_PROGRESS', label: 'En progreso', count: () => this.tasks().filter(t => t.status === 'IN_PROGRESS').length },
    { value: 'DONE', label: 'Completadas', count: () => this.tasks().filter(t => t.status === 'DONE').length },
  ];

  filteredTasks = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'ALL') return this.tasks();
    return this.tasks().filter(t => t.status === filter);
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.setError('No se pudo cargar las tareas. Verifica que el servidor esté corriendo.');
        console.error('Error cargando tareas:', err);
      },
    });
  }

  onTaskCreated(task: Task): void {
    this.tasks.update(tasks => [task, ...tasks]);
    this.showModal.set(false);
  }

  onStatusChanged(event: { id: string; status: TaskStatus }): void {
    this.taskService.updateStatus(event.id, { status: event.status }).subscribe({
      next: (updated) => {
        this.tasks.update(tasks => tasks.map(t => t.id === updated.id ? updated : t));
      },
      error: (err) => {
        this.setError('No se pudo actualizar el estado de la tarea.');
        console.error('Error actualizando estado:', err);
      },
    });
  }

  onTaskDeleted(id: string): void {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== id));
      },
      error: (err) => {
        this.setError('No se pudo eliminar la tarea.');
        console.error('Error eliminando tarea:', err);
      },
    });
  }

  setFilter(filter: FilterOption): void {
    this.activeFilter.set(filter);
  }

  dismissError(): void {
    this.errorMessage.set(null);
  }

  private setError(msg: string): void {
    this.errorMessage.set(msg);
    setTimeout(() => this.errorMessage.set(null), 6000);
  }
}
