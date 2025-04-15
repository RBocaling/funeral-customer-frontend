import React, { useState } from "react";
import {
  User,
  Wallet,
  Building,
  ShieldCheck,
  BarChart3,
  Clock,
  Mail,
  Smartphone,
  Upload,
} from "lucide-react";
import { useAuthStore } from "@/store";
import ProfileCard from "./ProfileCard";
import StatsGrid from "./StatsGrid";
import ConnectedAccounts from "./ConnectedAccount";
import VerificationStatus from "./VerificationStatus";
import TransactionHistory from "./TransactionHistory";
import PaymentMethod from "./PaymentMethod";
import useUser from "@/hooks/useUser";
import useBuySell from "@/hooks/useBuySell";
import usePaymentMethods from "@/hooks/usePaymentMethod";
import Loading from "../loading";
import { format } from "date-fns";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { isCompleteProfileModalOpen: isOpen, setCompleteProfileModal } =
    useAuthStore();
  const { data: userInfo, isLoading } = useUser();
  const { data: order, isLoading: orderLoading } = useBuySell();
  const { wallet, bank, isLoading: paymentLoading } = usePaymentMethods();
  if (isLoading || orderLoading || paymentLoading)
    return <Loading isDark={true} />;

  // User data
  const user = {
    name: `${userInfo?.first_name} ${userInfo?.last_name}`,
    email: userInfo?.email,
    joinDate: format(new Date(userInfo?.created_at), "MMM yyyy"),
    verified: true,
    profileImage:
      "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
    completionPercentage: 50,
    totalOrders: order?.length,
    totalBanks: bank?.length,
    totalWallets: wallet?.length,
    connectedAccounts: {
      google: true,
      facebook: true,
    },
    verificationStatus: {
      email: true,
      phone: true,
      identity: false,
      bankAccount: false,
      walletAddress: true,
      twoFactor: true,
    },
  };

  // Mock transaction data
  const transactions = order?.slice(0, 5)?.map((item) => ({
    type: item?.type,
    status: item?.status,
    amount: Number(item?.amount)?.toFixed(2),
    transaction_code: item?.transaction_code,
    date: format(new Date(item?.transaction_date), "MMM dd, yyyy"),
  }));
  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "all") return true;
    return tx.type === activeTab;
  });

  console.log("transactions", transactions);

  // Stats data
  const stats = [
    {
      title: "Total Orders",
      value: user.totalOrders,
      icon: <BarChart3 className="text-blue-400" size={20} />,
      color: "bg-blue-900/20 border-blue-800/30",
    },
    {
      title: "Bank Accounts",
      value: user.totalBanks,
      icon: <Building className="text-purple-400" size={20} />,
      color: "bg-purple-900/20 border-purple-800/30",
    },
    {
      title: "Wallet Addresses",
      value: user.totalWallets,
      icon: <Wallet className="text-yellow-400" size={20} />,
      color: "bg-yellow-900/20 border-yellow-800/30",
    },
    {
      title: "Account Age",
      value: user.joinDate,
      icon: <Clock className="text-green-400" size={20} />,
      color: "bg-green-900/20 border-green-800/30",
    },
  ];

  // Verification items
  const verificationItems = [
    {
      id: "personal",
      title: "Complete Personal Information",
      description: "First name, Last name, Date of birth",
      completed: true,
      icon: <User size={18} />,
    },

    {
      id: "documents",
      title: "Upload Verification Documents",
      description: "ID card, Passport or Driver's license",
      completed: true,
      icon: <Upload size={18} />,
    },
    {
      id: "bank",
      title: "Add Bank Account",
      description: "Bank name, Account number, SWIFT code",
      completed: false,
      icon: <Building size={18} />,
    },
    {
      id: "wallet",
      title: "Connect Wallet Address",
      description: "BTC, ETH, BNB or other supported chains",
      completed: false,
      icon: <Wallet size={18} />,
    },
  ];

  return (
    <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile card */}
        <ProfileCard user={user} />

        {/* Stats grid */}
        <StatsGrid stats={stats} />

        {/* Connected accounts */}
        <ConnectedAccounts user={user} />
      </div>

      {/* Right*/}
      <div className="lg:col-span-2 space-y-6">
        {/* Verification status */}
        <VerificationStatus verificationItems={verificationItems} />

        {/* Transaction History */}
        <TransactionHistory
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
          filteredTransactions={filteredTransactions}
        />

        {/* Payment methods */}
        <PaymentMethod
          bank={bank?.length}
          order={wallet?.length}
          data={[...wallet, ...bank]}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
