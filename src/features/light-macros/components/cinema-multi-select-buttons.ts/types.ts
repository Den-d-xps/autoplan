export type TCinemaMultiSelectButtonsProps = {
  selected: string[];                    
  onChange: (values: string[]) => void;  
}

export type TCinemaMultiSelectButtonsUIProps = {
  cinemas: string[];                     
  selected: string[];                    
  onChange: (values: string) => void;  
  onClear: () => void
}