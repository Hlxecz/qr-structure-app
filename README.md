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

<details>
<summary>🚫 403 Forbidden on Nginx</summary>

### ✅ 문제 요약  
배포 후 EC2 퍼블릭 IP 또는 도메인으로 접속 시 `403 Forbidden` 에러가 발생

### 🧾 원인  
- Nginx가 제공할 디렉토리(`/var/www/html`)에 접근 권한이 없거나, index 파일이 존재하지 않을 경우

### 🛠️ 해결 방법
```bash
# 웹 루트 디렉토리에 권한 부여
sudo chown -R www-data:www-data /var/www/html
```
또는 index.html 파일이 존재하는지 확인:

```bash
ls /var/www/html
```
</details>

<details> <summary>🌐 DuckDNS 연결 안 됨</summary>

✅ 문제 요약
DuckDNS 서브도메인 주소로 접속이 되지 않음

🧾 원인
DuckDNS에 현재 내 서버의 공인 IP가 등록되지 않았음

IP 갱신 스크립트(duck.sh)가 실행되지 않거나 crontab 등록이 잘못됨

🛠️ 해결 방법

```bash

1.먼저 스크립트를 수동 실행해서 제대로 동작하는지 확인
bash ~/duckdns/duck.sh

2. DuckDNS 웹사이트에서 "Last Updated" 시간이 바뀌었는지 확인

3. crontab -e에 아래와 같은 스케줄이 들어갔는지 확인:

*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1

4. 파일 실행 권한도 확인

chmod 700 ~/duckdns/duck.sh
```
</details>

<details> <summary>🔒 SSH 접속 안 됨</summary>
✅ 문제 요약
ssh -i 명령어로 EC2에 접속할 때 Permission denied (publickey) 오류 발생

🧾 원인
.pem 키 파일의 권한이 400 이하가 아님

EC2 인스턴스의 사용자명을 잘못 입력함 (ec2-user, ubuntu 등)

퍼블릭 IP가 변경되어 이전 주소를 접속 시도함

🛠️ 해결 방법
```bash

1. 키 파일 권한 변경

chmod 400 your-key.pem

2.올바른 사용자명 사용 (Ubuntu AMI 기준)

ssh -i "your-key.pem" ubuntu@<EC2_PUBLIC_IP>

3. EC2 콘솔에서 현재 퍼블릭 IP 확인 후 갱신
</details> ```


## 📝 회고

Nginx, DuckDNS, EC2 모두 처음 다뤄보는 툴이었지만, 배포를 성공하면서 서버에 대한 자신감이 붙었다. 특히 Nginx 설정 파일과 퍼미션 이슈 해결을 통해 실전 감각이 생겼다.

