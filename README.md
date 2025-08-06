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
