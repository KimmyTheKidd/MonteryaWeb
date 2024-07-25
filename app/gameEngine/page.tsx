"use client";
import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { UserAuth } from "@/config/AuthContext";
import { useRouter , usePathname } from "next/navigation";
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const unityContextLocation = "Unity-WebGl-Build/Build";

export default function Game() {
  const { user, currentuser, SetGameState } = UserAuth();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const {
    unityProvider,
    sendMessage,
    loadingProgression,
    isLoaded,
    requestFullscreen,
    unload,
  } = useUnityContext({
    loaderUrl: `${unityContextLocation}/Monterya_WebBuild.loader.js`,
    dataUrl: `${unityContextLocation}/Monterya_WebBuild.data`,
    frameworkUrl: `${unityContextLocation}/Monterya_WebBuild.framework.js`,
    codeUrl: `${unityContextLocation}/Monterya_WebBuild.wasm`,
  });
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const usePathName = usePathname();

  useEffect(() => {
    if (user || currentuser) {
      setIsLoading(false);
    } else {
      Router.push("/login");
    }
  }, [user, currentuser]);

  useEffect(() => {
    SetGameState(true);

    if (isLoaded && user && currentuser) {
      sendMessage("#ClientService", "SetUserId", currentuser.userId);
      setIsLoading(false); // Set loading to false when game is fully loaded
    }
  }, [isLoaded, sendMessage, currentuser, SetGameState]);

  useEffect(() => {
    const handleClickInside = (event: MouseEvent) => {
      event.stopPropagation();
      if (isLoaded && user && currentuser) {
        sendMessage("FirebaseCtrl", "GainFocus");
      }
    };

    const gameContainer = gameContainerRef.current;
    if (gameContainer) {
      gameContainer.addEventListener("click", handleClickInside);
    }

    return () => {
      if (gameContainer) {
        gameContainer.removeEventListener("click", handleClickInside);
      }
    };
  }, [isLoaded, user, currentuser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLoaded &&
        user &&
        currentuser &&
        gameContainerRef.current &&
        !gameContainerRef.current.contains(event.target as Node)
      ) {
        sendMessage("FirebaseCtrl", "LoseFocus");

        const unityCanvas = document.getElementById(
          "unityCanvas"
        ) as HTMLCanvasElement;
        if (unityCanvas) {
          unityCanvas.blur();
          document.body.focus();
        } else {
          console.warn("Unity canvas not found");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoaded, user, currentuser]);

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      await handleClickBack();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  async function handleClickBack() {
    await unload();
    Router.push("/");
  }

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }

  if (!user || !currentuser) {
    return <section
    id="home"
    className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex flex-col items-center justify-center text-center"
    style={{
      backgroundImage: "url('/kingforge.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      minHeight: "980px",
    }}
  >
    {/* <p className="text-white">Loading Game...</p> */}
  </section>
  }

  if (isLoading) {
    return <p className="text-white">Loading Game...</p>
  }

  const reloadPage = ()=>{
    window.location.href = usePathName;
  }

  return (
<section
  id="home"
  className="relative z-10 overflow-hidden bg-white sm:pb-[60px] sm:pt-[80px] md:pb-[100px] md:pt-[120px] lg:pb-[120px] lg:pt-[140px] xl:pb-[140px] xl:pt-[160px] 2xl:pb-[85px] 2xl:pt-[85px] bg-cover bg-center flex flex-col items-center justify-center text-center"
  style={{
    backgroundImage: "url('/rabbit_nobg.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "90vh",
  }}
>
  <div className="relative flex flex-col items-center justify-center h-full w-full">
    {!isLoaded && (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center mb-4">
          <img
            src="/MT_icon.png"
            alt="Loading Icon"
            className="w-16 h-16 animate-flip"
          />
          <style jsx>{`
            @keyframes flip {
              0% { transform: rotateY(0deg); }
              100% { transform: rotateY(360deg); }
            }
            .animate-flip {
              animation: flip 2s infinite linear;
            }
          `}</style>
        </div>
        <div className="w-64 h-2 bg-gray-300 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${Math.round(loadingProgression * 100)}%` }}
          />
        </div>
        <p className="text-white text-lg md:text-2xl font-semibold mt-4">
          Loading Application... {Math.round(loadingProgression * 100)}%
        </p>
      </div>
    )}
    <div
      ref={gameContainerRef}
      className="flex items-center justify-center mt-10"
      style={{ width: "1280px", height: "720px" }}
    >
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%" }}
        tabIndex={1}
      />
    </div>
    <div className="flex items-center space-x-4 mt-4">
      <Button
        onClick={handleClickEnterFullscreen}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enter Fullscreen
      </Button>

      <Tooltip
        content={
          <>
            Server Status: If the server status is red, please reload the page
            or click here.
          </>
        }
        color="danger" // Use "error" for warning style
        placement="top"
      >
        <div className="flex items-center" onClick={reloadPage}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-red-600 cursor-pointer"
            size="lg" // Adjust size as needed
          />
        </div>
      </Tooltip>
    </div>
  </div>
</section>




  );
}

