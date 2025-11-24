import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import * as yup from "yup";


export const schema = yup.object({
  cplName: yup.string().required("Введите название пакета"),
  time: yup
    .mixed<Dayjs>()
    .required("Выберите время начала титров")
    .nullable()
    .test("is-valid", "Некорректное время", (value) => dayjs.isDayjs(value) && value.isValid()),
  position: yup.string().oneOf(["start", "end"]).required(),
  cinemas: yup.array().of(yup.string()).min(1, "Выберите хотя бы один кинотеатр").required()
});