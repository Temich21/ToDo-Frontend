export interface PriorityOption {
  readonly value: number
  readonly label: string
}

export const priorityOptions: readonly PriorityOption[] = [
  { value: 1, label: 'Priority 1' },
  { value: 2, label: 'Priority 2' },
  { value: 3, label: 'Priority 3' },
  { value: 4, label: 'Priority 4' },
]