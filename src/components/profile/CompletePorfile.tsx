import  { useState } from "react";
import { X, Check, X as XIcon, User } from "lucide-react";
import PersonalInfo from "./PersonalInfo";


const CompleteTaskModal = () => {
const [completeProfileModal, setCompleteProfileModal] = useState<boolean>(true);
const [isOpenPersonalInfo, setIsOpenPersonalInfo] = useState<boolean>(false);
 
  const calculatedProgress = 50

  if (!completeProfileModal) {
    return null;
  }

  const profileRequiremennt = [
    {
      title: "Complete Personal Information",
      description: "First name, Last name , email, address etc.",
      isComplete: true,
    },
    {
      title: "Upload Verification Documents",
      description: "ID Card, Passport, or Driver's License.",
      isComplete: false
    }
  ]
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/60 backdrop-blur-sm z-50 p-1">
        <div className="w-full max-w-lg  mt-5 md:h-auto overflow-y-auto rounded-3xl bg-[#121212] text-gray-100 shadow-2xl py-4">
          <div className="flex items-center justify-between border-b border-gray-800 p-5">
            <div>
              <h2 className="text-xl font-bold text-white">
                Complete Your Profile
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Enhance your Booking experience and security
              </p>
            </div>
            <button
              onClick={() => setCompleteProfileModal(false)}
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-5">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">
                  Profile completion
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-sky-400">
                    {calculatedProgress}%
                  </span>
                  <span className="text-xs font-medium text-gray-500 ml-1">
                    ({50}/{100})
                  </span>
                </div>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500 ease-out"
                  style={{ width: `${calculatedProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] pr-1 ">
              {profileRequiremennt.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl border-b  hover:border-primary ${
                    true
                      ? "border-gray-700/30 bg-gray-700/10"
                      : "border-sky-700/30 bg-sky-700/5"
                  } p-4 transition-colors `}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                        true ? "bg-gray-800" : "bg-sky-500/10"
                      }`}
                    >
                      {<User />}
                    </div>
                    <div>
                      <span className="text-sm font-medium block">
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                      item.isComplete
                        ? "bg-green-500/20 text-green-400"
                        : "bg-sky-500/10 text-sky-500"
                    }`}
                  >
                    {item.isComplete ? (
                      <Check size={16} />
                    ) : (
                      <XIcon size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 p-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCompleteProfileModal(false)}
                className="flex-1 rounded-full bg-transparent border border-gray-700 py-2.5 font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Skip for Now
              </button>
              <button
                onClick={() => setIsOpenPersonalInfo(true)}
                className="flex-1 rounded-full bg-sky-500 py-2.5 font-medium text-gray-900 transition-colors hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Continue Setup
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">
              Complete your profile to unlock all P2P trading features and
              higher limits
            </p>
          </div>
        </div>

        {isOpenPersonalInfo && (
          <PersonalInfo
            open={isOpenPersonalInfo}
            setOpen={setIsOpenPersonalInfo}
          />
        )}
      </div>
    );
};

export default CompleteTaskModal;




