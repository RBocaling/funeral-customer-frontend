import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Check,
  Clock8,
  Ban,
  Calendar,
  MessageSquare,
  FileText,
  Filter,
} from "lucide-react";

interface Booking {
  id: number;
  providerId: number;
  serviceId: number;
  status: string;
  totalAmount: number;
  bookingDate: Date;
  createdAt: Date;
  providerName?: string;
  serviceName?: string;
}

const Booking = () => {
  // Fetch bookings

  // Format currency in Pesos
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(amount / 100); // Convert cents to pesos
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            <Check className="mr-1 h-3 w-3" /> Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            <Clock8 className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            <Check className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            <Ban className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Mock data for development
  const mockBookings: Booking[] = [
    {
      id: 1,
      providerId: 201,
      serviceId: 301,
      status: "completed",
      totalAmount: 3500000, // In cents (35,000 PHP)
      bookingDate: new Date("2023-05-20"),
      createdAt: new Date("2023-05-15"),
      providerName: "Eternal Rest Funeral Homes",
      serviceName: "Premium Memorial Service",
    },
    {
      id: 2,
      providerId: 202,
      serviceId: 302,
      status: "pending",
      totalAmount: 2800000, // In cents (28,000 PHP)
      bookingDate: new Date("2023-06-15"),
      createdAt: new Date("2023-05-30"),
      providerName: "Peaceful Gardens Memorial",
      serviceName: "Standard Funeral Package",
    },
    {
      id: 3,
      providerId: 203,
      serviceId: 303,
      status: "confirmed",
      totalAmount: 4200000, // In cents (42,000 PHP)
      bookingDate: new Date("2023-06-05"),
      createdAt: new Date("2023-05-25"),
      providerName: "Serenity Funeral Services",
      serviceName: "Deluxe Memorial Package with Custom Casket",
    },
    {
      id: 4,
      providerId: 204,
      serviceId: 304,
      status: "cancelled",
      totalAmount: 3000000, // In cents (30,000 PHP)
      bookingDate: new Date("2023-05-10"),
      createdAt: new Date("2023-05-01"),
      providerName: "Heavenly Memorial Chapel",
      serviceName: "Basic Funeral Package",
    },
    {
      id: 5,
      providerId: 205,
      serviceId: 305,
      status: "completed",
      totalAmount: 3800000, // In cents (38,000 PHP)
      bookingDate: new Date("2023-04-25"),
      createdAt: new Date("2023-04-20"),
      providerName: "Graceful Passage Funeral Services",
      serviceName: "Memorial Service with Flower Arrangements",
    },
  ];

  const displayedBookings = mockBookings;

  return (
    <div className="container py-10 px-5">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-3">
        <div>
          <h2 className="text-2xl font-bold">My Bookings</h2>
          <p className="text-muted-foreground">
            Manage and track your service bookings
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8 w-full md:w-[300px]"
            />
          </div>
          <Button variant="outline" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8 bg-transparent">
        <TabsList>
          <TabsTrigger className="bg-transparent" value="all">
            All Bookings
          </TabsTrigger>
          <TabsTrigger className="bg-transparent" value="upcoming">
            Upcoming
          </TabsTrigger>
          <TabsTrigger className="bg-transparent" value="completed">
            Completed
          </TabsTrigger>
          <TabsTrigger className="bg-transparent" value="cancelled">
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="dark:bg-gray-700/20 rounded-3xl">
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                View all your funeral service bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {displayedBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No bookings found</p>
                  <p className="text-sm text-muted-foreground">
                    You haven't made any funeral service bookings yet
                  </p>
                  <Button className="mt-4">Browse Services</Button>
                </div>
              ) : (
                <Table className="">
                  <TableHeader>
                    <TableRow className="h-[70px]">
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBookings.map((booking: any) => (
                      <TableRow className="h-[70px]" key={booking.id}>
                        <TableCell className="font-medium">
                          {booking.providerName}
                        </TableCell>
                        <TableCell>{booking.serviceName}</TableCell>
                        <TableCell>{formatDate(booking.bookingDate)}</TableCell>
                        <TableCell>
                          {formatCurrency(booking.totalAmount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-1 h-3 w-3" /> Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-1 h-3 w-3" /> Contact
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                View your upcoming service appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {displayedBookings.filter((b: any) =>
                ["pending", "confirmed"].includes(b.status)
              ).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No upcoming bookings</p>
                  <p className="text-sm text-muted-foreground">
                    You don't have any pending or confirmed bookings
                  </p>
                  <Button className="mt-4">Browse Services</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="h-[70px]">
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBookings
                      .filter((b: any) =>
                        ["pending", "confirmed"].includes(b.status)
                      )
                      .map((booking: any) => (
                        <TableRow className="h-[70px]" key={booking.id}>
                          <TableCell className="font-medium">
                            {booking.providerName}
                          </TableCell>
                          <TableCell>{booking.serviceName}</TableCell>
                          <TableCell>
                            {formatDate(booking.bookingDate)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(booking.totalAmount)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(booking.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-1 h-3 w-3" /> Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-1 h-3 w-3" />{" "}
                                Contact
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Bookings</CardTitle>
              <CardDescription>
                View your past completed services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {displayedBookings.filter((b: any) => b.status === "completed")
                .length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Check className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No completed bookings</p>
                  <p className="text-sm text-muted-foreground">
                    You don't have any completed service bookings yet
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="h-[70px]">
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBookings
                      .filter((b: any) => b.status === "completed")
                      .map((booking: any) => (
                        <TableRow className="h-[70px]" key={booking.id}>
                          <TableCell className="font-medium">
                            {booking.providerName}
                          </TableCell>
                          <TableCell>{booking.serviceName}</TableCell>
                          <TableCell>
                            {formatDate(booking.bookingDate)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(booking.totalAmount)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(booking.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-1 h-3 w-3" /> Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Bookings</CardTitle>
              <CardDescription>
                View your cancelled service bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {displayedBookings.filter((b: any) => b.status === "cancelled")
                .length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Ban className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No cancelled bookings</p>
                  <p className="text-sm text-muted-foreground">
                    You don't have any cancelled service bookings
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="h-[70px]">
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBookings
                      .filter((b: any) => b.status === "cancelled")
                      .map((booking: any) => (
                        <TableRow className="h-[70px]" key={booking.id}>
                          <TableCell className="font-medium">
                            {booking.providerName}
                          </TableCell>
                          <TableCell>{booking.serviceName}</TableCell>
                          <TableCell>
                            {formatDate(booking.bookingDate)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(booking.totalAmount)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(booking.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-1 h-3 w-3" /> Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Booking;
