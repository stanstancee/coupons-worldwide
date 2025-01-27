import * as z from "zod"
import { countries } from "./countries"

export const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  gender: z.enum(["female", "male", "other"], {
    required_error: "Please select a gender.",
  }),
  country: z.enum(countries.map((c) => c.code) as [string, ...string[]], {
    required_error: "Please select a country.",
  }),
  currentPassword: z.string().min(6, {
    message: "Current password must be at least 6 characters.",
  }),
  newPassword: z
    .string()
    .min(6, {
      message: "New password must be at least 6 characters.",
    })
    .optional(),
})

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"]

export const companyFormSchema = z.object({
  logo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 500KB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .svg and .gif formats are supported.",
    )
    .optional(),
  name: z.string().min(2, "Company name must be at least 2 characters."),
  website: z.string().url("Please enter a valid URL."),
  email: z.string().email("Please enter a valid email address."),
  employeeCount: z.string({
    required_error: "Please select employee count.",
  }),
  industry: z.string({
    required_error: "Please select industry.",
  }),
  phone: z.string().min(10, "Please enter a valid phone number."),
  description: z.string().max(500, "Description must not exceed 500 characters."),
})


export const SocialSchem = z.object({
  facebook: z.string().url("Please enter a valid URL."),
  twitter: z.string().url("Please enter a valid URL."),
  linkedin: z.string().url("Please enter a valid URL."),
  instagram: z.string().url("Please enter a valid URL."),
  youtube : z.string().url("Please enter a valid URL."),
})

export type SocialFormValues = z.infer<typeof SocialSchem>

export type CompanyFormValues = z.infer<typeof companyFormSchema>

export type ProfileFormValues = z.infer<typeof profileFormSchema>

