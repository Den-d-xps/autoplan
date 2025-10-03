import React from "react";
import { Button, Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  TextFieldElement,
  CheckboxElement
} from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { TimePickerElement } from "react-hook-form-mui/date-pickers";

// ======= схема валидации =======
const schema = yup.object({
  cplName: yup.string().required("Введите название пакета"),
  titleTime: yup
    .mixed<Dayjs>()
    .required("Выберите время начала титров")
    .nullable()
    .test("is-valid", "Некорректное время", (value) => dayjs.isDayjs(value) && value.isValid()),
  agree1: yup.boolean().required("Выберите").oneOf([true], "Обязательное согласие"),
  agree2: yup.boolean().required("Выберите"),
});

type FormData = yup.InferType<typeof schema>;

export default function MyForm() {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cplName: "",
      titleTime: null,
      agree1: false,
      agree2: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Форма:", {
      ...data,
      time: data.titleTime ? data.titleTime.format("HH:mm:ss") : null,
    });
  };

  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const kinoteatrs = [
    { label: 'ОП1' },
    { label: 'ОП3' },
    { label: 'ОП4' },
    { label: 'ОП5' },
    { label: 'ОП6' },
    { label: 'ОП8' },
    { label: 'ОП9' },
    { label: 'ОП10' },
    { label: 'ОП11' },
    { label: 'ОП12' },
    { label: 'ОП13' },
    { label: 'ОП14' },
    { label: 'ОП16' },
    { label: 'ОП17' },
    { label: 'ОП18' },
    { label: 'ОП19' },
    { label: 'ОП20' },
    { label: 'ОП21' },
    { label: 'ОП22' },
    { label: 'ОП23' },
    { label: 'ОП24' },
    { label: 'ОП25' },
    { label: 'ОП26' },
    { label: 'ОП27' },
    { label: 'ОП28' },
    { label: 'ОП29' },
    { label: 'ОП30' },
    { label: 'ОП31' },
    { label: 'ОП32' },
    { label: 'ОП33' },
    { label: 'ОП34' },
    { label: 'ОП35' },
    { label: 'ОП36' },
    { label: 'ОП37' },
    { label: 'ОП40' },
    { label: 'ОП41' },
    { label: 'ОП43' },
    { label: 'ОП45' },
    { label: 'ОП46' },
    { label: 'ОП47' },
    { label: 'ОП49' },
    { label: 'ОП50' },
    { label: 'ОП52' },
    { label: 'ОП54' },
    { label: 'ОП56' },
    { label: 'ОП58' },
    { label: 'ОП59' },
    { label: 'ОП60' },
    { label: 'ОП61' },
    { label: 'ОП62' },
    { label: 'ОП63' },
    { label: 'ОП64' },
    { label: 'ОП65' },
    { label: 'ОП66' },
    { label: 'ОП67' },
    { label: 'ОП68' },
    { label: 'ОП69' },
    { label: 'ОП70' },
    { label: 'ОП72' },
    { label: 'ОП73' },
    { label: 'ОП74' },
    { label: 'ОП75' },
    { label: 'ОП76' },
    { label: 'ОП79' },
    { label: 'ОП80' },
    { label: 'ОП82' },
    { label: 'ОП83' },
    { label: 'ОП84' },
    { label: 'ОП85' },
    { label: 'ОП87' },
    { label: 'ОП88' }
  ];


  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Поле ввода имени cpl */}
        <TextFieldElement
          name="cplName"
          label="Название пакета"
          required
          fullWidth
          margin="normal"
          
        />
        <Box sx={{ display: "flex", gap: 8, }}>
        {/* Выбор времени */}
          <TimePickerElement
            name="time"
            label="Время"
            ampm={false} // 24-часовой формат
            views={["hours", "minutes", "seconds"]}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            sx={{ flex: '1 1 60%' }}
          />

          {/* Чекбоксы */}
          <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", flex: '1 1 40%' }}>
            <CheckboxElement name="agree1" label="От начала пакета" />
            <CheckboxElement name="agree2" label="От конца пакета" />
          </Box>
        </Box>
        <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          })}
        >
          <ToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          sx={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {kinoteatrs.map((format) => (
              <ToggleButton sx={{ flex: '1 0 8%' }} key={format.label} value={format.label} aria-label={format.label}>
                {format.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Paper>
        {/* Кнопка */}
        <Button type="submit" variant="outlined">
          Отправить
        </Button>
      </Box>
    </FormProvider>
  );
}
