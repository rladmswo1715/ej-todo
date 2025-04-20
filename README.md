# EJ-Todo
##### 할 일을 등록/수정/삭제하고, 완료 여부를 토글하며, 리스트를 드래그 앤 드롭으로 자유롭게 변경할 수 있는 할 일 관리 페이지입니다.
![Image](https://github.com/user-attachments/assets/91cbb2cb-e5ed-4736-8501-49d41ca60e89)
---


- ### 기술 스택
> Backend
  - Spring Boot
  - Maven
  - JPA
  - MySql   

  <br/> 

> Frontend
  - React + Vite
  - TypeScript
  - Tailwind CSS
  - Ant Design
  - React-Query
  - Dnd kit
 
- ### 소스 빌드 및 실행 방법 메뉴얼
> Backend
  1. MySql 실행 후 sql 실행
  ```
  CREATE DATABASE ej_todo;
  ```
  2. application.properties의 DB 설정
```
spring.datasource.username=root
spring.datasource.password=비밀번호 입력     ← 비밀번호 수정
```
  3. 백엔드 실행
  ```
  cd backend
  ./mvnw spring-boot:run
  ```

- swagger : <a href=" http://localhost:8080/swagger-ui.html " target="_blank">http://localhost:8080/swagger-ui.html </a>


  
  <br/> 
  
> Frontend
  1. 프론트엔드 실행
  ```
  cd frontend
  npm install
  npm run dev
  ```

- ### 주요 컴포넌트 / 라이브러리
> Backend
  - JPA: SQL 없이도 CRUD 처리 및 유지보수 쉬움
  - Swagger (SpringDoc): 작성된 API를 자동으로 문서화 및 브라우저에서 테스트 가능
  - JUnit: 비즈니스 로직에 대한 테스트를 작성하여 코드 안정성 확보  

  <br/> 

> Frontend
  - Ant Design: 기본 UI 요소를 빠르게 구현 가능
  - React-Query: 서버 상태 캐싱 및 자동 리페칭 및 서버 데이터 상태 간편하게 처리
  - DnD Kit: 할 일 리스트를 드래그 앤 드롭으로 조작 가능하도록 하기 위해 사용
