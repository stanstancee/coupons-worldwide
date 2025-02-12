import * as z from "zod"

export const profileFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).optional(),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }).optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
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
  youtube: z.string().url("Please enter a valid URL."),
})



export const promotionSchema = z.object({
  promotionType: z.enum(["campaign", "store"]),
  campaignId: z.string().optional(),
  adChannel: z.enum(["featured", "promoted", "popular"]),
  duration: z.enum(["7", "14", "30", "90", "180", "365"]),
})


export type PromotionFormData = z.infer<typeof promotionSchema>

export type SocialFormValues = z.infer<typeof SocialSchem>

export type CompanyFormValues = z.infer<typeof companyFormSchema>

export type ProfileFormValues = z.infer<typeof profileFormSchema>

