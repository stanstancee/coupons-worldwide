/* eslint-disable @typescript-eslint/no-explicit-any */
export const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: '0.5rem',
    borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--input))',
    boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring))' : 'none',
    '&:hover': {
      borderColor: 'hsl(var(--input))'
    },
    backgroundColor: 'hsl(var(--background))',
    padding: '1px'
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow)'
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'hsl(var(--primary))'
      : state.isFocused
        ? 'hsl(var(--accent))'
        : 'transparent',
    color: state.isSelected
      ? 'hsl(var(--primary-foreground))'
      : 'inherit',
    '&:hover': {
      backgroundColor: state.isSelected
        ? 'hsl(var(--primary))'
        : 'hsl(var(--accent))'
    }
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: 'hsl(var(--accent))',
    borderRadius: '0.3rem'
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'hsl(var(--accent-foreground))'
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: 'hsl(var(--accent-foreground))',
    '&:hover': {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))'
    }
  })
}

