import {
  Download,
  CalendarDays,
  Heart,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import TitlePage from "@/components/ui/title-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { familyMembers } from "@/lib/mockdata";
import GridCard from "@/components/profile/GridCard";


const Profile = () => {
  const personalInfo = {
    id: 1,
    firstname: "Juan",
    lastname: "Dela Cruz",
    email: "jaun@gmail.com",
    mobile: "09999999999",
    role: "Customer",
    totalTransaction: 10,
    totalPending: 1,
    totalCompleted: 9,
  };

  const totalCount = [
    {
      label: "Total Transactions",
      value: "10",
      Icon: <CalendarDays className="w-5 h-5 mb-1" />,
    },
    {
      label: "Pendings",
      value: "10",
      Icon: <CalendarDays className="w-5 h-5 mb-1" />,
    },
    {
      label: "Completed",
      value: "10",
      Icon: <CalendarDays className="w-5 h-5 mb-1" />,
    },
    {
      label: "Total Family Members",
      value: "10",
      Icon: <CalendarDays className="w-5 h-5 mb-1" />,
    },
  ];
 
  return (
    <div className="max-w-6xl w-full mx-auto text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-5">
        <div>
          <TitlePage
            label="Profile"
            description="Manage your Personal Informations"
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-xl shadow-sky-500/20">
            <Download className="w-4 h-4" />
            Download Info
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-6 mb-5">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
          <AvatarFallback>Image</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{`${personalInfo?.firstname} ${personalInfo?.lastname}`}</h3>
            <div className="h-1 w-14 rounded-full bg-sky-500 shadow-2xl shadow-sky-500">
              {""}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 my-5">
            <GridCard key={1} title="Customer" label="Role" />
            <GridCard
              key={1}
              title={personalInfo?.mobile}
              label="Phone Number"
            />
            <GridCard key={1} title={personalInfo?.email} label="Email" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {totalCount?.map(({ Icon, label, value }, index) => (
          <div
            key={index}
            className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl  overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-gray-800/10 p-5 flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
              {Icon}
            </div>
            <div className="flex flex-col">
              <p className=" font-semibold text-xl">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* family member */}
      <div className="w-full mt-7">
        <h1 className="text-xl font-medium text-white">Family Member</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl pt-0 overflow-hidden pb-6 border border-gray-700/30 shadow-xl shadow-black/10"
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {member.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-gray-400">
                            {member.relation}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-sky-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Mail className="w-4 h-4 text-sky-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4 text-sky-400" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
