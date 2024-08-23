import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { UserAuth } from "@/config/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUser,
  setDisplayName,
  setUserName,
} from "./profile-sever-action/profileCRUD";
import { showFailedToast, showSuccessToast } from "../toast/CustomToast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailVerification } from "../authentication/auth-server-action/signup";

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const schema = z.object({
  displayName: z.string().nonempty("Display Name is required"),
  username: z.string().optional(),
});

interface UserData {
  displayName: string;
  emailVerified: string;
  username: string;
  // Add other fields as necessary
}

const UserSettingCard: React.FC = () => {
  const { user, currentuser } = UserAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await fetchUser(user.uid);

        if (result == null) {
          setFetchedUser(null);
        } else {
          setFetchedUser(result);
          reset({
            displayName: result.displayName || "",
            username: result.username || "",
          });
        }
        setLoadingUser(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user && loadingUser) {
      getUser();
    }
  }, [user, loadingUser, reset]);

  if (!user || !currentuser) {
    return null;
  }

  if (loadingUser) {
    return <div>Loading...</div>; // Optional: you can replace this with a loader component
  }

  const SendEmailVarification = async () => {
    showFailedToast("Available next patch");
  };

  const SendResetEmail = async () => {
    showFailedToast("Available next patch");
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (values.displayName !== currentuser.displayName) {
        let result = await setDisplayName(user.uid, values.displayName);
        if (result) {
          showSuccessToast("Display Name Updated Successfully");
        } else {
          showFailedToast("Display Name Update Failed");
        }
      }
    } catch (error) {
      console.error("Error updating display name:", error);
      showFailedToast("Error updating display name");
    }

    try {
      if (fetchedUser?.username) {
        return;
      }
      if (!fetchedUser?.username && values.username) {
        let result = await setUserName(user.uid, values.username);
        if (result) {
          showSuccessToast("Username Updated Successfully");
        } else {
          showFailedToast("Username Update Failed");
        }
      } else if (fetchedUser?.username) {
        showFailedToast("Username can only be set once");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      showFailedToast("Error updating username");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl rounded-lg overflow-hidden p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs aria-label="User Settings">
          {/* User Settings Tab */}
          <Tab
            key="user-settings"
            title="User Settings"
            className="py-3 text-sm font-medium text-gray-700 border-b-2 border-transparent"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={tabVariants}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-[350px]">
                <CardBody className="space-y-4 h-full">
                  <h2 className="text-xl font-semibold mb-4">User Settings</h2>
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="relative">
                      <Input
                        {...register("displayName")}
                        label="Display Name"
                        placeholder="Enter your username"
                        defaultValue={fetchedUser?.displayName || ""}
                        endContent={
                          <Tooltip
                            content={
                              <>
                                You can always change your{" "}
                                <strong>Display Name</strong>{" "}
                              </>
                            }
                            color="warning"
                            className="capitalize"
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="text-warning-600 cursor-pointer"
                            />
                          </Tooltip>
                        }
                      />
                      {errors.displayName && (
                        <span className="text-red-500">
                          {errors.displayName.message}
                        </span>
                      )}
                    </div>

                    <div className="relative mt-4">
                      <Input
                        {...register("username")}
                        label="UserName"
                        placeholder="Enter your UserName"
                        defaultValue={fetchedUser?.username || ""}
                        disabled={Boolean(fetchedUser?.username)}
                        endContent={
                          <Tooltip
                            content={
                              <>
                                You can only change your{" "}
                                <strong>UserName once. </strong>
                              </>
                            }
                            color="warning"
                            className="capitalize"
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="text-warning-600 cursor-pointer"
                            />
                          </Tooltip>
                        }
                      />
                    </div>

                    <div className="relative mt-4">
                      <Input
                        label="User ID"
                        placeholder="Your User ID"
                        disabled
                        value={currentuser.userId || ""}
                      />
                    </div>

                    <Button type="submit" color="primary" className="mt-4">
                      Save Changes
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </motion.div>
          </Tab>

          {/* Email Settings Tab */}
          <Tab
            key="email-settings"
            title="Email Settings"
            className="py-3 text-sm font-medium text-gray-700 border-b-2 border-transparent"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={tabVariants}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-[350px]">
                <CardBody className="space-y-4 h-full">
                  <Input
                    label="Email"
                    placeholder="Your User ID"
                    disabled
                    value={currentuser.email}
                  />
                  <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
                  <p>
                    Email is :
                    {!currentuser.emailVerified ? (
                      <span className="font-bold text-red-600">
                        {" "}
                        Is Not Verified
                      </span>
                    ) : (
                      <span className="font-bold text-green-600">Verified</span>
                    )}
                  </p>
                  <Button
                    color="primary"
                    className="mt-4"
                    onClick={SendEmailVarification}
                  >
                    Resend Verification Email
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </Tab>

          {/* Change Password Tab */}
          <Tab
            key="change-password"
            title="Change Password"
            className="py-3 text-sm font-medium text-gray-700 border-b-2 border-transparent"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={tabVariants}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-[350px]">
                <CardBody className="space-y-4 h-full">
                  <h2 className="text-xl font-semibold mb-4">
                    Change Password
                  </h2>
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter your current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter your new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm your new password"
                  />
                  <Button color="primary" className="mt-4">
                    Update Password
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </Tab>

          {/* Support Tab */}
          <Tab
            key="support"
            title="Support"
            className="py-3 text-sm font-medium text-gray-700 border-b-2 border-transparent"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={tabVariants}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-[350px]">
                <CardBody className="space-y-4 h-full">
                  <h2 className="text-xl font-semibold mb-4">Support</h2>
                  <p>
                    For any issues or questions, please contact our support
                    team. You can reach us at support@example.com or use the
                    form below.
                  </p>
                  <Input
                    label="Issue Description"
                    placeholder="Describe your issue"
                  />
                  <Button color="primary" className="mt-4">
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </Tab>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default UserSettingCard;
