generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema"]
  binaryTargets   = ["native"]
}

datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("DATABASE_SHADOW_URL")
  // relationMode = "prisma"
  schemas           = ["auth", "public"]
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model audit_log_entries {
  instance_id String?   @db.Uuid
  id          String    @id @db.Uuid
  payload     Json?     @db.Json
  created_at  DateTime? @db.Timestamptz(6)
  ip_address  String    @default("") @db.VarChar(64)

  @@index([instance_id], map: "audit_logs_instance_id_idx")
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model flow_state {
  id                     String                @id @db.Uuid
  user_id                String?               @db.Uuid
  auth_code              String
  code_challenge_method  code_challenge_method
  code_challenge         String
  provider_type          String
  provider_access_token  String?
  provider_refresh_token String?
  created_at             DateTime?             @db.Timestamptz(6)
  updated_at             DateTime?             @db.Timestamptz(6)
  authentication_method  String

  @@index([created_at(sort: Desc)])
  @@index([auth_code], map: "idx_auth_code")
  @@index([user_id, authentication_method], map: "idx_user_id_auth_method")
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model identities {
  provider_id     String
  user_id         String    @db.Uuid
  identity_data   Json
  provider        String
  last_sign_in_at DateTime? @db.Timestamptz(6)
  created_at      DateTime? @db.Timestamptz(6)
  updated_at      DateTime? @db.Timestamptz(6)
  email           String? //@default(dbgenerated("(lower(identity_data ->> 'email'))"))
  id              String    @id @default(dbgenerated("(gen_random_uuid())")) @db.Uuid

  @@unique([provider_id, provider], map: "identities_provider_id_provider_unique")
  @@index([email])
  @@index([user_id])
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model instances {
  id              String    @id @db.Uuid
  uuid            String?   @db.Uuid
  raw_base_config String?
  created_at      DateTime? @db.Timestamptz(6)
  updated_at      DateTime? @db.Timestamptz(6)

  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model mfa_amr_claims {
  session_id            String   @db.Uuid
  created_at            DateTime @db.Timestamptz(6)
  updated_at            DateTime @db.Timestamptz(6)
  authentication_method String
  id                    String   @id(map: "amr_id_pk") @db.Uuid

  @@unique([session_id, authentication_method], map: "mfa_amr_claims_session_id_authentication_method_pkey")
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model mfa_challenges {
  id          String    @id @db.Uuid
  factor_id   String    @db.Uuid
  created_at  DateTime  @db.Timestamptz(6)
  verified_at DateTime? @db.Timestamptz(6)
  ip_address  String    @db.Inet

  @@index([created_at(sort: Desc)], map: "mfa_challenge_created_at_idx")
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model mfa_factors {
  id            String        @id @db.Uuid
  user_id       String        @db.Uuid
  friendly_name String?
  factor_type   factor_type
  status        factor_status
  created_at    DateTime      @db.Timestamptz(6)
  updated_at    DateTime      @db.Timestamptz(6)
  secret        String?

  @@index([user_id, created_at], map: "factor_id_created_at_idx")
  @@index([user_id])
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model refresh_tokens {
  instance_id String?   @db.Uuid
  id          BigInt    @id @default(autoincrement())
  token       String?   @unique(map: "refresh_tokens_token_unique") @db.VarChar(255)
  user_id     String?   @db.VarChar(255)
  revoked     Boolean?
  created_at  DateTime? @db.Timestamptz(6)
  updated_at  DateTime? @db.Timestamptz(6)
  parent      String?   @db.VarChar(255)
  session_id  String?   @db.Uuid

  @@index([instance_id])
  @@index([instance_id, user_id])
  @@index([parent])
  @@index([session_id, revoked])
  @@index([updated_at(sort: Desc)])
  @@schema("auth")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model saml_providers {
  id                String    @id @db.Uuid
  sso_provider_id   String    @db.Uuid
  entity_id         String    @unique
  metadata_xml      String
  metadata_url      String?
  attribute_mapping Json?
  created_at        DateTime? @db.Timestamptz(6)
  updated_at        DateTime? @db.Timestamptz(6)

  @@index([sso_provider_id])
  @@schema("auth")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model saml_relay_states {
  id              String    @id @db.Uuid
  sso_provider_id String    @db.Uuid
  request_id      String
  for_email       String?
  redirect_to     String?
  from_ip_address String?   @db.Inet
  created_at      DateTime? @db.Timestamptz(6)
  updated_at      DateTime? @db.Timestamptz(6)
  flow_state_id   String?   @db.Uuid

  @@index([created_at(sort: Desc)])
  @@index([for_email])
  @@index([sso_provider_id])
  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model schema_migrations {
  version String @id @db.VarChar(255)

  @@schema("auth")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model sessions {
  id           String     @id @db.Uuid
  user_id      String     @db.Uuid
  created_at   DateTime?  @db.Timestamptz(6)
  updated_at   DateTime?  @db.Timestamptz(6)
  factor_id    String?    @db.Uuid
  aal          aal_level?
  not_after    DateTime?  @db.Timestamptz(6)
  refreshed_at DateTime?  @db.Timestamp(6)
  user_agent   String?
  ip           String?    @db.Inet
  tag          String?

  @@index([not_after(sort: Desc)])
  @@index([user_id])
  @@index([user_id, created_at], map: "user_id_created_at_idx")
  @@schema("auth")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
/// This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.
model sso_domains {
  id              String    @id @db.Uuid
  sso_provider_id String    @db.Uuid
  domain          String
  created_at      DateTime? @db.Timestamptz(6)
  updated_at      DateTime? @db.Timestamptz(6)

  @@index([sso_provider_id])
  @@schema("auth")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
/// This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.
model sso_providers {
  id          String    @id @db.Uuid
  resource_id String?
  created_at  DateTime? @db.Timestamptz(6)
  updated_at  DateTime? @db.Timestamptz(6)

  @@schema("auth")
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
/// This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.
model users {
  instance_id                 String?   @db.Uuid
  id                          String    @id @db.Uuid
  aud                         String?   @db.VarChar(255)
  role                        String?   @db.VarChar(255)
  email                       String?   @db.VarChar(255)
  encrypted_password          String?   @db.VarChar(255)
  email_confirmed_at          DateTime? @db.Timestamptz(6)
  invited_at                  DateTime? @db.Timestamptz(6)
  confirmation_token          String?   @db.VarChar(255)
  confirmation_sent_at        DateTime? @db.Timestamptz(6)
  recovery_token              String?   @db.VarChar(255)
  recovery_sent_at            DateTime? @db.Timestamptz(6)
  email_change_token_new      String?   @db.VarChar(255)
  email_change                String?   @db.VarChar(255)
  email_change_sent_at        DateTime? @db.Timestamptz(6)
  last_sign_in_at             DateTime? @db.Timestamptz(6)
  raw_app_meta_data           Json?
  raw_user_meta_data          Json?
  is_super_admin              Boolean?
  created_at                  DateTime? @db.Timestamptz(6)
  updated_at                  DateTime? @db.Timestamptz(6)
  phone                       String?   @unique
  phone_confirmed_at          DateTime? @db.Timestamptz(6)
  phone_change                String?   @default("")
  phone_change_token          String?   @default("") @db.VarChar(255)
  phone_change_sent_at        DateTime? @db.Timestamptz(6)
  confirmed_at                DateTime? @db.Timestamptz(6)
  email_change_token_current  String?   @default("") @db.VarChar(255)
  email_change_confirm_status Int?      @default(0) @db.SmallInt
  banned_until                DateTime? @db.Timestamptz(6)
  reauthentication_token      String?   @default("") @db.VarChar(255)
  reauthentication_sent_at    DateTime? @db.Timestamptz(6)
  is_sso_user                 Boolean   @default(false)
  deleted_at                  DateTime? @db.Timestamptz(6)
  UserData                    UserData?

  @@index([instance_id])
  @@schema("auth")
}

enum aal_level {
  aal1
  aal2
  aal3

  @@schema("auth")
}

enum code_challenge_method {
  s256
  plain

  @@schema("auth")
}

enum factor_status {
  unverified
  verified

  @@schema("auth")
}

enum factor_type {
  totp
  webauthn

  @@schema("auth")
}

enum Role {
  ADMIN
  SENSEI
  PARENT
  STUDENT
  PARENT_AND_STUDENT

  @@schema("public")
}

enum BeltColors {
  BLANCO
  AMARILLO
  NARANJA
  AZUL
  VERDE
  VIOLETA
  MARRON
  NEGRO

  @@schema("public")
}

enum kyuDan {
  NOVENO
  OCTAVO
  SEPTIMO
  SEXTO
  QUINTO
  CUARTO
  TERCER
  SEGUNDO
  PRIMERO
  NA

  @@schema("public")
}

model UserData {
  id          Int          @id @default(autoincrement())
  bio         String?
  userId      String       @unique @db.Uuid
  user        users        @relation(fields: [userId], references: [id])
  birthDate   DateTime?
  firstName   String
  lastName    String
  phone       String
  belt        BeltColors?
  degree      String[]
  children    String[]
  medicalData String[]
  agreedTerms Boolean
  setPasswd   Boolean
  isChild     Boolean
  parents     String[]
  kyu         kyuDan       @default(value: NOVENO)
  dan         kyuDan       @default(value: NA)
  role        Role         @default(value: STUDENT)
  MedicalData MedicalData?

  @@schema("public")
}

model MedicalData {
  id                    Int      @id @default(autoincrement())
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  userId                String   @unique @db.Uuid
  blodType              String
  eps                   String
  prepaidMedicine       String
  specialCondition      String
  emergencyContactName  String
  emergencyContactPhone String
  user                  UserData @relation(fields: [userId], references: [userId])

  @@schema("public")
}
