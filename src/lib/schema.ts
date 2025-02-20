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



const MAX_FILE_SIZE = 3000000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"]

export const companyFormSchema = z.object({
  logo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 3mb.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png, .svg and .gif formats are supported.",
    )
    .optional(),
  name: z.string().min(2, "Company name must be at least 2 characters.").optional(),
  website: z.string().url("Please enter a valid URL.").optional(),
  email: z.string().email("Please enter a valid email address.").optional(),
  company_size: z.string().optional(),

  primary_industry: z.string().or(z.null()).optional(),
  secondary_industry: z.string().optional(),
  phone: z.string().optional(),
  about: z.string().max(500, "Description must not exceed 500 characters.").optional(),

})


export const SocialSchem = z.object({
  facebook: z.string().url("Please enter a valid URL.").optional(),
  twitter: z.string().url("Please enter a valid URL.").optional(),
  linkedin: z.string().url("Please enter a valid URL.").optional(),
  instagram: z.string().url("Please enter a valid URL.").optional(),
  youtube: z.string().url("Please enter a valid URL.").optional(),
})



export const promotionSchema = z.object({
  promotionType: z.enum(["Campaign", "Store"]),
  campaignId: z.string().optional(),
  adChannel: z.string().min(2, "Please select an ad channel."),

  start_date: z.date(),
  end_date: z.date(),
})


export type PromotionFormData = z.infer<typeof promotionSchema>

export type SocialFormValues = z.infer<typeof SocialSchem>

export type CompanyFormValues = z.infer<typeof companyFormSchema>

export type ProfileFormValues = z.infer<typeof profileFormSchema>

