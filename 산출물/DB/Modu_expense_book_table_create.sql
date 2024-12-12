DROP TABLE IF EXISTS `common`;

CREATE TABLE `common` (
	`com_code`	VARCHAR(30)	NOT NULL	COMMENT '공통코드아이디',
	`com_name`	VARCHAR(1000)	NOT NULL	COMMENT '공통코드명',
	`use_yn`	VARCHAR(3)	NOT NULL	DEFAULT Y	COMMENT '공통코드사용여부',
	`insrt_date`	DATE	NOT NULL	COMMENT '공통코드 등록일자',
	`updt_date`	DATE	NOT NULL	COMMENT '공통코드 수정일자'
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`user_id`	VARCHAR(300)	NOT NULL	COMMENT '회원아이디',
	`password`	VARCHAR(500)	NOT NULL	COMMENT '비밀번호',
	`nickname`	VARCHAR(1000)	NOT NULL	DEFAULT 홍길동	COMMENT '별명',
	`birthday`	DATE	NULL	COMMENT '생년월일',
	`email`	VARCHAR(1000)	NOT NULL	COMMENT '이메일',
	`insrt_date`	DATE	NOT NULL	COMMENT '등록일자',
	`use_yn`	VARCHAR(3)	NOT NULL	DEFAULT Y	COMMENT '사용여부',
	`FILE_ID`	VARCHAR(50)	NOT NULL	COMMENT '파일아이디'
);

DROP TABLE IF EXISTS `FILE`;

CREATE TABLE `FILE` (
	`FILE_ID`	VARCHAR(50)	NOT NULL	COMMENT '파일아이디',
	`FILE_NAME`	VARCHAR(1000)	NOT NULL	COMMENT '파일명',
	`CLOUD_FILE_ID`	VARCHAR(1000)	NOT NULL	COMMENT 'CLOUDFARE_R2_KEY',
	`FILE_SIZE`	NUMBER	NOT NULL	COMMENT '파일사이즈',
	`FILE_TYPE`	VARCHAR(50)	NOT NULL	COMMENT '파일타입( ex. 프로필사진, 게시판)',
	`UPLOAD_DATE`	DATE	NOT NULL	COMMENT '업로드일자',
	`RELATED_ID`	VARCHAR(300)	NULL	COMMENT '관련아이디(ex. 회원ID, 게시판ID)'
);

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
	`ctgry_id`	VARCHAR(100)	NOT NULL	COMMENT '카테고리아이디',
	`ctgry_nm`	VARCHAR(1000)	NOT NULL	COMMENT '카테고리명',
	`ctgry_des`	VARCHAR(1000)	NOT NULL	COMMENT '카테고리설명',
	`up_ctgry_id`	VARCHAR(100)	NULL	COMMENT '부모카테고리아이디'
);

DROP TABLE IF EXISTS `expense`;

CREATE TABLE `expense` (
	`eps_id`	VARCHAR(3000)	NOT NULL	COMMENT '지출아이디',
	`user_id`	VARCHAR(300)	NOT NULL	COMMENT '회원아이디',
	`ctgry_id`	VARCHAR(100)	NOT NULL	COMMENT '카테고리아이디',
	`eps_date`	DATE	NOT NULL	COMMENT '지출일자',
	`eps_amount`	NUMBER	NOT NULL	COMMENT '지출금액',
	`eps_des`	VARCHAR(3000)	NULL	COMMENT '지출설명',
	`fix_dps_yn`	VARCHAR(3)	NOT NULL	DEFAULT N	COMMENT '고정지출여부',
	`strt_date`	DATE	NULL	COMMENT '시작날짜(고정지출만 해당)',
	`frequency`	NUMBER	NULL	COMMENT '고정지출주기',
	`last_updt_date`	DATE	NULL	COMMENT '고정지출수정일자'
);

DROP TABLE IF EXISTS `goal`;

