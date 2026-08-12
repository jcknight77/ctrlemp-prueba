import type { DepartmentId, PositionId } from "../constants";

export interface Employee {
    id?: number;
    name: string;
    salary: number;
    currentPositionId: PositionId;
    currentPositionName?: string;
    departmentId: DepartmentId;
    departmentName?: string;
    annualBonus?: number;
}
