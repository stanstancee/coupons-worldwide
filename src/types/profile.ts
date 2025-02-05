

export interface Profile {
    uid: string
    first_name: string
    last_name: string
    email: string
    email_verified_at: string
    profile_image: string | null
    account_type: string
    username: string
    is_verified: number
    is_onboarded: boolean
    country: string
    deleted_at: string | null
    created_at: string
    updated_at: string
    security_setting: {
      uid: string
      user_uid: string
      finger_print: string
      face_recognition: string
      created_at: string
      updated_at: string
    }
    notification_setting: {
      uid: string
      user_uid: string
      general: string
      follow_store: string
      created_at: string
      updated_at: string
    }
  }