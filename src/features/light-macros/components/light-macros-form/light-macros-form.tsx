import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { LightMacrosFormUI } from "./light-macros-form-ui";
import type { TLightMacrosForm, FormData } from "./types";
import { schema } from "./validation-schema";


export const LightMacrosForm = ({ onSubmit }: TLightMacrosForm) => {
  
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      cplName: "",
      time: dayjs().hour(0).minute(0).second(0),
      position: "end",
      cinemas: [],
    },
  });

  const transformData = (data: FormData) => {
    const newData = {
       ...data,
       time: {
        hh: data.time?.format("HH"),
        mm: data.time?.format("mm"),
        ss: data.time?.format("ss"),
       }
    };

    onSubmit(newData);
  }


  return (
    <FormProvider {...methods}>
      <LightMacrosFormUI onSubmit={methods.handleSubmit(transformData)} />
    </FormProvider>
  );
}
