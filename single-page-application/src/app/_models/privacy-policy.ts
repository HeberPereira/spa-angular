export class PrivacyPolicy {
  id?: number
  privacyPolicyStatus: string
  privacyPolicyStatusDescription: string
  conditions: string  
  concurrencyToken: string
}

export class PrivacyPolicyStatus{
  privacyPolicyStatus: number
  name: string
  concurrencyToken: string
} 

export class UserTerm{
  PrivacyPolicyId: number 
  concurrencyToken: string
} 
