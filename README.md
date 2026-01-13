# 🌐 Grayscale Web Project

부트스트랩 기반의 반응형 웹사이트 프로젝트입니다. AWS EC2 서버에 Nginx를 이용해 배포하였으며 DuckDNS를 통해 도메인 연결까지 완료했습니다.

## 🛠️ 기술 스택

- HTML5, CSS3
- Bootstrap 5.2.3
- JavaScript
- Spring Boot
- AWS EC2 (Ubuntu 20.04)
- Nginx
- DuckDNS (도메인)

---

## 🚀 배포 환경

| 항목       | 내용                              |
|------------|-----------------------------------|
| 서버       | AWS EC2 (t2.micro, Ubuntu 20.04)  |
| 웹서버     | Nginx                             |
| 도메인     | DuckDNS                           |
| 배포 방식  | 수동 배포 (SCP, 직접 업로드 등)   |
| 로컬 경로  | `/var/www/html/`                  |

---

## 🌐 접속 주소

👉 https://architen.netlify.app/

---

## 📡 EC2 연결 방법

```bash
# 1. pem 키 권한 설정
chmod 400 your-key.pem

# 2. EC2 인스턴스 SSH 접속
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

```
## ⚙️ Nginx 설정 예시

```bash
server {
    listen 80;
    server_name your-subdomain.duckdns.org;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

# 설정 파일 변경 후 반드시 reload
sudo systemctl restart nginx
```
## 🐥 DuckDNS 설정 방법
duckdns.org 접속 후 서브도메인과 토큰 생성

아래 스크립트 작성 및 crontab 등록

```bash

mkdir duckdns && cd duckdns
nano duck.sh

echo "url=https://www.duckdns.org/update?domains=your-subdomain&token=your-token&ip=" > duck.sh
chmod 700 duck.sh
crontab -e
# 아래 내용 추가
*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```
## 🐞 오류 정리 및 해결 과정

---
<details> <summary>문제 상황</summary>
    
### 🔒 1. HTTPS 접속 시 Mixed Content 오류 (외부 리소스는 반드시 https 통일)

#### ✅ 문제 상황
- DuckDNS 도메인을 이용해 HTTPS 접속을 적용한 후, 콘솔에 다음과 같은 오류 메시지 발생:
  ```
  Mixed Content: The page was loaded over HTTPS, but requested an insecure resource...
  ```
- 메인 이미지가 로드되지 않음

#### 🧾 원인
- 외부 리소스를 `http://`로 불러오고 있었음 (예: JS, CSS, 이미지)
- 프록시 설정에서 도메인을 잘못 입력하여 이미지 경로 오류 발생

#### 🛠️ 해결 방법
- **DuckDNS 도메인 + Certbot으로 Let’s Encrypt SSL 인증서 직접 발급**
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d your-subdomain.duckdns.org
  ```
- HTML, JS에서 모든 `http://` → `https://`로 수정
- Nginx 프록시 설정의 `proxy_pass` 도메인 주소를 **정확히 일치**시키도록 수정
  ```nginx
  proxy_pass http://localhost:3000;
  ```

---

### 🌀 2. WordCloud 라이브러리 오류 (버전 호환 문제 - 의존성은 ‘최신’보다 ‘호환 조합’이 우선)

#### ✅ 문제 상황
- WordCloud 생성 시 `ImageColor.getrgb()` 관련 `TypeError` 발생

#### 🧾 원인
- WordCloud 최신 버전(1.9 이상)과 Pillow 최신 버전 간 API 호환 문제
- WordCloud 1.9.x 이상에서 color_func 옵션에 대해 일부 내부 코드가 작동하지 않음

#### 🧪 시도한 방법 (모두 실패함)
1. `generate()` 시 직접 색상 지정
2. `color_func` 커스터마이징
3. `ImageColor.getrgb()` 직접 오버라이딩

#### 🛠️ 해결 방법
- WordCloud와 Pillow의 안정적인 조합으로 **버전 다운그레이드**
  ```bash
  pip uninstall wordcloud pillow
  pip install wordcloud==1.8.1
  pip install pillow==8.4.0
  ```

---

### 🖼️ 3. 메인 이미지가 안 보이는 문제 (정적 파일/asset 경로는 location 분리로 안정화)

#### ✅ 문제 상황
- 메인 페이지에서 상단 이미지나 섹션 이미지가 로드되지 않음

#### 🧾 원인
- Nginx 프록시 설정 시 `proxy_pass`에 잘못된 주소가 설정되어 이미지 경로 오류 발생

#### 🛠️ 해결 방법
- Nginx 설정 파일 내 proxy 대상 도메인과 포트를 정확히 지정
  ```nginx
  location /assets/ {
      proxy_pass http://localhost:3000/assets/;
  }
  ```

- 클라이언트 사이드에서의 상대 경로도 `/` 누락되지 않도록 확인

---

### ✅ 총평

- 직접 인증서를 발급받고 설정까지 하면서 HTTPS 배포 과정을 완전히 이해함
- WordCloud처럼 의존성 충돌 문제는 버전 호환성이 핵심
- 프록시 경로 문제는 자주 발생하므로 `nginx.conf` 설정 꼼꼼히 점검할 것

</details>

## 📝 회고

Nginx, DuckDNS, EC2 모두 처음 다뤄보는 툴이었지만, 배포를 성공하면서 서버에 대한 자신감이 붙었다. 특히 Nginx 설정 파일과 퍼미션 이슈 해결을 통해 실전 감각이 생겼다.

