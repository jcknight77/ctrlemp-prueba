export const POSITION_CHOICES = [
  { id: 1, name: 'Regular' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'Senior Manager' },
] as const;

export type PositionId = typeof POSITION_CHOICES[number]['id'];

export const DEPARTMENT_CHOICES = [
  { id: 1, name: 'Ingeniería' },
  { id: 2, name: 'Recursos Humanos' },
  { id: 3, name: 'Finanzas' },
] as const;

export type DepartmentId = typeof DEPARTMENT_CHOICES[number]['id'];
