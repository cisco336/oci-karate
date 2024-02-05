import React from "react";
import AuthButton from "./AuthButton";
import DeployButton from "./DeployButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Nav = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex gap-2 justify-start items-center">
          <Link
            href={"/"}
            className="border border-foreground/20 py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover h-full"
          >
            <FontAwesomeIcon icon={icons.faHomeAlt} />
          </Link>
          {user && (
            <Link
              href={"/dashboard"}
              className="border border-foreground/20 py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              <FontAwesomeIcon icon={icons.faDashboard} />
            </Link>
          )}
        </div>
        {/* <DeployButton /> */}
        <AuthButton />
      </div>
    </nav>
  );
};

export default Nav;
