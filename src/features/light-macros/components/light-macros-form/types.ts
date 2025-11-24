import * as yup from "yup";
import type { schema } from "./validation-schema";

export type FormData = yup.InferType<typeof schema>;

export type TLightMacrosForm = {
  onSubmit: (data: TFormDataWithConvertedTime) => void
}
export type TLightMacrosFormUI = {
  onSubmit: () => void
}

export type TFormDataWithConvertedTime =
  Omit<FormData, "time"> & {
    time: { hh: string; mm: string; ss: string };
  };