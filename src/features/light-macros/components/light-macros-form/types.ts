import * as yup from "yup";
import type { schema } from "./validation-schema";

export type FormData = yup.InferType<typeof schema>;

export type TLightMacrosForm = {
  onSubmit: (data: FormData) => void
}
export type TLightMacrosFormUI = {
  onSubmit: () => void
}
