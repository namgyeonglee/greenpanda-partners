'use client'
import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Shield, Clock, Phone, User } from 'lucide-react';

const ReferralLandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hasExperience: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    
    if (numbersOnly.length > 11) return formData.phone;
    
    if (numbersOnly.length <= 3) {
      return numbersOnly;
    } else if (numbersOnly.length <= 7) {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else {
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7)}`;
    }
  };

  const handleSubmit = async () => {
  const phoneNumbers = formData.phone.replace(/[^0-9]/g, '');
  if (!formData.name || !formData.phone || phoneNumbers.length !== 11) return;
  
  setIsLoading(true);
  
  try {
    // 숨겨진 iframe 생성
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'hidden-form-frame';
    document.body.appendChild(iframe);
    
    // form 생성
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://script.google.com/macros/s/AKfycbxixkwnnZVbvbWbZlvytJlfuIdCe6i3ZMMd3pJyVCM8fu795XWgijvX8oC5Bnu1FQl2/exec';
    form.target = 'hidden-form-frame'; // iframe으로 전송
    
    // 데이터 필드 추가
    const timestampField = document.createElement('input');
    timestampField.type = 'hidden';
    timestampField.name = 'timestamp';
    timestampField.value = new Date().toLocaleString('ko-KR');
    form.appendChild(timestampField);
    
    const nameField = document.createElement('input');
    nameField.type = 'hidden';
    nameField.name = 'name';
    nameField.value = formData.name;
    form.appendChild(nameField);
    
    const phoneField = document.createElement('input');
    phoneField.type = 'hidden';
    phoneField.name = 'phone';
    phoneField.value = formData.phone;
    form.appendChild(phoneField);

    const experienceField = document.createElement('input');
    experienceField.type = 'hidden';
    experienceField.name = 'hasExperience';
    experienceField.value = formData.hasExperience;
    form.appendChild(experienceField);  
    
    // 폼 제출
    document.body.appendChild(form);
    form.submit();
    
    // 정리
    document.body.removeChild(form);
    
    // 성공 처리 (Google Sheets 저장 완료 시간 고려)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      // iframe 제거
      document.body.removeChild(iframe);
    }, 2000);
    
  } catch (error) {
    setIsLoading(false);
    alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedPhone
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-600">그린판다</div>
            <div className="ml-2 text-sm text-gray-500">Partners</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-snug">
              회원권 거래의 새로운 기준,<br />
              <span className="text-green-600">그린판다 파트너스</span>와 함께하세요
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              디지털 혁신으로 더 쉽고, 빠르고, 안전한 회원권 거래 시장을 만들어가는<br />
              그린판다의 파트너스가 되어 새로운 수익 기회를 잡으세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white px-6 py-3 rounded-full shadow-md">
                <span className="text-green-600 font-semibold">✨ 사전 등록 혜택</span>
                <span className="text-gray-600 ml-2">우선 선발 + 선착순 이벤트 참여</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 그린판다 파트너스인가?
            </h2>
            <p className="text-xl text-gray-600">기존 회원권 거래소와는 차원이 다른 혜택과 시스템</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">높은 수수료 수익</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 10억원 미만: <strong className="text-green-600">거래금액의 0.24%</strong></li>
                <li>• 10억원 이상: <strong className="text-green-600">거래금액의 0.264%</strong></li>
                <li>• 거래 완료 시 즉시 정산 시스템</li>
                <li>• 누적 거래액에 따라 보너스 제공</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">효율적인 업무</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 고객 오더 등록 및 상담에 집중</li>
                <li>• 실시간 거래 현황 대시보드 제공</li>
                <li>• 거래 단계별 자동 알림 시스템 지원</li>
                <li>• 디지털 거래 프로세스 활용</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">리스크 최소화</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 파트너스 노출 없는 안전 거래 보장</li>
                <li>• 가상계좌를 통한 내 고객의 안전한 대금 정산 보장</li>
                <li>• 본사 시스템에서 계약 업무 처리</li>
                <li>• 본사 시스템에서 명의개서 업무 처리</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              누구나 쉽게 4단계로<br />
              그린판다 파트너스를 시작할 수 있습니다
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">사전 등록</h3>
              <p className="text-gray-600">예명과 연락처로<br />간단히 신청</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">정규 등록</h3>
              <p className="text-gray-600">2025년 9월 오픈 예정<br />파트너스 자격 심사 및 검증</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">고객 오더 등록</h3>
              <p className="text-gray-600">레퍼럴 코드로<br />고객 오더 등록 유도</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">수익 창출</h3>
              <p className="text-gray-600">거래 완료 시<br />즉시 수수료 정산</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                목표 달성 시 예상 수익
              </h2>
              <p className="text-lg opacity-90">거래 1건 성사 시, 딜러 최저 수수료 30만원 보장</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">240만원</div>
                <div className="text-lg opacity-90">월 10억원 거래 시</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">480만원</div>
                <div className="text-lg opacity-90">월 20억원 거래 시</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1,200만원</div>
                <div className="text-lg opacity-90">월 50억원 거래 시</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg opacity-90">
                + 누적 거래액 달성 보너스 별도 지급
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                지금 사전 등록하고<br />
                <span className="text-green-600">우선 선발 혜택</span>을 받으세요
              </h2>
              <p className="text-lg text-gray-600">
                선착순 이벤트 참여 및 우선 교육 기회를 제공합니다
              </p>
            </div>

            {!isSubmitted ? (
              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    예명 (실명 가능)
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="홍길동 또는 별명"
                    />
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    휴대폰 번호
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                        formData.phone && formData.phone.replace(/[^0-9]/g, '').length !== 11 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="010-1234-5678"
                      maxLength={13}
                    />
                  </div>
                  {formData.phone && formData.phone.replace(/[^0-9]/g, '').length !== 11 && (
                    <p className="text-sm text-red-600 mt-1">
                      휴대폰 번호는 11자리 숫자로 입력해주세요 (현재: {formData.phone.replace(/[^0-9]/g, '').length}자리)
                    </p>
                  )}
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-3">
                    회원권 딜러 경험이 있으신가요?
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasExperience"
                        value="네"
                        checked={formData.hasExperience === '네'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">네</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasExperience"
                        value="아니요"
                        checked={formData.hasExperience === '아니요'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">아니요</span>
                    </label>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">사전 등록 혜택</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 우선 심사 및 빠른 승인</li>
                    <li>• 선착순 이벤트 자동 참여</li>
                    <li>• 1:1 전담 교육 지원</li>
                  </ul>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name || !formData.phone || formData.phone.replace(/[^0-9]/g, '').length !== 11 || !formData.hasExperience}
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '등록 중...' : '지금 사전 등록하기'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  등록된 정보는 파트너스 선발 목적으로만 사용되며, 개인정보보호법에 따라 안전하게 관리됩니다.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  사전 등록이 완료되었습니다!
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  곧 담당자가 연락드려 자세한 안내를 도와드리겠습니다.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800">
                    <strong>다음 단계:</strong> 3영업일 내 심사 결과 안내 및 교육 일정 공지
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-4">그린판다</div>
              {/* <p className="text-gray-400 mb-4">
                회원권 거래의 디지털 혁신을 선도하는 플랫폼
              </p> */}
              <div className="text-sm text-gray-400">
                <p>서울시 용산구 서빙고로 17, 센트럴파크타워 1206호</p>
                <p>사업자 등록번호: 768-86-02919 | 대표: 김태훈</p>
                <p>엔에이치44 주식회사 44Labs Inc.</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">문의하기</h4>
              <div className="text-gray-400 space-y-2">
                <p>파트너스 관련 문의</p>
                <p>이메일: partners@greenpanda.app</p>
                <p>운영시간: 평일 09:00-18:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 44Labs Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReferralLandingPage;