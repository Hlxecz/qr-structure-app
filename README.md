# 🌐 Grayscale Web Project

부트스트랩 기반의 반응형 웹사이트 프로젝트입니다. AWS EC2 서버에 Nginx를 이용해 배포하였으며 DuckDNS를 통해 도메인 연결까지 완료했습니다.

## 🛠️ 기술 스택

- HTML5, CSS3
- Bootstrap 5.2.3
- JavaScript
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

👉 [http://your-subdomain.duckdns.org](https://architen.netlify.app/)

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
## 🐞 오류 정리 (토글 형식)
<details> <summary>🚫 403 Forbidden on Nginx</summary>
원인: 디렉토리 권한 문제
    
해결 
```bash
sudo chown -R www-data:www-data /var/www/html
```
</details> <details> <summary>🌐 DuckDNS 연결 안 됨</summary>
원인: 크론탭에 경로 잘못 입력 or 스크립트 오류
해결:

duck.sh 스크립트 직접 실행해보고 IP가 갱신되는지 확인

crontab -e에서 정확한 경로 입력

</details> <details> <summary>🔒 SSH 접속 안 됨</summary>
원인: 권한 또는 사용자 설정 오류
해결:

```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@EC2-PUBLIC-IP
```

📝 회고
Nginx, DuckDNS, EC2 모두 처음 다뤄보는 툴이었지만, 배포를 성공하면서 서버에 대한 자신감이 붙었다. 특히 Nginx 설정 파일과 퍼미션 이슈 해결을 통해 실전 감각이 생겼다.

