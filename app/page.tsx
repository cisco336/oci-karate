import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Index() {
  return (
    <div className="w-full flex flex-col gap-20 items-center">Main page</div>
  );
}
