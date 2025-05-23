import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from '@nextui-org/react';
import { UserAuth } from '@/config/AuthContext';
import { showSuccessToast } from '../toast/CustomToast';
import { useRouter } from 'next/navigation';

export default function UserDropDown() {
  const { user, logOut, currentuser, isGameOpen } = UserAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if both user and currentuser are defined
    if (user && currentuser) {
      setIsLoading(false);
    }

    // Check screen width to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // 640px is the breakpoint for 'sm' in Tailwind
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, [user, currentuser]);

  const TriggerLogout = async () => {
    logOut();
    showSuccessToast('You are Logged out!');
    router.push('/');
  };

  const handleNavigation = async (path: string) => {
    if (typeof window !== 'undefined' && isGameOpen) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  if (isLoading) {
    // Skeleton Loader
    return (
      <div className="flex items-center gap-4">
        <div className="animate-pulse flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-4 w-16 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          {/* Conditionally render based on screen size */}
          {isMobile ? (
            <Avatar
              isBordered
              as="button"
              src={user.photoURL ? user.photoURL : null}
              className="transition-transform"
            />
          ) : (
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user.photoURL ? user.photoURL : null,
              }}
              className="transition-transform text-slate-900"
              name={
                currentuser.username ? currentuser.username : currentuser.email
              }
            />
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          className="text-black"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold text-black">{user.email}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            onClick={() => handleNavigation('/userSetting')}
            className="text-black"
          >
            My Settings
          </DropdownItem>
          <DropdownItem key="help_and_feedback" className="text-black">
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={TriggerLogout}
            className="text-black"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}