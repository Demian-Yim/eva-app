import { GoogleGenAI } from '@google/genai';
import { EvaResponse, UserInput } from '../types';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LOADING_MESSAGES = [
  '"데이터를 창의적으로 해석중..." (aka: 궁리하실 필요 없당!)',
  '"당신의 고민, AI가 찰떡으로 이해함..." (실릝, 진짜로!)',
  '"술마시들을 캡스톤에 넣는 중..." (응? 수학적 창의력 부스터중)',
  '"아이디어 1만 개 생성 후 한 개 선치는 중..."',
  '"커피 한 잔의 기적이 일어나는 중!" (AI는 커피 0잔 마셨지만)',
  '"모든 가능성을 계산 중... (대략 무한대)"',
];

export const getLoadingMessage = () =>
  LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

export const generateAppPlan = async (
  input: UserInput,
  userName: string,
  userId?: string
): Promise<EvaResponse | null> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API Key가 설정되지 않았습니다.');
  }

  const client = new GoogleGenAI({ apiKey });

  const prompt = `당신은 Eva, 세계 최고의 AI 앱 스킬렉이자 아이디어 설계 전문가입니다.

[${userName}]님의 정보:
- 업무/직군: ${input.job} / ${input.rank}
- 원하는 앱 스타일/특징: ${input.style}
- 현재 고민 (Pain Point): ${input.painPoint}

위 정보를 바탕으로, 다음 JSON 형식에 맞게 앱 기획안 3개를 생성해주세요:

{
  "userUnderstanding": "string (1-2문장으로 [사용자이름]님의 필요와 고민을 공감하여 요약)",
  "recommendations": [
    {
      "id": 1,
      "name": "string (한글+영문 조합의 스마트한 앱 이름)",
      "description": "string (앱의 핵심 아이디어를 1-2문장으로)",
      "features": ["string (5개 이상의 핵심 기능 목록)"],
      "targetAudience": "string",
      "difficulty": "초급" or "중급" or "고급",
      "detailedDesign": {
        "structure": ["string (주요 화면 목록)"],
        "buttons": ["string (핵심 버튼/인터랙션 요소)"],
        "dataStructure": "string (데이터 모델)",
        "flow": "string (사용자 흐름)",
        "aiFeatures": ["string (AI 활용 방안)"]
      },
      "prompt": {
        "appName": "string",
        "purpose": "string",
        "techStack": "string",
        "requirements": "string",
        "components": "string",
        "dataModel": "string",
        "stepByStepImplementation": "string",
        "finalRequest": "string"
      }
    }
  ],
  "advice": {
    "improvements": ["string (3개 이상의 개선 제안)"],
    "limitations": ["string (2-3개의 현실적 한계점)"],
    "finalWord": "string (따뜻한 조언)"
  }
}

되도록:
1. 서로 다른 다양한 난이도 (초급/중급/고급) 서순으로 제안
2. 반드시 JSON만 출력, 다른 텍스트 출력 없음
3. 조건 마크다운 제외하고 순수한 JSON만
`;

  const response = await client.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    }
  });

  let jsonText = response.text;
  jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

  const parsed: EvaResponse = JSON.parse(jsonText);

  if (userId && db) {
    try {
      await addDoc(collection(db, 'generatedApps'), {
        userId,
        userName,
        input,
        result: parsed,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Firestore save error:', e);
    }
  }

  return parsed;
};