CREATE TABLE `goal` (
	`goal_id`	VARCHAR(50)	NOT NULL	COMMENT '목표아이디',
	`user_id`	VARCHAR(300)	NOT NULL	COMMENT '회원아이디',
	`saving_id`	VARCHAR(50)	NOT NULL	COMMENT '저축아이디',
	`goal_name`	VARCHAR(1000)	NOT NULL	COMMENT '목표명',
	`goal_type`	VARCHAR(1000)	NOT NULL	COMMENT '목표유형 (월/사용자정의)',
	`goal_amout`	NUMBER	NOT NULL	DEFAULT 0	COMMENT '목표를이루기위한금액',
	`goal_st_date`	DATE	NOT NULL	COMMENT '목표시작일자',
	`goal_ed_date`	DATE	NULL	COMMENT '목표달성일자'
);

DROP TABLE IF EXISTS `sso_info`;

CREATE TABLE `sso_info` (
	`prov_id`	VARCHAR(100)	NOT NULL	COMMENT '소셜로그인아이디',
	`user_id`	VARCHAR(300)	NOT NULL	COMMENT '회원아이디',
	`prov`	VARCHAR(30)	NOT NULL	COMMENT '소셜구분(Kakao, Naver, Google)'
);

DROP TABLE IF EXISTS `saving`;

CREATE TABLE `saving` (
	`saving_id`	VARCHAR(50)	NOT NULL	COMMENT '저축아이디',
	`user_id`	VARCHAR(300)	NOT NULL	COMMENT '회원아이디',
	`saving_name`	VARCHAR(1000)	NOT NULL	COMMENT '저축명',
	`current_amount`	NUMBER	NOT NULL	DEFAULT 0	COMMENT '현재저축금액',
	`monthly_amount`	NUMBER	NOT NULL	DEFAULT 0	COMMENT '월 저축 금액',
	`saving_st_date`	DATE	NOT NULL	COMMENT '저축시작일자',
	`saving_ed_date`	DATE	NOT NULL	COMMENT '저축종료일자',
	`saving_ud_date`	DATE	NOT NULL	COMMENT '저축갱신일자'
);

ALTER TABLE `common` ADD CONSTRAINT `PK_COMMON` PRIMARY KEY (
	`com_code`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `FILE` ADD CONSTRAINT `PK_FILE` PRIMARY KEY (
	`FILE_ID`
);

ALTER TABLE `category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`ctgry_id`
);

ALTER TABLE `expense` ADD CONSTRAINT `PK_EXPENSE` PRIMARY KEY (
	`eps_id`,
	`user_id`,
	`ctgry_id`
);

ALTER TABLE `goal` ADD CONSTRAINT `PK_GOAL` PRIMARY KEY (
	`goal_id`,
	`user_id`,
	`saving_id`
);

ALTER TABLE `sso_info` ADD CONSTRAINT `PK_SSO_INFO` PRIMARY KEY (
	`prov_id`,
	`user_id`
);

ALTER TABLE `saving` ADD CONSTRAINT `PK_SAVING` PRIMARY KEY (
	`saving_id`,
	`user_id`
);

ALTER TABLE `user` ADD CONSTRAINT `FK_FILE_TO_user_1` FOREIGN KEY (
	`FILE_ID`
)
REFERENCES `FILE` (
	`FILE_ID`
);

ALTER TABLE `expense` ADD CONSTRAINT `FK_user_TO_expense_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `expense` ADD CONSTRAINT `FK_category_TO_expense_1` FOREIGN KEY (
	`ctgry_id`
)
REFERENCES `category` (
	`ctgry_id`
);

ALTER TABLE `goal` ADD CONSTRAINT `FK_saving_TO_goal_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `saving` (
	`user_id`
);

ALTER TABLE `goal` ADD CONSTRAINT `FK_saving_TO_goal_2` FOREIGN KEY (
	`saving_id`
)
REFERENCES `saving` (
	`saving_id`
);

ALTER TABLE `sso_info` ADD CONSTRAINT `FK_user_TO_sso_info_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `saving` ADD CONSTRAINT `FK_user_TO_saving_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

