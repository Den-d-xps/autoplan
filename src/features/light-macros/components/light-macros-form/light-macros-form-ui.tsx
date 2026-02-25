import { Box, Button } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { RadioButtonGroup, TextFieldElement } from "react-hook-form-mui";
import { TimePickerElement } from "react-hook-form-mui/date-pickers";
import { CinemaMultiSelectButtons } from "../cinema-multi-select-buttons";
import type { TLightMacrosFormUI } from "./types";


export const LightMacrosFormUI = ({ 
  onSubmit
}: TLightMacrosFormUI) => {
  const { control } = useFormContext();
  
  return (
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3, p: 1 }}
      >
        {/* Название CPL */}
          <TextFieldElement
            name="cplName"
            label="Название пакета"
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
        {/* Время + позиция */}
        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <TimePickerElement
            name="time"
            label="Время"
            ampm={false}
            views={["hours", "minutes", "seconds"]}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            sx={{ flex: 1 }}
            required
          />
          <RadioButtonGroup
            name="position"
            options={[
              { id: "start", label: "От начала пакета" },
              { id: "end", label: "От конца пакета" },
            ]}
          />
        </Box>
        {/* Выбор кинотеатров (70 кнопок) */}
        <Controller
          name="cinemas"
          control={control}
          render={({ field }) => (
            <CinemaMultiSelectButtons
              selected={field.value as string[]}
              onChange={(values) => field.onChange(values)}
            />
          )}
        />
        {/* Submit */}
        <Button type="submit" variant="outlined" color="primary">
          Установить
        </Button>
      </Box>
  );
};