'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    year: '',
    month: '',
    day: '',
    phone: '',
    email: '',
    marketingAgree: false,
    privacyAgree: false
  })

  const [errors, setErrors] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    birth: '',
    phone: '',
    email: ''
  })

  const validateId = (id: string) => {
    if (id.length < 4) return '아이디는 4자 이상이어야 합니다'
    if (!/^[A-Za-z0-9]+$/.test(id)) return '아이디는 영문과 숫자만 사용 가능합니다'
    return ''
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다'
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) 
      return '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다'
    return ''
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다'
    return ''
  }

  const validateNickname = (nickname: string) => {
    if (nickname.length < 2) return '닉네임은 2자 이상이어야 합니다'
    return ''
  }

  const validateBirth = (year: string, month: string, day: string) => {
    if (!year || !month || !day) return '생년월일을 선택해주세요'
    return ''
  }

  const validatePhone = (phone: string) => {
    if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phone)) 
      return '올바른 휴대폰 번호를 입력해주세요'
    return ''
  }

  const validateEmail = (email: string) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      return '올바른 이메일 주소를 입력해주세요'
    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // 실시간 유효성 검사
    switch (name) {
      case 'id':
        setErrors(prev => ({ ...prev, id: validateId(value) }))
        break
      case 'password':
        setErrors(prev => ({ 
          ...prev, 
          password: validatePassword(value),
          confirmPassword: validateConfirmPassword(value, formData.confirmPassword)
        }))
        break
      case 'confirmPassword':
        setErrors(prev => ({ 
          ...prev, 
          confirmPassword: validateConfirmPassword(formData.password, value)
        }))
        break
      case 'nickname':
        setErrors(prev => ({ ...prev, nickname: validateNickname(value) }))
        break
      case 'phone':
        setErrors(prev => ({ ...prev, phone: validatePhone(value) }))
        break
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }))
        break
    }
  }

  const handleBirthChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 생년월일 변경 시 유효성 검사
    const newBirthData = {
      ...formData,
      [field]: value
    }
    setErrors(prev => ({ 
      ...prev, 
      birth: validateBirth(newBirthData.year, newBirthData.month, newBirthData.day)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 전체 유효성 검사
    const newErrors = {
      id: validateId(formData.id),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      nickname: validateNickname(formData.nickname),
      birth: validateBirth(formData.year, formData.month, formData.day),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email)
    }

    setErrors(newErrors)

    // 에러가 없는 경우에만 제출
    if (!Object.values(newErrors).some(error => error !== '')) {
      console.log(formData)
      // 제출 로직
    }
  }

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-[375px] mx-auto px-5 py-6 bg-white">
        <h1 className="text-xl font-bold mb-6">회원가입</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="id">아이디</Label>
            <div className="flex gap-2">
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className={`flex-1 ${errors.id ? 'border-red-500' : ''}`}
              />
              <Button 
                type="button" 
                className="w-24 bg-[#0094FF] hover:bg-[#0094FF]/90 text-white"
              >
                중복확인
              </Button>
            </div>
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
          </div>

          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className={errors.nickname ? 'border-red-500' : ''}
            />
            {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
          </div>

          <div>
            <Label>생년월일</Label>
            <div className="grid grid-cols-3 gap-2">
              <Select onValueChange={(value) => handleBirthChange('year', value)}>
                <SelectTrigger className={errors.birth ? 'border-red-500' : ''}>
                  <SelectValue placeholder="년도" />
                </SelectTrigger>
                <SelectContent className="h-[200px] overflow-y-auto">
                  {years.map(year => (
                    <SelectItem 
                      key={year} 
                      value={year.toString()}
                      className="py-2.5"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleBirthChange('month', value)}>
                <SelectTrigger className={errors.birth ? 'border-red-500' : ''}>
                  <SelectValue placeholder="월" />
                </SelectTrigger>
                <SelectContent className="h-[200px] overflow-y-auto">
                  {months.map(month => (
                    <SelectItem 
                      key={month} 
                      value={month.toString()}
                      className="py-2.5"
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleBirthChange('day', value)}>
                <SelectTrigger className={errors.birth ? 'border-red-500' : ''}>
                  <SelectValue placeholder="일" />
                </SelectTrigger>
                <SelectContent className="h-[200px] overflow-y-auto">
                  {days.map(day => (
                    <SelectItem 
                      key={day} 
                      value={day.toString()}
                      className="py-2.5"
                    >
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.birth && <p className="text-red-500 text-sm mt-1">{errors.birth}</p>}
          </div>

          <div>
            <Label htmlFor="phone">휴대폰번호</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="marketingAgree"
                checked={formData.marketingAgree}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, marketingAgree: checked as boolean }))
                }
              />
              <label 
                htmlFor="marketingAgree" 
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                마케팅 정보 수신 동의 (선택)
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-[#0094FF] hover:bg-[#0094FF]/90 text-white"
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>
  )
}