import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { UserAuth } from "@/config/AuthContext";
import { showSuccessToast } from "../toast/CustomToast";
import { useRouter } from "next/navigation";

export default function UserDropDown() {
  const { user, logOut, currentuser , isGameOpen} = UserAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if both user and currentuser are defined
    if (user && currentuser) {
      setIsLoading(false);
    }
  }, [user, currentuser]);

  const TriggerLogout = async () => {
    logOut();
    showSuccessToast("You are Logged out!");
    router.push("/");
  };

  // Render loading state while data is loading
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  const handleNavigation = async (path: string) =>{
    if (isGameOpen) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.photoURL ? user.photoURL : null,
            }}
            className="transition-transform"
            name={currentuser.username ? currentuser.username : currentuser.email}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={() => handleNavigation("/userSetting")}>My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={TriggerLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
