import os
import time
import json
import base64
import requests
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

class StabilityAIGenerator:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('STABILITY_API_KEY')
        self.host = os.getenv('STABILITY_HOST', 'https://api.stability.ai')
        self.width = int(os.getenv('IMAGE_WIDTH', '1024'))
        self.height = int(os.getenv('IMAGE_HEIGHT', '768'))
        self.num_samples = int(os.getenv('NUM_SAMPLES', '2'))
        
    def check_api_connection(self):
        if not self.api_key:
            raise ValueError("API 키가 설정되지 않았습니다. .env 파일에 STABILITY_API_KEY를 설정해주세요.")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}"
        }
        
        try:
            response = requests.get(f"{self.host}/v1/user/balance", headers=headers)
            if response.status_code == 200:
                balance = response.json()
                print(f"✓ API 연결 성공 (잔여 크레딧: {balance.get('credits')})")
                return True
            else:
                print(f"✗ API 연결 실패: {response.text}")
                return False
        except Exception as e:
            print(f"✗ API 연결 실패: {str(e)}")
            return False

    def generate_image(self, dinosaur_name):
        print(f"\n🦕 생성 시작: {dinosaur_name}")
        
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        # 만화 스타일의 프롬프트
        prompt = (
            f"A professional cartoon illustration of a {dinosaur_name} in a dynamic pose, "
            "featuring two long brow horns and a shorter nasal horn on its unevenly shaped skull. "
            "Set in the lush natural environment of the Late Cretaceous, "
            "the scene is adorned with vibrant trees and diverse foliage, "
            "depicting a rich and historical atmosphere. "
            "Using a clean cel-shaded style with bold outlines, "
            "the illustration highlights the dinosaur's majestic features. "
            "Lighting is carefully used to add depth and dimension, "
            "with layers of foreground, middle ground, and background creating a sense of depth. "
            "The warm earth tones and cool greens blend harmoniously, "
            "emphasizing the uniqueness of this prehistoric setting"
        )
        
        negative_prompt = (
            "rhinoceros-like features, wrong anatomy, "
            "incorrect horn number or placement, wrong skull shape, "
            "modern plants or environment, "
            "flat lighting, lack of depth, "
            "scary or aggressive pose, "
            "blurry, low quality, poorly drawn, "
            "oversimplified, anime style, "
            "missing key features, wrong proportions"
        )

        payload = {
            "text_prompts": [
                {
                    "text": prompt,
                    "weight": 1
                },
                {
                    "text": negative_prompt,
                    "weight": -1
                }
            ],
            "cfg_scale": 8,
            "height": self.height,
            "width": self.width,
            "samples": self.num_samples,
            "steps": 40,
            "style_preset": "comic-book"  # 만화 스타일을 위한 프리셋
        }

        print("   API 요청 중...")
        try:
            response = requests.post(
                f"{self.host}/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
                headers=headers,
                json=payload
            )
            
            if response.status_code != 200:
                print(f"✗ 이미지 생성 실패: {response.text}")
                return False

            data = response.json()
            
            if "artifacts" not in data:
                print(f"✗ 이미지 생성 실패: 응답에 이미지가 없습니다")
                print(f"   응답 내용: {data}")
                return False
                
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            success_count = 0
            
            for i, image in enumerate(data["artifacts"]):
                if image.get("finishReason") == "SUCCESS":
                    try:
                        # Base64 디코딩
                        image_data = base64.b64decode(image.get("base64"))
                        filename = f"images/{dinosaur_name.lower()}_{timestamp}_{i+1}.png"
                        
                        with open(filename, "wb") as f:
                            f.write(image_data)
                        
                        success_count += 1
                        print(f"   ✓ 이미지 저장 완료: {filename}")
                    except Exception as e:
                        print(f"   ✗ 이미지 {i+1} 저장 실패: {str(e)}")
                else:
                    print(f"   ✗ 이미지 {i+1} 생성 실패: {image.get('finishReason')}")
            
            return success_count > 0

        except Exception as e:
            print(f"✗ 이미지 생성 중 오류 발생: {str(e)}")
            return False

def main():
    print("\n[1/2] 이미지 저장 디렉토리 준비 중...")
    os.makedirs("images", exist_ok=True)
    print("✓ 'images' 디렉토리 준비 완료\n")
    
    generator = StabilityAIGenerator()
    
    print("[2/2] API 연결 확인 중...")
    if not generator.check_api_connection():
        return
    
    # 테스트를 위해 트리케라톱스만 생성
    dinosaurs = ["Triceratops"]
    
    print(f"\n이미지 생성 시작 (총 {len(dinosaurs)}개 공룡)...\n")
    
    success_count = 0
    fail_count = 0
    
    for dinosaur in dinosaurs:
        if generator.generate_image(dinosaur):
            success_count += 1
        else:
            fail_count += 1
            
    print(f"\n작업 완료 결과:")
    print(f"✓ 성공: {success_count}개")
    print(f"✗ 실패: {fail_count}개")

if __name__ == "__main__":
    main() 