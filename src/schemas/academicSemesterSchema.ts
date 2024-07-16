import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Select a semester name" }),
  year: z.string({ required_error: "Select a semester year" }),
  startMonth: z.string({ required_error: "Select a semester start month" }),
  endMonth: z.string({ required_error: "Select a semester end month" }),
});
