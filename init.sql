-- PostgreSQL 초기화 스크립트
-- 사용자와 데이터베이스는 환경변수로 자동 생성됨

-- 필요한 권한 부여
GRANT ALL PRIVILEGES ON DATABASE phum TO phumuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO phumuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO phumuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO phumuser;
