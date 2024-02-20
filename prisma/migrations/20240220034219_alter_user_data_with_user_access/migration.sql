-- DropForeignKey
ALTER TABLE "public"."UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "public"."UserData" ENABLE ROW LEVEL SECURITY;
CREATE Policy "individual_authorized_user_data_access"
    on "UserData" for select
    using (auth.uid() = "userId");
-- This Policy added will allow only users to access their own data
-- if the user has the correct auth id that matches the user_id of that row.
