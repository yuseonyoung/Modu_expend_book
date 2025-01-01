'use server'

import { randomBytes } from 'crypto'

// Simulated database functions - replace with your actual database calls
async function findUserByEmail(email: string) {
  // Implement your database lookup
  return { id: '1', email: 'ysy@naver.com' }
}

async function updateUserPassword(email: string, newPassword: string) {
  // Implement your database update
  return true
}

// Store verification codes temporarily (use Redis or similar in production)
const verificationCodes = new Map<string, { code: string; email: string }>()

export async function sendVerificationCode(email: string) {
  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const token = randomBytes(32).toString('hex')
  
  // Store the code with the email
  verificationCodes.set(token, { code, email })
  
  // In production, send this code via email
  console.log(`Verification code for ${email}: ${code}`)
  
  return token
}

export async function verifyCodeAndGetId(token: string, code: string) {
  const verification = verificationCodes.get(token)
  if (!verification || verification.code !== code) {
    return { success: false, message: '인증번호가 일치하지 않습니다.' }
  }

  const user = await findUserByEmail(verification.email)
  return { 
    success: true, 
    email: user.email 
  }
}

export async function verifyCodeAndResetPassword(token: string, code: string) {
  const verification = verificationCodes.get(token)
  if (!verification || verification.code !== code) {
    return { success: false, message: '인증번호가 일치하지 않습니다.' }
  }

  // Generate new password
  const newPassword = Math.random().toString(36).slice(-8)
  await updateUserPassword(verification.email, newPassword)

  return { 
    success: true, 
    password: newPassword 
  }
}

